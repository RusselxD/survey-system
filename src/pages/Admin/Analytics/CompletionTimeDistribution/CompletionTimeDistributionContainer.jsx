import React, { useEffect, useState } from "react";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";
import CompletionTimeDistChart from "./CompletionTimeDistChart";

const CompletionTimeDistributionContainer = () => {
    const { toastError } = useAuth();

    const [completionTimeDistData, setCompletionTimeDistData] = useState();
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getCompletionTimeDistribution();
                setCompletionTimeDistData(res.data);
            } catch (error) {
                toastError("Failed to load completion time distribution data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton flex-1"></div>;
    }

    if (!completionTimeDistData) {
        return (
            <FailedToLoadComponent
                dataName="completion time distribution data"
                heightAndWidth="flex-1"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
            />
        );
    }

    return (
        <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <CompletionTimeDistChart dataset={completionTimeDistData} />
        </div>
    );
};

export default CompletionTimeDistributionContainer;
