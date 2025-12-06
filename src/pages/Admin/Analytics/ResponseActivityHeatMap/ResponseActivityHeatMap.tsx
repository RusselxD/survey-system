import React from "react";
import { useAuth } from "../../../../context/AuthContext";
import { ResponseActivityHeatMapProps } from "../../../../utils/api/pages/analytics";

const ResponseActivityHeatMap: React.FC<ResponseActivityHeatMapProps> = ({
    dataset,
    view = "hourly",
}) => {
    const { labels, responseCounts } = dataset;

    const { textColor, isDark } = useAuth();

    // Calculate intensity for color mapping
    const maxCount = Math.max(...responseCounts);
    const minCount = Math.min(...responseCounts);

    // Generate color based on count (heatmap style)
    const getHeatmapColor = (count: number) => {
        if (count === 0) {
            return isDark
                ? "rgba(55, 65, 81, 0.3)"
                : "rgba(229, 231, 235, 0.5)";
        }

        const intensity =
            maxCount === minCount
                ? 1
                : (count - minCount) / (maxCount - minCount);

        // Use blue gradient for heatmap
        const hue = 220; // Blue
        const saturation = 70 + intensity * 20;
        const lightness = 75 - intensity * 40; // Lighter to darker

        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    // Find peak time
    const peakIndex = responseCounts.indexOf(maxCount);
    const peakLabel = labels[peakIndex];

    return (
        <div className="my-3">
            <div className="text-center mb-4">
                <h2
                    className="text-lg font-bold mb-2"
                    style={{ color: textColor }}
                >
                    Response Activity {view === "hourly" ? "by Hour" : "by Day"}
                </h2>
                <p
                    className="text-sm"
                    style={{ color: isDark ? "#9ca3af" : "#6b7280" }}
                >
                    Peak activity time:{" "}
                    <span className="font-semibold">{peakLabel}</span> (
                    {maxCount.toLocaleString()} responses)
                </p>
            </div>

            <div className="w-full">
                <div
                    className={`flex items-end justify-center h-96 pb-8 ${
                        view === "hourly" ? "space-x-1" : "space-x-3"
                    }`}
                >
                    {labels.map((label, index) => {
                        const count = responseCounts[index];
                        const percentage =
                            maxCount === 0 ? 0 : (count / maxCount) * 100;
                        const color = getHeatmapColor(count);
                        const isPeak = index === peakIndex;

                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center flex-1"
                            >
                                {/* Bar container */}
                                <div
                                    className=" w-full flex flex-col justify-end items-center"
                                    style={{ height: "300px" }}
                                >
                                    <div
                                        className="w-full rounded-t transition-all duration-300 hover:scale-x-105 relative flex items-end justify-center pb-1"
                                        style={{
                                            height: `${percentage}%`,
                                            minHeight:
                                                count > 0 ? "30px" : "0px",
                                            backgroundColor: color,
                                            border: isPeak
                                                ? `2px solid ${
                                                      isDark
                                                          ? "#fbbf24"
                                                          : "#f59e0b"
                                                  }`
                                                : "none",
                                            boxShadow: isPeak
                                                ? "0 0 10px rgba(251, 191, 36, 0.5)"
                                                : "none",
                                        }}
                                    >
                                        {/* Count label inside bar */}
                                        {count > 0 && percentage > 15 && (
                                            <div
                                                className="text-xs font-semibold transform rotate-0"
                                                style={{
                                                    color: "#ffffff",
                                                }}
                                            >
                                                {count.toLocaleString()}
                                            </div>
                                        )}

                                        {/* Count above bar if too small */}
                                        {count > 0 && percentage <= 15 && (
                                            <div
                                                className="text-xs absolute h-full bottom-4 font-semibold mb-1"
                                                style={{ color: textColor }}
                                            >
                                                {count.toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Label */}
                                <div
                                    className="text-xs h-10 font-medium mt-2 text-center"
                                    style={{
                                        color: textColor,
                                        writingMode:
                                            view === "hourly"
                                                ? "vertical-rl"
                                                : "horizontal-tb",
                                        transform:
                                            view === "hourly"
                                                ? "rotate(180deg)"
                                                : "none",
                                    }}
                                >
                                    {label}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className=" flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: getHeatmapColor(0) }}
                        />
                        <span className="text-xs" style={{ color: textColor }}>
                            No Activity
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{
                                backgroundColor: getHeatmapColor(
                                    minCount + (maxCount - minCount) * 0.25
                                ),
                            }}
                        />
                        <span className="text-xs" style={{ color: textColor }}>
                            Low
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{
                                backgroundColor: getHeatmapColor(
                                    minCount + (maxCount - minCount) * 0.5
                                ),
                            }}
                        />
                        <span className="text-xs" style={{ color: textColor }}>
                            Moderate
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{
                                backgroundColor: getHeatmapColor(
                                    minCount + (maxCount - minCount) * 0.75
                                ),
                            }}
                        />
                        <span className="text-xs" style={{ color: textColor }}>
                            High
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{
                                backgroundColor: getHeatmapColor(maxCount),
                            }}
                        />
                        <span className="text-xs" style={{ color: textColor }}>
                            Peak
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponseActivityHeatMap;
