import React from "react";

const DashboardSkeleton = () => {
    return (
        <div className="p-8 dark:bg-base-100 bg-gray-100">
            <div className="grid grid-cols-3 gap-5 pb-8 ">
                <div className="skeleton w-full h-28 rounded-md"></div>
                <div className="skeleton w-full h-28 rounded-md"></div>
                <div className="skeleton w-full h-28 rounded-md"></div>
                <div className="skeleton w-full h-28 rounded-md"></div>
                <div className="skeleton w-full h-28 rounded-md"></div>
                <div className="skeleton w-full h-28 rounded-md"></div>
            </div>
            <div className="skeleton w-full h-[30rem] rounded-md mb-8"></div>
            <div className="skeleton w-full h-[26rem] rounded-md mb-8"></div>
            <div className="w-full h-48 rounded-md mb-8">
                <div className="skeleton w-[60%] h-full rounded-md"></div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
