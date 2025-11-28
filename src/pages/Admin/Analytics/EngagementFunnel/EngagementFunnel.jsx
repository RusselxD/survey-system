import { TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const ProgressBar = ({ label, value, rate }) => {
    // Map color names to actual hex values
    const colorMap = {
        "Survey Started": "#60a5fa",
        "Survey Completed": "#4ade80",
        "Survey Views": "#fbbf24",
    };

    return (
        <div className="">
            <div className="flex items-center justify-between mb-1">
                <p className="dark:text-gray-300 text-gray-700 text-sm">
                    {label}
                </p>
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
                <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                    {rate.toFixed(2)}% of{" "}
                    {label === "Survey Started" ? "views" : "started"}
                </p>
            )}
        </div>
    );
};

const EngagementFunnel = () => {
    const { toastError } = useAuth();

    const [engagementFunnelData, setEngagementFunnelData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                // await new Promise((resolve) => setTimeout(resolve, 1000));
                // throw new Error("Test error");
                const res = await analyticsAPI.getEngagementFunnelData();
                setEngagementFunnelData(res.data);
            } catch (error) {
                toastError("Failed to fetch engagement funnel data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton flex-1"></div>;
    }

    if (!engagementFunnelData) {
        return (
            <FailedToLoadComponent
                dataName="engagement data"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
                heightAndWidth="flex-1"
            />
        );
    }

    return (
        <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white flex flex-col">
            <h1 className="flex items-center gap-2 mb-5">
                <TrendingUp className="text-green-400" />
                <span className="custom-primary-txt font-semibold">
                    Engagement Funnel
                </span>
            </h1>
            <div className="flex flex-col justify-between flex-1">
                <div className="space-y-5">
                    {engagementFunnelData.slice(0, 3).map((data, i) => {
                        return <ProgressBar key={i} {...data} />;
                    })}
                </div>
                <div className="border-t py-3 dark:border-gray-400 flex items-center justify-between">
                    <p className="dark:text-gray-300 text-gray-700 text-sm">
                        {engagementFunnelData[3].label}
                    </p>
                    <p className="text-red-500 font-semibold">
                        {engagementFunnelData[3].rate.toFixed(2)}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EngagementFunnel;
