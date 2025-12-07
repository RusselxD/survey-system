import { useId, useMemo } from "react";
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
    TooltipItem,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useAuth } from "../../../../context/AuthContext";
import { ResponseTrends } from "../../../../utils/api/pages/analytics";

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

interface ResponseTrendProps {
    dataset: ResponseTrends;
    duration: string;
    xAxisLabel: string;
    pdfMode?: boolean;
}

interface ColorPair {
    border: string;
    background: string;
}

const ResponseTrend = ({
    dataset,
    duration,
    xAxisLabel,
    pdfMode = false,
}: ResponseTrendProps): React.JSX.Element => {
    const { labels, responseCounts, surveyTrends } = dataset;

    const { textColor, gridColor } = useAuth();

    // Override colors for PDF export (light background)
    const displayTextColor = pdfMode ? "#000000" : textColor;
    const displayGridColor = pdfMode ? "rgba(0, 0, 0, 0.1)" : gridColor;

    // Generate colors dynamically based on number of surveys
    const generateColors = (count: number): ColorPair[] => {
        const colors: ColorPair[] = [];
        for (let i = 0; i < count; i++) {
            const hue = (i * 360) / count; // Distribute evenly across color wheel
            colors.push({
                border: `hsl(${hue}, 70%, 50%)`,
                background: `hsla(${hue}, 70%, 50%, 0.1)`,
            });
        }
        return colors;
    };

    const surveyColors = generateColors(surveyTrends.length);

    const largestValue = Math.max(
        ...responseCounts,
        ...surveyTrends.flatMap((s) => s.responseCounts)
    );

    // Chart.js configuration options (memoized to avoid recreating on every render)
    const options = useMemo(
        () => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "top" as const,
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        color: displayTextColor,
                    },
                },
                title: {
                    display: true,
                    text: `Response Trends (Last ${duration})`,
                    color: displayTextColor,
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
                        label: function (context: TooltipItem<"line">) {
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
                        callback: function (value: string | number) {
                            return value;
                        },
                        font: {
                            size: 12,
                        },
                        color: displayTextColor,
                    },
                    grid: {
                        color: displayGridColor,
                    },
                    title: {
                        display: true,
                        text: "Number of Responses",
                        color: displayTextColor,
                        font: {
                            size: 12,
                            weight: "bold" as const,
                        },
                    },
                },
                x: {
                    grid: {
                        color: displayGridColor,
                    },
                    ticks: {
                        font: {
                            size: 12,
                        },
                        color: displayTextColor,
                    },
                    title: {
                        display: true,
                        text: xAxisLabel,
                        color: displayTextColor,
                        font: {
                            size: 12,
                            weight: "bold" as const,
                        },
                    },
                },
            },
            interaction: {
                mode: "nearest" as const,
                axis: "x" as const,
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
        [displayTextColor, displayGridColor, duration, largestValue, xAxisLabel]
    );

    // Chart data structure for react-chartjs-2
    const data = {
        labels,
        datasets: [
            // Overall responses (main line)
            {
                label: "Total Responses",
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
            // Individual survey lines
            ...surveyTrends.map((survey, index) => ({
                label: survey.surveyName,
                data: survey.responseCounts,
                borderColor: surveyColors[index].border,
                backgroundColor: surveyColors[index].background,
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                pointBackgroundColor: surveyColors[index].border,
                pointBorderColor: "white",
                pointBorderWidth: 1,
                pointRadius: 3,
                hoverRadius: 5,
            })),
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
