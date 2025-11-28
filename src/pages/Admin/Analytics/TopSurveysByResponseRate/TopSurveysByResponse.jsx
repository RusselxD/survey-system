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

const TopSurveysByResponse = ({ dataset, sortBy = "responseRate" }) => {
    const { surveys, responseRates, responseCounts } = dataset;

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

    // Define colors based on current theme
    const textColor = isDark ? "#ffffff" : "#000000";
    const gridColor = isDark
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";

    // Sort data based on sortBy parameter
    const sortedData = useMemo(() => {
        const combined = surveys.map((survey, index) => ({
            survey,
            responseRate: responseRates[index],
            responseCount: responseCounts[index],
        }));

        combined.sort((a, b) => {
            if (sortBy === "responseRate") {
                return b.responseRate - a.responseRate;
            } else {
                return b.responseCount - a.responseCount;
            }
        });

        return {
            surveys: combined.map((item) => item.survey),
            responseRates: combined.map((item) => item.responseRate),
            responseCounts: combined.map((item) => item.responseCount),
        };
    }, [surveys, responseRates, responseCounts, sortBy]);

    // Generate gradient colors based on performance
    const generateBarColors = (rates) => {
        return rates.map((rate) => {
            if (rate >= 85) return "rgb(34, 197, 94)"; // Green for excellent
            if (rate >= 70) return "rgb(59, 130, 246)"; // Blue for good
            if (rate >= 50) return "rgb(251, 146, 60)"; // Orange for fair
            return "rgb(239, 68, 68)"; // Red for needs improvement
        });
    };

    const barColors = generateBarColors(sortedData.responseRates);

    // Chart.js configuration options
    const options = useMemo(
        () => ({
            indexAxis: "y", // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text:
                        sortBy === "responseRate"
                            ? "Top Surveys by Response Rate"
                            : "Top Surveys by Response Count",
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
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleFont: {
                        size: 13,
                    },
                    bodyFont: {
                        size: 13,
                    },
                    callbacks: {
                        label: function (context) {
                            const index = context.dataIndex;
                            const rate = sortedData.responseRates[index];
                            const count = sortedData.responseCounts[index];
                            return [
                                `Response Rate: ${rate}%`,
                                `Total Responses: ${count}`,
                            ];
                        },
                    },
                },
            },
            scales: {
                x: {
                    min: 0,
                    max: 100,
                    ticks: {
                        callback: function (value) {
                            return value + "%";
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
                        text: "Response Rate (%)",
                        color: textColor,
                        font: {
                            size: 12,
                            weight: "bold",
                        },
                    },
                },
                y: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 14,
                        },
                        color: textColor,
                        crossAlign: "far",
                        callback: function (value) {
                            const label = this.getLabelForValue(value);
                            const maxWidth = 150; // Maximum width in pixels

                            // Create a temporary canvas context to measure text
                            const ctx = this.chart.ctx;
                            ctx.font = "12px sans-serif"; // Match your font size

                            let width = ctx.measureText(label).width;

                            if (width <= maxWidth) {
                                return label;
                            }

                            // Truncate until it fits
                            let truncated = label;
                            while (width > maxWidth && truncated.length > 0) {
                                truncated = truncated.slice(0, -1);
                                width = ctx.measureText(
                                    truncated + "..."
                                ).width;
                            }

                            return truncated + "...";
                        },
                    },
                },
            },
            layout: {
                padding: {
                    left: 5,
                    right: 50, // Space for percentage labels
                },
            },
        }),
        [textColor, gridColor, sortBy, sortedData]
    );

    // Chart data structure
    const data = {
        labels: sortedData.surveys,
        datasets: [
            {
                label: "Response Rate",
                data: sortedData.responseRates,
                backgroundColor: barColors,
                borderColor: barColors.map((color) =>
                    color.replace("rgb", "rgba").replace(")", ", 0.8)")
                ),
                borderWidth: 1,
                borderRadius: 4,
                barPercentage: 0.7,
            },
        ],
    };

    // Generate unique ID for this chart instance
    const chartId = useId();

    // Custom plugin to display percentage labels at the end of bars
    const percentagePlugin = {
        id: "percentageLabels",
        afterDatasetsDraw(chart) {
            const { ctx } = chart;
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((bar, index) => {
                    const value = dataset.data[index];
                    ctx.fillStyle = textColor;
                    ctx.font = "bold 12px sans-serif";
                    ctx.textAlign = "left";
                    ctx.textBaseline = "middle";
                    ctx.fillText(`${value}%`, bar.x + 8, bar.y);
                });
            });
        },
    };

    return (
        <div className="py-2 h-full">
            <Bar
                data={data}
                options={options}
                plugins={[percentagePlugin]}
                id={chartId}
                key={chartId}
            />
        </div>
    );
};

export default TopSurveysByResponse;
