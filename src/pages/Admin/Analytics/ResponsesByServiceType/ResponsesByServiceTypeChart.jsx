import React, { useId, useEffect, useState, useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ResponsesByServiceTypeChart = ({ dataset }) => {
    const { serviceTypes, responseCounts } = dataset;

    // Initialize theme state based on system preference (dark mode detection)
    const [isDark, setIsDark] = useState(
        () => window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    // Watch for theme changes from both data-theme attribute and system preference
    useEffect(() => {
        const updateTheme = () => {
            const theme = document.documentElement.getAttribute("data-theme");
            const prefersDark =
                theme === null
                    ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    : theme === "dark";
            setIsDark(prefersDark);
        };

        updateTheme();

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", updateTheme);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener("change", updateTheme);
        };
    }, []);

    const textColor = isDark ? "#ffffff" : "#000000";

    // Calculate total and percentages
    const totalResponses = responseCounts.reduce(
        (sum, count) => sum + count,
        0
    );
    const percentages = responseCounts.map((count) =>
        ((count / totalResponses) * 100).toFixed(1)
    );

    // Generate colors dynamically based on number of service types
    const colorPalette = serviceTypes.map((_, index) => {
        const hue = ((index * 360) / serviceTypes.length) % 360;
        return `hsl(${hue}, 70%, 60%)`;
    });

    const borderColors = serviceTypes.map((_, index) => {
        const hue = ((index * 360) / serviceTypes.length) % 360;
        return `hsla(${hue}, 70%, 50%, 0.8)`;
    });

    // Chart.js configuration options
    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "right",
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 13,
                        },
                        color: textColor,
                        generateLabels: function (chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, i) => {
                                    const count = data.datasets[0].data[i];
                                    const percentage = percentages[i];
                                    return {
                                        text: `${label}: ${count.toLocaleString()} (${percentage}%)`,
                                        fillStyle:
                                            data.datasets[0].backgroundColor[i],
                                        fontColor: textColor,
                                        hidden: false,
                                        index: i,
                                    };
                                });
                            }
                            return [];
                        },
                    },
                },
                title: {
                    display: true,
                    text: "Responses by Service Type",
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
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    titleFont: {
                        size: 14,
                        weight: "bold",
                    },
                    bodyFont: {
                        size: 13,
                    },
                    padding: 12,
                    callbacks: {
                        label: function (context) {
                            const label = context.label || "";
                            const value = context.parsed;
                            const percentage = percentages[context.dataIndex];
                            return [
                                `${label}`,
                                `Responses: ${value.toLocaleString()}`,
                                `Percentage: ${percentage}%`,
                            ];
                        },
                    },
                },
            },
            cutout: "65%", // Makes it a donut (larger = thinner ring)
        }),
        [textColor, percentages]
    );

    // Chart data structure
    const data = {
        labels: serviceTypes,
        datasets: [
            {
                data: responseCounts,
                backgroundColor: colorPalette.slice(0, serviceTypes.length),
                borderColor: borderColors.slice(0, serviceTypes.length),
                borderWidth: 2,
                hoverOffset: 15,
                hoverBorderWidth: 3,
            },
        ],
    };

    // Generate unique ID for this chart instance
    const chartId = useId();

    // Center text plugin to display total
    const centerTextPlugin = {
        id: "centerText",
        beforeDraw: function (chart) {
            if (chart.config.type !== "doughnut") return;

            const { ctx, chartArea } = chart;
            if (!chartArea) return;

            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;

            ctx.save();
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = textColor;

            // Draw total count
            ctx.font = "bold 24px sans-serif";
            ctx.fillText(
                totalResponses.toLocaleString(),
                centerX,
                centerY - 10
            );

            // Draw "Total" label
            ctx.font = "14px sans-serif";
            ctx.fillStyle = isDark ? "#9ca3af" : "#6b7280";
            ctx.fillText("Total Responses", centerX, centerY + 15);

            ctx.restore();
        },
    };

    return (
        <div className="w-[90%] py-2">
            <div className="w-full h-[25rem]" >
                <Doughnut
                    data={data}
                    options={options}
                    plugins={[centerTextPlugin]}
                    id={chartId}
                    key={chartId}
                />
            </div>
        </div>
    );
};

export default ResponsesByServiceTypeChart;
