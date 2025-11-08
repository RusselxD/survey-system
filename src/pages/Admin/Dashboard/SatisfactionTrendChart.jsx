import React, { useId } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export const SatisfactionTrendChart = () => {
    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: "Average Satisfaction Trend - Last 7 Days",
                font: {
                    size: 16,
                    weight: "bold",
                },
                padding: {
                    bottom: 30,
                },
            },
            tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                titleFont: {
                    size: 13,
                },
                bodyFont: {
                    size: 13,
                },
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y}`;
                    },
                },
            },
        },
        scales: {
            y: {
                min: 0,
                max: 6,
                ticks: {
                    callback: function (value) {
                        return value;
                    },
                    font: {
                        size: 12,
                    },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                title: {
                    display: true,
                    text: "Satisfaction Score (1-5)",
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                },
            },
            x: {
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
                title: {
                    display: true,
                    text: "Days",
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                },
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
        elements: {
            line: {
                tension: 0.4, // Makes the line smoother
            },
            point: {
                radius: 4,
                hoverRadius: 6,
            },
        },
    };

    // Build dynamic labels for the last 20 days and random values (1-5)
    const DAYS = 7;
    const today = new Date();
    const labels = Array.from({ length: DAYS }, (_, i) => {
        const d = new Date(today);
        // Oldest first, newest last
        d.setDate(today.getDate() - (DAYS - 1 - i));
        return d.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
        });
    });

    const randomValues = Array.from(
        { length: DAYS },
        () => Math.floor(Math.random() * (5 - 1 + 1)) + 1
    );

    // Chart data
    const data = {
        labels,
        datasets: [
            {
                label: "Average Satisfaction",
                data: randomValues,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgb(59, 130, 246)",
                pointBorderColor: "white",
                pointBorderWidth: 2,
            },
            // {
            //     label: "Product Quality",
            //     data: [5, 3, 4, 2, 5, 4, 1],
            //     borderColor: "rgb(16, 185, 129)",
            //     backgroundColor: "rgba(16, 185, 129, 0.1)",
            //     borderWidth: 2,
            //     fill: false,
            //     tension: 0.4,
            //     pointBackgroundColor: "rgb(16, 185, 129)",
            //     pointBorderColor: "white",
            //     pointBorderWidth: 2,
            // },
            // {
            //     label: "Customer Support",
            //     data: [2, 5, 3, 5, 5, 5, 1],
            //     borderColor: "rgb(245, 158, 11)",
            //     backgroundColor: "rgba(245, 158, 11, 0.1)",
            //     borderWidth: 2,
            //     fill: false,
            //     tension: 0.4,
            //     pointBackgroundColor: "rgb(245, 158, 11)",
            //     pointBorderColor: "white",
            //     pointBorderWidth: 2,
            // },
        ],
    };

    const chartId = useId();
    console.log(chartId);

    return <Line data={data} options={options} id={chartId} key={chartId} />;
};
