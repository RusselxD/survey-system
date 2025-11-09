import React from "react";

const Metrics = ({metrics}) => {
    return (
        <div className="grid grid-cols-3 gap-5 pt-4">
            {metrics.map((metric, i) => (
                <div
                    className={`stat h-full w-full dark:bg-base-100 bg-gray-50 border-l-4 px-5 ${metric.borderColor} shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md`}
                    key={i}
                >
                    <div className="stat-value custom-primary-txt">
                        {metric.value}
                    </div>
                    <div className="stat-title font-medium custom-primary-txt">
                        {metric.title}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Metrics;
