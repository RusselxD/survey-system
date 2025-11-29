import React, { useId, useEffect, useState, useMemo } from "react";
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

const CompletionTimeDistChart = ({ dataset }) => {
    const { timeRanges, responseCounts, peakRanges } = dataset;

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

    // Chart.js configuration options (memoized to avoid recreating on every render)
    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: "Completion Time Distribution",
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
                            const percentage = (
                                (context.parsed.y /
                                    responseCounts.reduce((a, b) => a + b, 0)) *
                                100
                            ).toFixed(1);
                            return `Responses: ${context.parsed.y} (${percentage}%)`;
                        },
                        afterLabel: function (context) {
                            if (
                                peakRanges.includes(
                                    timeRanges[context.dataIndex]
                                )
                            ) {
                                return "← Peak range";
                            }
                            return "";
                        },
                    },
                },
            },
            scales: {
                y: {
                    min: 0,
                    max: Math.trunc(Math.max(...responseCounts) * 1.1), // Add 10% padding to the max value
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
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 12,
                        },
                        color: textColor,
                    },
                    title: {
                        display: true,
                        text: "Response Time (minutes)",
                        color: textColor,
                        font: {
                            size: 12,
                            weight: "bold",
                        },
                    },
                },
            },
        }),
        [textColor, gridColor, responseCounts, timeRanges, peakRanges]
    );

    // Generate bar colors - highlight the peak range
    const barColors = timeRanges.map(
        (range) =>
            peakRanges.includes(range)
                ? "rgb(34, 197, 94)" // Green for peak
                : "rgb(59, 130, 246)" // Blue for others
    );

    const barBorderColors = timeRanges.map((range) =>
        peakRanges.includes(range) ? "rgb(22, 163, 74)" : "rgb(37, 99, 235)"
    );

    // Chart data structure for react-chartjs-2
    const data = {
        labels: timeRanges,
        datasets: [
            {
                label: "Response Count",
                data: responseCounts,
                backgroundColor: barColors,
                borderColor: barBorderColors,
                borderWidth: 2,
                borderRadius: 6,
                barPercentage: 1, // No gaps between bars (histogram style)
                categoryPercentage: 0.9, // No gaps between categories
            },
        ],
    };

    // Generate unique ID for this chart instance (required by Chart.js)
    const chartId = useId();

    return (
        <div className="py-2 h-full">
            <Bar data={data} options={options} id={chartId} key={chartId} />
        </div>
    );
};

export default CompletionTimeDistChart;
