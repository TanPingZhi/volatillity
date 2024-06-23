import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import StockChart from './components/StockChart';
import {groups} from './data/groups';
import './App.css';

interface StockData {
    dates: string[];
    prices: number[];
    volatility: number[];
}

const App: React.FC = () => {
    const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [stockData, setStockData] = useState<StockData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const fetchStockData = async (ticker: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:5000/stock/${ticker}`);

            const {dates, prices, volatility} = response.data;

            if (!Array.isArray(dates) || !Array.isArray(prices) || !Array.isArray(volatility)) {
                console.error('Invalid data structure:', {
                    dates: Array.isArray(dates) ? 'array' : typeof dates,
                    prices: Array.isArray(prices) ? 'array' : typeof prices,
                    volatility: Array.isArray(volatility) ? 'array' : typeof volatility
                });
                throw new Error('Invalid data structure received from server');
            }

            // Replace negative values in volatility with NaN
            const cleanVolatility = volatility.map(v => v < 0 ? NaN : v);

            setStockData({dates, prices, volatility: cleanVolatility});
            setSelectedTicker(ticker);
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
            setStockData(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Current stockData:', stockData);
    }, [stockData]);

    return (
        <div className={`App ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <Sidebar
                groups={groups}
                onSelectTicker={fetchStockData}
                isOpen={isSidebarOpen}
            />
            <main className="main-content">
                <button className="toggle-sidebar" onClick={toggleSidebar}>
                    {isSidebarOpen ? '◀' : '▶'}
                </button>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : selectedTicker && stockData ? (
                    <div>
                        <h2>{selectedTicker} Stock Data</h2>
                        <div className="chart-container">
                            <StockChart data={stockData}/>
                        </div>
                        {stockData.prices && stockData.volatility &&
                        stockData.prices.length > 0 && stockData.volatility.length > 0 ? (
                            <>
                                <p>Latest Price: ${stockData.prices[stockData.prices.length - 1].toFixed(2)}</p>
                                <p>Latest
                                    Volatility: {(stockData.volatility[stockData.volatility.length - 1] * 100).toFixed(2)}%</p>
                            </>
                        ) : (
                            <p>No price or volatility data available</p>
                        )}
                    </div>
                ) : (
                    <p>Select a ticker from the sidebar</p>
                )}
            </main>
        </div>
    );
}

export default App;