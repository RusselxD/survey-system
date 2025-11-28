import React, { useEffect, useState } from "react";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import { ClipboardList } from "lucide-react";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const TopSurveysByResponseCount = () => {
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

    console.log(surveys);

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

    return (
        <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white ">
            <h1 className="flex items-center gap-2 mb-2">
                <ClipboardList className="text-green-400" />
                <span className="custom-primary-txt font-semibold text-sm">
                    Top Surveys by Response Count
                </span>
            </h1>

            <div className="flex flex-col max-h-[22rem] overflow-auto">
                {surveys.map((survey, i) => {
                    return (
                        <div className={` ${i < surveys.length - 1 ? 'border-b dark:border-gray-600' : ''} py-4 flex items-center`}>
                            <p className="text-xs dark:bg-gray-800 flex items-center justify-center w-7 h-7 rounded-full dark:text-gray-300 mr-2">
                                {i + 1}
                            </p>
                            <div className="">
                                <p className="dark:text-gray-200 text-sm">
                                    {survey.title}
                                </p>
                            </div>
                            <p className="ml-auto custom-primary-txt font-medium ">
                                {(survey.responseCount + 13545432300).toLocaleString()}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TopSurveysByResponseCount;
