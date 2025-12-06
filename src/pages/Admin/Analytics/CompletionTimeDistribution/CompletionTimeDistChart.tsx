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
import { CompletionTimeDistribution } from "../../../../utils/api/pages/analytics";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface CompletionTimeDistChartProps {
    dataset: CompletionTimeDistribution;
}

const CompletionTimeDistChart = ({
    dataset,
}: CompletionTimeDistChartProps): React.JSX.Element => {
    const { timeRanges, responseCounts, peakRanges } = dataset;

    const { textColor, gridColor } = useAuth();

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
                        weight: "bold" as const,
                    },
                    padding: {
                        bottom: 30,
                    },
                },
                tooltip: {
                    mode: "index" as const,
                    intersect: false,
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleFont: {
                        size: 13,
                    },
                    bodyFont: {
                        size: 13,
                    },
                    callbacks: {
                        label: function (context: TooltipItem<"bar">) {
                            const yValue = context.parsed.y ?? 0;
                            const percentage = (
                                (yValue /
                                    responseCounts.reduce(
                                        (a: number, b: number) => a + b,
                                        0
                                    )) *
                                100
                            ).toFixed(1);
                            return `Responses: ${yValue} (${percentage}%)`;
                        },
                        afterLabel: function (context: TooltipItem<"bar">) {
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
                        callback: function (value: number | string) {
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
                            weight: "bold" as const,
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
                            weight: "bold" as const,
                        },
                    },
                },
            },
        }),
        [textColor, gridColor, responseCounts, timeRanges, peakRanges]
    );

    // Generate bar colors - highlight the peak range
    const barColors = timeRanges.map(
        (range: string) =>
            peakRanges.includes(range)
                ? "rgb(34, 197, 94)" // Green for peak
                : "rgb(59, 130, 246)" // Blue for others
    );

    const barBorderColors = timeRanges.map((range: string) =>
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
