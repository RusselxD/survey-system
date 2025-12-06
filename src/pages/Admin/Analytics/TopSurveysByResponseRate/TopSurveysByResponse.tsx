import { useId, useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAuth } from "../../../../context/AuthContext";
import { TopSurveysByResponseRate as TopSurveysByResponseRateData } from "../../../../utils/api/pages/analytics";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface TopSurveysByResponseProps {
    dataset: TopSurveysByResponseRateData;
    sortBy?: "responseRate" | "responseCount";
}

interface SortedDataItem {
    survey: string;
    responseRate: number;
    responseCount: number;
}

interface SortedData {
    surveys: string[];
    responseRates: number[];
    responseCounts: number[];
}

const TopSurveysByResponse = ({
    dataset,
    sortBy = "responseRate",
}: TopSurveysByResponseProps): React.JSX.Element => {
    const { surveys, responseRates, responseCounts } = dataset;

    const { textColor, gridColor } = useAuth();

    // Sort data based on sortBy parameter
    const sortedData = useMemo<SortedData>(() => {
        const combined: SortedDataItem[] = surveys.map((survey, index) => ({
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
    const generateBarColors = (rates: number[]): string[] => {
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
            indexAxis: "y" as const, // Horizontal bar chart
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
                        weight: "bold" as const,
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
                        label: function (context: TooltipItem<"bar">) {
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
                        callback: function (value: string | number) {
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
                            weight: "bold" as const,
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
                        crossAlign: "far" as const,
                        callback: function (value: string | number): string {
                            const label = (this as any).getLabelForValue(
                                value as number
                            );
                            const maxWidth = 150; // Maximum width in pixels

                            // Create a temporary canvas context to measure text
                            const ctx = (this as any).chart.ctx;
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
        afterDatasetsDraw(chart: ChartJS) {
            const { ctx } = chart;
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((bar, index) => {
                    const value = dataset.data[index] as number;
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
