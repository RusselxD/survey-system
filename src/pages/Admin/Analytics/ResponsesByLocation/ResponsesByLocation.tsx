import { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useAuth } from "../../../../context/AuthContext";
import { ResponsesByLocation as ResponsesByLocationData } from "../../../../utils/api/pages/analytics";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ResponsesByLocationProps {
    dataset: ResponsesByLocationData;
}

interface SortedDataItem {
    location: string;
    count: number;
    percentage: string;
}

const ResponsesByLocation = ({
    dataset,
}: ResponsesByLocationProps): React.JSX.Element => {
    const { locations, responseCounts } = dataset;

    const { textColor, isDark } = useAuth();

    // Calculate total and percentages
    const totalResponses = responseCounts.reduce(
        (sum: number, count: number) => sum + count,
        0
    );

    // Sort data by response count
    const sortedData = useMemo<SortedDataItem[]>(() => {
        const combined = locations.map((location: string, index: number) => ({
            location,
            count: responseCounts[index],
            percentage: (
                (responseCounts[index] / totalResponses) *
                100
            ).toFixed(1),
        }));

        combined.sort(
            (a: SortedDataItem, b: SortedDataItem) => b.count - a.count
        );

        return combined;
    }, [locations, responseCounts, totalResponses]);

    // Generate colors - darker for higher counts, gray for "No Location"
    const generateColors = () => {
        const maxCount = Math.max(...responseCounts);
        const minCount = Math.min(...responseCounts);
        const range = maxCount - minCount;

        return sortedData.map((item) => {
            // Special color for "No Location"
            if (
                item.location === "No Location" ||
                item.location === "Unknown"
            ) {
                return isDark
                    ? "rgba(107, 114, 128, 0.7)"
                    : "rgba(156, 163, 175, 0.7)";
            }

            // Calculate intensity
            const intensity = range === 0 ? 1 : (item.count - minCount) / range;
            const hue = 220;
            const saturation = 70 + intensity * 20;
            const lightness = 70 - intensity * 35;

            return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        });
    };

    const barColors = generateColors();

    // Create treemap-style grid layout
    const TreemapGrid = () => {
        return (
            <div
                className="grid gap-1 w-full"
                style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gridAutoRows: "minmax(80px, auto)",
                }}
            >
                {sortedData.map((item, index) => {
                    // Calculate grid span based on percentage
                    const colSpan = Math.max(
                        1,
                        Math.min(4, Math.ceil(parseFloat(item.percentage) / 10))
                    );
                    const rowSpan = Math.max(
                        1,
                        Math.ceil(parseFloat(item.percentage) / 15)
                    );

                    const isNoLocation =
                        item.location === "No Location" ||
                        item.location === "Unknown";
                    const intensity = item.count / Math.max(...responseCounts);
                    const textColorBox = isNoLocation
                        ? isDark
                            ? "#ffffff"
                            : "#1f2937"
                        : intensity > 0.5
                        ? "#ffffff"
                        : "#1f2937";

                    return (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-3 rounded border-2 hover:scale-[1.03] transition-transform cursor-pointer"
                            style={{
                                backgroundColor: barColors[index],
                                borderColor: isDark ? "#374151" : "#e5e7eb",
                                gridColumn: `span ${colSpan}`,
                                gridRow: `span ${rowSpan}`,
                                minHeight: "80px",
                            }}
                            title={`${
                                item.location
                            }: ${item.count.toLocaleString()} responses (${
                                item.percentage
                            }%)`}
                        >
                            <div className="text-center">
                                <div
                                    className="font-bold text-sm mb-1"
                                    style={{ color: textColorBox }}
                                >
                                    {item.location}
                                </div>
                                <div
                                    className="text-lg font-bold"
                                    style={{ color: textColorBox }}
                                >
                                    {item.count.toLocaleString()}
                                </div>
                                <div
                                    className="text-xs"
                                    style={{
                                        color: textColorBox,
                                        opacity: 0.9,
                                    }}
                                >
                                    ({item.percentage}%)
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="py-2">
            <div className="text-center mb-6">
                <h2 className="text-lg font-bold" style={{ color: textColor }}>
                    Responses by Location
                </h2>
            </div>
            <div className="w-full">
                <TreemapGrid />
            </div>
            <div
                className="mt-4 text-sm text-center"
                style={{ color: textColor }}
            >
                <span className="font-semibold">Total Responses: </span>
                {totalResponses.toLocaleString()}
                {locations.includes("No Location") && (
                    <span
                        className="ml-4"
                        style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                    >
                        • Gray boxes indicate responses without location data
                    </span>
                )}
            </div>
        </div>
    );
};

export default ResponsesByLocation;
