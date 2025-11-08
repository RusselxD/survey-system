import './style.css'

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

export const LocationsRatingsChart = () => {
    const data = {
        labels: [
            "Downtown",
            "Mall",
            "Airport",
            "Outlet",
            "Uptown",
            "Suburb",
            "Waterfront",
        ],
        datasets: [
            {
                label: "Average Rating",
                data: [4.2, 3.9, 3.8, 4.4, 4.1, 4.0, 4.3],
                backgroundColor: [
                    "rgba(34, 197, 94, 0.8)", // Green for high ratings
                    "rgba(253, 224, 71, 0.8)", // Yellow for medium
                    "rgba(249, 115, 22, 0.8)", // Orange for lower
                    "rgba(34, 197, 94, 0.8)", // Green
                    "rgba(163, 230, 53, 0.8)", // Light green
                    "rgba(163, 230, 53, 0.8)", // Light green
                    "rgba(34, 197, 94, 0.8)", // Green
                ],
                borderColor: [
                    "rgba(34, 197, 94, 1)",
                    "rgba(253, 224, 71, 1)",
                    "rgba(249, 115, 22, 1)",
                    "rgba(34, 197, 94, 1)",
                    "rgba(163, 230, 53, 1)",
                    "rgba(163, 230, 53, 1)",
                    "rgba(34, 197, 94, 1)",
                ],
                borderWidth: 1,
                borderRadius: 4,
                borderSkipped: false,
            },
        ],
    };

    const options = {
        indexAxis: "y", // This makes it horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: "Average Ratings by Location",
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
                        return `Average: ${context.parsed.x.toFixed(1)}/5.0`;
                    },
                    afterLabel: function (context) {
                        const rating = context.parsed.x;
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating % 1 >= 0.5;

                        let stars = "★".repeat(fullStars);
                        if (hasHalfStar) stars += "½";
                        stars += "☆".repeat(5 - Math.ceil(rating));

                        return `Rating: ${stars}`;
                    },
                },
            },
        },
        scales: {
            x: {
                min: 1,
                max: 5,
                ticks: {
                    stepSize: 0.5,
                    callback: function (value) {
                        return value.toFixed(1);
                    },
                },
                title: {
                    display: true,
                    text: "Average Rating (1-5)",
                    font: {
                        weight: "bold",
                    },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Locations",
                    font: {
                        weight: "bold",
                    },
                },
                grid: {
                    color: "rgba(0, 0, 0, 0.1)",
                },
            },
        },
        animation: {
            duration: 1000,
            easing: "easeOutQuart",
        },
    };

    // Calculate statistics
    const averageRating = (
        data.datasets[0].data.reduce((a, b) => a + b, 0) /
        data.datasets[0].data.length
    ).toFixed(1);
    const highestRating = Math.max(...data.datasets[0].data);
    const lowestRating = Math.min(...data.datasets[0].data);
    const highestLocation =
        data.labels[data.datasets[0].data.indexOf(highestRating)];

    return (
        <div className="chart-container">
            <div style={{ height: "400px", width: "100%" }}>
                <Bar data={data} options={options} />
            </div>
            <div className="chart-stats">
                <div className="stat-item">
                    <span className="stat-label">Overall Average:</span>
                    <span className="stat-value">{averageRating}/5.0</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Highest Rated:</span>
                    <span className="stat-value">{highestLocation}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Performance Range:</span>
                    <span className="stat-value">
                        {lowestRating.toFixed(1)}-{highestRating.toFixed(1)}
                    </span>
                </div>
            </div>
        </div>
    );
};
