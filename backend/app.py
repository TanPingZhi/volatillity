from flask import Flask, jsonify
from flask_cors import CORS
import yfinance as yf
from YangZhangEstimator import yang_zhang_estimator

from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/stock/*": {"origins": "http://localhost:3000"}})


@app.route('/stock/<ticker>')
def get_stock_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        hist = stock.history(period="5y")
        hist = hist.dropna()
        volatility = yang_zhang_estimator(hist, clean=False)
        # fill nans with -1
        volatility = volatility.fillna(-1)
        volatility = volatility.tolist()
        data = {
            "dates": hist.index.strftime('%Y-%m-%d').tolist(),
            "prices": hist['Close'].tolist(),
            "volatility": volatility
        }

        response = jsonify(data)

        return response
    except Exception as e:
        print(f"Error processing request for {ticker}: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
