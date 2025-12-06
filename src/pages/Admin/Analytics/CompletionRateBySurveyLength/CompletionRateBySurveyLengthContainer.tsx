import React, { useEffect, useState } from "react";
import CompletionRateScatter from "./CompletionRateScatter";
import { useAuth } from "../../../../context/AuthContext";
import { analyticsAPI, CompletionRateBySurveyLength } from "../../../../utils/api/pages/analytics";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const CompletionRateBySurveyLengthContainer = (): React.JSX.Element => {
    const { toastError } = useAuth();

    const [dataset, setDataset] = useState<CompletionRateBySurveyLength | null>(
        null
    );
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [refetch, setRefetch] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res =
                    await analyticsAPI.getCompletionRateBySurveyLength();
                setDataset(res.data);
            } catch (error: any) {
                console.error("Failed to fetch completion rate data:", error);
                toastError(
                    "Failed to fetch completion rate by survey length data."
                );
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton w-full h-96"></div>;
    }

    if (!dataset) {
        return (
            <FailedToLoadComponent
                dataName="completion rate by survey length data"
                heightAndWidth="w-full h-96"
                handleReloadComponent={() => setRefetch(refetch + 1)}
            />
        );
    }

    return (
        <div className="custom-container overflow-hidden w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <CompletionRateScatter dataset={dataset} />
        </div>
    );
};

export default CompletionRateBySurveyLengthContainer;
