import React from 'react';
import { Line } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface StockData {
    dates: string[];
    prices: number[];
    volatility: number[];
}

interface StockChartProps {
    data: StockData;
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
    const chartData = {
        labels: data.dates,
        datasets: [
            {
                label: 'Price',
                data: data.prices,
                borderColor: 'rgb(75, 192, 192)',
                yAxisID: 'y',
                pointRadius: 0, // Make the datapoint invisible
            },
            {
                label: 'Volatility',
                data: data.volatility.map(v => v * 100), // Convert to percentage
                borderColor: 'rgb(255, 99, 132)',
                yAxisID: 'y1',
                pointRadius: 0, // Make the datapoint invisible
            }
        ]
    };

    const options = {
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Stock Price and Volatility',
            },
        },
        scales: {
            y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
                title: {
                    display: true,
                    text: 'Price ($)'
                }
            },
            y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: 'Volatility (%)'
                }
            },
        },
    };

    return <Line options={options} data={chartData} />;
};

export default StockChart;