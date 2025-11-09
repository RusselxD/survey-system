// ResponseTimeDistribution.jsx
import React, { useId } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const ResponseTimeDistribution = () => {
    // Chart options
    const options = {
        indexAxis: "x", // This makes it vertical (default)
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: window.devicePixelRatio,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Response Time Distribution by Time of Day",
                font: {
                    size: 16,
                    weight: "bold",
                },
                padding: {
                    bottom: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `Responses: ${context.parsed.y}`;
                    },
                },
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Number of Responses",
                    font: {
                        weight: "bold",
                    },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
                ticks: {
                    stepSize: 20,
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Time of Day",
                    font: {
                        weight: "bold",
                    },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
            },
        },
    };

    // Chart data with 3-hour ranges
    const data = {
        labels: [
            "12 AM - 3 AM",
            "3 AM - 6 AM",
            "6 AM - 9 AM",
            "9 AM - 12 PM",
            "12 PM - 3 PM",
            "3 PM - 6 PM",
            "6 PM - 9 PM",
            "9 PM - 12 AM",
        ],
        datasets: [
            {
                label: "Response Count",
                data: [13, 57, 123, 147, 164, 158, 107, 67], // Combined 2-hour data into 3-hour totals
                backgroundColor: [
                    "rgba(59, 130, 246, 0.8)", // Late night
                    "rgba(99, 102, 241, 0.8)", // Early morning
                    "rgba(139, 92, 246, 0.8)", // Morning
                    "rgba(168, 85, 247, 0.8)", // Late morning
                    "rgba(219, 39, 119, 0.8)", // Afternoon
                    "rgba(236, 72, 153, 0.8)", // Late afternoon
                    "rgba(251, 146, 60, 0.8)", // Evening
                    "rgba(245, 158, 11, 0.8)", // Night
                ],
                borderColor: [
                    "rgb(59, 130, 246)",
                    "rgb(99, 102, 241)",
                    "rgb(139, 92, 246)",
                    "rgb(168, 85, 247)",
                    "rgb(219, 39, 119)",
                    "rgb(236, 72, 153)",
                    "rgb(251, 146, 60)",
                    "rgb(245, 158, 11)",
                ],
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };

    const chartId = useId();
    console.log(chartId)

    return <Bar data={data} options={options}  id={chartId} key={chartId}/>;
};