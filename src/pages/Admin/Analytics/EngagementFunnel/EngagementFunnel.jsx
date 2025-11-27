import { TrendingUp } from "lucide-react";
import React from "react";

const ProgressBar = ({ label, value, rate, color }) => {
    console.log(rate);

    // Map color names to actual hex values
    const colorMap = {
        "Survey Started": "#60a5fa",
        "Survey Completed": "#4ade80",
        "Survey Views": "#fbbf24",
    };

    return (
        <div className="">
            <div className="flex items-center justify-between mb-1">
                <p className="dark:text-gray-300 text-gray-700 text-sm">{label}</p>
                <p className="custom-primary-txt font-medium">
                    {value.toLocaleString()}
                </p>
            </div>

            <div className="relative w-full h-3 rounded-full overflow-hidden bg-gray-300 dark:bg-gray-700">
                <div
                    className="absolute left-0 top-0 bottom-0"
                    style={{
                        width: `${rate || 100}%`,
                        backgroundColor: colorMap[label] || "#60a5fa", // fallback to blue
                    }}
                ></div>
            </div>

            {rate && (
                <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">{rate} % of views</p>
            )}
        </div>
    );
};

const EngagementFunnel = ({ dataset }) => {
    return (
        <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white flex flex-col">
            <h1 className="flex items-center gap-2 mb-5">
                <TrendingUp className="text-green-400" />
                <span className="custom-primary-txt font-semibold">Engagement Funnel</span>
            </h1>
            <div className="flex flex-col justify-between flex-1">
                <div className="space-y-5">
                    {dataset.map((data, i) => {
                        return <ProgressBar key={i} {...data} />;
                    })}
                </div>
                <div className="border-t py-3 dark:border-gray-400 flex items-center justify-between">
                    <p className="dark:text-gray-300 text-gray-700 text-sm">
                        Abandonment Rate
                    </p>
                    <p className="text-red-500 font-semibold">18.5%</p>
                </div>
            </div>
        </div>
    );
};

export default EngagementFunnel;
