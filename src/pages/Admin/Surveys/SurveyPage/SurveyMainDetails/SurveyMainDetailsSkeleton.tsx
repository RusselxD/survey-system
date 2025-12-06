import React from "react";

const SurveyMainDetailsSkeleton = (): React.JSX.Element => {
    return (
        <div className="flex gap-4">
            <div className="flex-1">
                <div className="skeleton w-full h-44 mb-3"></div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="skeleton w-full h-32"></div>
                    <div className="skeleton w-full h-32"></div>
                    <div className="skeleton w-full h-32"></div>
                    <div className="skeleton w-full h-32"></div>
                    <div className="skeleton w-full h-32"></div>
                </div>
            </div>
            <div className="w-[30%] space-y-3">
                <div className="skeleton w-full h-56"></div>
                <div className="skeleton w-full h-56"></div>
            </div>
        </div>
    );
};

export default SurveyMainDetailsSkeleton;
