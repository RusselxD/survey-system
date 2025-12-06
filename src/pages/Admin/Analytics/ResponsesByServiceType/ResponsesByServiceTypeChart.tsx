import { useId, useMemo } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    TooltipItem,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useAuth } from "../../../../context/AuthContext";
import { ResponsesByServiceType } from "../../../../utils/api/pages/analytics";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface ResponsesByServiceTypeChartProps {
    dataset: ResponsesByServiceType;
}

const ResponsesByServiceTypeChart = ({
    dataset,
}: ResponsesByServiceTypeChartProps): React.JSX.Element => {
    const { serviceTypes, responseCounts } = dataset;

    const { textColor, isDark } = useAuth();

    // Calculate total and percentages
    const totalResponses = responseCounts.reduce(
        (sum: number, count: number) => sum + count,
        0
    );
    const percentages = responseCounts.map((count: number) =>
        ((count / totalResponses) * 100).toFixed(1)
    );

    // Generate colors dynamically based on number of service types
    const colorPalette = serviceTypes.map((_: string, index: number) => {
        const hue = ((index * 360) / serviceTypes.length) % 360;
        return `hsl(${hue}, 70%, 60%)`;
    });

    const borderColors = serviceTypes.map((_: string, index: number) => {
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
                    position: "right" as const,
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 13,
                        },
                        color: textColor,
                        generateLabels: function (chart: ChartJS) {
                            const data = chart.data;
                            if (
                                data.labels &&
                                data.labels.length &&
                                data.datasets.length
                            ) {
                                return data.labels.map(
                                    (label: unknown, i: number) => {
                                        const count = data.datasets[0].data[
                                            i
                                        ] as number;
                                        const percentage = percentages[i];
                                        const bgColors = data.datasets[0]
                                            .backgroundColor as string[];
                                        return {
                                            text: `${label}: ${count.toLocaleString()} (${percentage}%)`,
                                            fillStyle: bgColors[i],
                                            fontColor: textColor,
                                            hidden: false,
                                            index: i,
                                        };
                                    }
                                );
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
                        label: function (context: TooltipItem<"doughnut">) {
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
        beforeDraw: function (chart: ChartJS) {
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
            <div className="w-full h-[25rem]">
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
