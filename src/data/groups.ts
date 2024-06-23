export interface Item {
    name: string;
    ticker: string;
}

export interface Group {
    name: string;
    items: Item[];
}

export const groups: Group[] = [
    {
        name: "Indices",
        items: [
            {name: "S&P 500", ticker: "^SPX"},
            {name: "Dow Jones", ticker: "^DJI"},
            {name: "Nasdaq", ticker: "^IXIC"},
            {name: "Russell 2000", ticker: "^RUT"}
        ]
    },
    {
        name: "SPDR Sectors",
        items: [
            {name: "Communication Services", ticker: "XLC"},
            {name: "Consumer Discretionary", ticker: "XLY"},
            {name: "Consumer Staples", ticker: "XLP"},
            {name: "Energy", ticker: "XLE"},
            {name: "Financials", ticker: "XLF"},


            {name: "Health Care", ticker: "XLV"},
            {name: "Industrials", ticker: "XLI"},
            {name: "Materials", ticker: "XLB"},
            {name: "Real Estate", ticker: "XLRE"},
            {name: "Technology", ticker: "XLK"},
            {name: "Utilities", ticker: "XLU"},
        ]
    },
    {
        name: "Commodities",
        items: [
            {name: "Oil", ticker: "USO"},
            {name: "Gold", ticker: "GLD"},
            {name: "Silver", ticker: "SLV"},
            {name: "Natural Gas", ticker: "UNG"}
        ]
    },
    {
        name: "Bonds",
        items: [
            {name: "High Yield Corporate", ticker: "HYG"},
            {name: "20+ Year Treasury", ticker: "TLT"},
        ]
    },
];