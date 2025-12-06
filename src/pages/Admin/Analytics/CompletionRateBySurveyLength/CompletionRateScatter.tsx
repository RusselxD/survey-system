import { useId, useMemo } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useAuth } from "../../../../context/AuthContext";

// Register Chart.js components
ChartJS.register(
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Title
);

interface CompletionRateBySurveyLength {
    surveyNames: string[];
    questionCounts: number[];
    completionRates: number[];
}

interface ScatterDataPoint {
    x: number;
    y: number;
    surveyName: string;
}

interface CompletionRateScatterProps {
    dataset: CompletionRateBySurveyLength;
}

const CompletionRateScatter = ({ dataset }: CompletionRateScatterProps) => {
    const { surveyNames, questionCounts, completionRates } = dataset;

    const { textColor, gridColor } = useAuth();

    // Find optimal survey length (highest completion rate)
    const maxCompletionIndex = completionRates.indexOf(
        Math.max(...completionRates)
    );
    const optimalLength = questionCounts[maxCompletionIndex];
    const optimalRate = completionRates[maxCompletionIndex];

    // Prepare scatter plot data points
    const scatterData: ScatterDataPoint[] = questionCounts.map(
        (count, index) => ({
            x: count,
            y: completionRates[index],
            surveyName: surveyNames[index],
        })
    );

    // Calculate color based on completion rate
    const getPointColor = (rate: number): string => {
        if (rate >= 90) return "rgb(34, 197, 94)"; // Green - excellent
        if (rate >= 75) return "rgb(59, 130, 246)"; // Blue - good
        if (rate >= 60) return "rgb(251, 146, 60)"; // Orange - fair
        return "rgb(239, 68, 68)"; // Red - needs improvement
    };

    // Chart.js configuration options
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
                    text: "Completion Rate vs Survey Length",
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
                    backgroundColor: "rgba(0, 0, 0, 0.9)",
                    titleFont: {
                        size: 14,
                        weight: "bold" as const,
                    },
                    bodyFont: {
                        size: 13,
                    },
                    padding: 12,
                    callbacks: {
                        title: function (context: any) {
                            return context[0].raw.surveyName;
                        },
                        label: function (context: any) {
                            return [
                                `Questions: ${context.parsed.x}`,
                                `Completion Rate: ${context.parsed.y}%`,
                            ];
                        },
                    },
                },
            },
            scales: {
                x: {
                    type: "linear" as const,
                    position: "bottom" as const,
                    min: 0,
                    max: Math.ceil(Math.max(...questionCounts) * 1.1),
                    ticks: {
                        stepSize: Math.ceil(
                            (Math.max(...questionCounts) * 1.1) / 10
                        ),
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
                        text: "Number of Questions",
                        color: textColor,
                        font: {
                            size: 12,
                            weight: "bold" as const,
                        },
                    },
                },
                y: {
                    min: 0,
                    max: 110,
                    ticks: {
                        stepSize: 20,
                        callback: function (value: number | string) {
                            return `${value}%`;
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
                        text: "Completion Rate",
                        color: textColor,
                        font: {
                            size: 12,
                            weight: "bold" as const,
                        },
                    },
                },
            },
        }),
        [textColor, gridColor, questionCounts]
    );

    // Chart data structure
    const data = {
        datasets: [
            {
                label: "Surveys",
                data: scatterData,
                backgroundColor: scatterData.map((point) =>
                    getPointColor(point.y)
                ),
                borderColor: scatterData.map((point) =>
                    getPointColor(point.y)
                        .replace("rgb", "rgba")
                        .replace(")", ", 0.8)")
                ),
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 12,
                pointHoverBorderWidth: 3,
            },
        ],
    };

    // Generate unique ID for this chart instance
    const chartId = useId();

    return (
        <div className="py-2">
            <div className="w-full" style={{ height: "400px" }}>
                <Scatter
                    data={data}
                    options={options}
                    id={chartId}
                    key={chartId}
                />
            </div>

            {/* Insights */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-5 text-center space-y-2">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {optimalLength}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Optimal Survey Length
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-5 text-center space-y-2">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {optimalRate}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Best Completion Rate
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-5 text-center space-y-2">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {scatterData.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Surveys Analyzed
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "rgb(34, 197, 94)" }}
                    />
                    <span className="text-xs text-gray-900 dark:text-white">
                        Excellent (≥90%)
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "rgb(59, 130, 246)" }}
                    />
                    <span className="text-xs text-gray-900 dark:text-white">
                        Good (75-89%)
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "rgb(251, 146, 60)" }}
                    />
                    <span className="text-xs text-gray-900 dark:text-white">
                        Fair (60-74%)
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: "rgb(239, 68, 68)" }}
                    />
                    <span className="text-xs text-gray-900 dark:text-white">
                        Needs Improvement (&lt;60%)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CompletionRateScatter;
