import React from "react";

interface HorizontalBarProps {
    label: string;
    count: number;
    percentage: number;
}

const HorizontalBar = ({
    label,
    count,
    percentage,
}: HorizontalBarProps): React.JSX.Element => {
    return (
        <div className="mb-3">
            <div className="flex items-center justify-between mb-1 text-sm">
                <span className="custom-sec-txt">{label}</span>
                <span className="custom-sec-txt font-medium">
                    {count.toLocaleString()} ({percentage.toFixed(1)}%)
                </span>
            </div>
            <div className="w-full h-6 dark:bg-gray-700 bg-gray-200 rounded-sm overflow-hidden">
                <div
                    className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default HorizontalBar;
