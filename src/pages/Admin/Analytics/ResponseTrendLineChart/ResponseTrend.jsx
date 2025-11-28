import React, { useId, useEffect, useState, useMemo } from "react";
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
import { max } from "date-fns";

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

const ResponseTrend = ({ dataset, days }) => {
    const { labels, responseCounts } = dataset;

    // Initialize theme state based on system preference (dark mode detection)
    const [isDark, setIsDark] = useState(
        () => window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    // Watch for theme changes from both data-theme attribute and system preference
    useEffect(() => {
        const updateTheme = () => {
            // Check if data-theme is explicitly set on <html>
            const theme = document.documentElement.getAttribute("data-theme");
            // If null, fall back to system preference; otherwise use the attribute value
            const prefersDark =
                theme === null
                    ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    : theme === "dark";
            setIsDark(prefersDark);
        };

        // Run initial check
        updateTheme();

        // Listen for changes to data-theme attribute (manual theme toggle)
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        // Listen for system theme changes (OS-level dark/light mode)
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", updateTheme);

        // Cleanup listeners on unmount
        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener("change", updateTheme);
        };
    }, []);

    // Define colors based on current theme (white text in dark, black in light)
    const textColor = isDark ? "#ffffff" : "#000000";
    const gridColor = isDark
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";

    const largestValue = Math.max(...responseCounts);
    // console.log(largestValue)
    console.log(largestValue === 0 ? 10 : Math.ceil(largestValue * 1.2))

    // Chart.js configuration options (memoized to avoid recreating on every render)
    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        color: textColor,
                    },
                },
                title: {
                    display: true,
                    text: `Response Trends (Last ${days} Days)`,
                    color: textColor,
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
                    max:
                        largestValue === 0 ? 10 : Math.ceil(largestValue * 1.1), // Add 20% padding to the max value
                    ticks: {
                        callback: function (value) {
                            return value;
                        },
                        font: {
                            size: 12,
                        },
                        color: textColor,
                    },
                    grid: {
                        color: gridColor,
                    },
                    title: {
                        display: true,
                        text: "Number of Responses",
                        color: textColor,
                        font: {
                            size: 12,
                            weight: "bold",
                        },
                    },
                },
                x: {
                    grid: {
                        color: gridColor,
                    },
                    ticks: {
                        font: {
                            size: 12,
                        },
                        color: textColor,
                    },
                    title: {
                        display: true,
                        text: "Days",
                        color: textColor,
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
                    tension: 0.1, // Makes the line smoother
                },
                point: {
                    radius: 4,
                    hoverRadius: 6,
                },
            },
        }),
        [textColor, gridColor]
    );

    // Chart data structure for react-chartjs-2
    const data = {
        labels,
        datasets: [
            {
                label: "Responses",
                data: responseCounts,
                borderColor: "rgb(59, 130, 246)",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "rgb(59, 130, 246)",
                pointBorderColor: "white",
                pointBorderWidth: 2,
            },
        ],
    };

    // Generate unique ID for this chart instance (required by Chart.js)
    const chartId = useId();

    return (
        <div className="py-2 h-full">
            <Line data={data} options={options} id={chartId} key={chartId} />{" "}
        </div>
    );
};

export default ResponseTrend;
