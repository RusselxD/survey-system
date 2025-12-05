import React, { useEffect, useState } from "react";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import { ClipboardList } from "lucide-react";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const SurveysRankedByResponseCountContainer = () => {
    const { toastError } = useAuth();
    const [surveys, setSurveys] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getTopSurveysByResponseCount();
                setSurveys(res.data);
            } catch (error) {
                toastError("Failed to load surveys with response count.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton flex-1"></div>;
    }

    if (!surveys) {
        return (
            <FailedToLoadComponent
                dataName="surveys"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
                heightAndWidth="flex-1"
            />
        );
    }

    const formatCount = (count) => {
        if (count >= 1e9) return (count / 1e9).toFixed(1) + "B";
        if (count >= 1e6) return (count / 1e6).toFixed(1) + "M";
        return count.toLocaleString();
    };

    return (
        <div className="custom-container w-[40%] overflow-x-hidden sm:p-4 lg:p-5  dark:bg-base-300 bg-white">
            <h1 className="flex items-center gap-2 mb-2">
                <ClipboardList className="text-green-400" />
                <span className="custom-primary-txt font-semibold text-sm">
                    Surveys Ranked by Response Count
                </span>
            </h1>

            <div className="flex flex-col max-h-[22rem] pr-2 overflow-auto">
                {surveys.map((survey, i) => {
                    const responseCount = survey.responseCount;
                    const displayCount = formatCount(responseCount);
                    const fullCount = responseCount.toLocaleString();

                    return (
                        <div
                            key={i}
                            className={`${
                                i < surveys.length - 1
                                    ? "border-b dark:border-gray-600"
                                    : ""
                            } py-4 flex items-center w-full`}
                        >
                            {/* Rank number */}
                            <div className="flex-shrink-0 w-8 mr-2">
                                <p className="text-xs dark:bg-gray-800 flex items-center justify-center w-7 h-7 rounded-full dark:text-gray-300">
                                    {i + 1}
                                </p>
                            </div>

                            {/* Title - will truncate with ellipsis */}
                            <div className="flex-1 min-w-0  mr-3">
                                <p
                                    className="dark:text-gray-200 max-w-[90%] text-sm whitespace-nowrap overflow-hidden text-ellipsis w-full"
                                    title={survey.title}
                                >
                                    {survey.title}
                                </p>
                            </div>

                            {/* Response count - fixed width */}
                            <div className="flex-shrink-0">
                                <p
                                    className="custom-primary-txt font-medium text-sm tabular-nums whitespace-nowrap"
                                    title={fullCount}
                                >
                                    {displayCount}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SurveysRankedByResponseCountContainer;
