import { useEffect, useState, useMemo } from "react";

const QuestionTypeLollipop = ({ dataset }) => {
    const { questionTypes, counts } = dataset;

    const [isDark, setIsDark] = useState(
        () => window.matchMedia("(prefers-color-scheme: dark)").matches
    );

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

    // Calculate total and percentages
    const totalCount = counts.reduce((sum, count) => sum + count, 0);

    // Sort data by count (descending)
    const sortedData = useMemo(() => {
        const combined = questionTypes.map((type, index) => ({
            type,
            count: counts[index],
            percentage: ((counts[index] / totalCount) * 100).toFixed(1),
        }));

        combined.sort((a, b) => b.count - a.count);

        return combined;
    }, [questionTypes, counts, totalCount]);

    const maxCount = Math.max(...counts);

    // Color palette for different question types
    const colorPalette = [
        "rgb(59, 130, 246)", // Blue
        "rgb(34, 197, 94)", // Green
        "rgb(251, 146, 60)", // Orange
        "rgb(168, 85, 247)", // Purple
        "rgb(236, 72, 153)", // Pink
        "rgb(14, 165, 233)", // Sky
        "rgb(234, 179, 8)", // Yellow
        "rgb(239, 68, 68)", // Red
    ];

    return (
        <div className="w-full py-4">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Question Types Usage
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Distribution across question types
                </p>
            </div>

            {/* Lollipop Chart */}
            <div className="px-20 space-y-6">
                {sortedData.map((item, index) => {
                    const widthPercentage = (item.count / maxCount) * 100;
                    const color = colorPalette[index % colorPalette.length];
                    const isTop = item.count === maxCount; // Mark all items with max count as top

                    return (
                        <div key={index} className="group">
                            {/* Question Type Label & Percentage */}
                            <div className="flex items-center justify-between mb-2">
                                <h3 className=" font-semibold text-gray-900 dark:text-white">
                                    {item.type}
                                </h3>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                                        {item.percentage}%
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                        ({item.count.toLocaleString()})
                                    </span>
                                </div>
                            </div>

                            {/* Lollipop: Line + Circle */}
                            <div className="flex items-center gap-0">
                                {/* Line (stick) */}
                                <div
                                    className="h-2 z-10 rounded-l-full transition-all duration-500 group-hover:h-3"
                                    style={{
                                        width: `${widthPercentage}%`,
                                        backgroundColor: color,
                                        opacity: 0.7,
                                    }}
                                />

                                {/* Circle (lollipop head) */}
                                <div
                                    className={`z-20 rounded-full transition-all duration-500 flex items-center justify-center ${
                                        isTop
                                            ? "w-8 h-8 ring-4 ring-yellow-400 ring-offset-2 dark:ring-offset-gray-900"
                                            : "w-6 h-6 group-hover:w-8 group-hover:h-8"
                                    }`}
                                    style={{
                                        backgroundColor: color,
                                        marginLeft: "-12px",
                                        boxShadow: `0 4px 12px ${color
                                            .replace("rgb", "rgba")
                                            .replace(")", ", 0.4)")}`,
                                    }}
                                >
                                    {isTop && (
                                        <span className="text-xs font-bold text-white">
                                            # 1
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Summary Stats */}
            <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-5 text-center space-y-2">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {sortedData.length}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Question Types
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-5 text-center space-y-2">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {sortedData[0]?.type}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Most Used Type
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-5 text-center space-y-2">
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                        {sortedData[0]?.percentage}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        Top Type Share
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionTypeLollipop;