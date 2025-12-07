import { useEffect, useState } from "react";
import {
    analyticsAPI,
    CompletionTimeDistribution,
} from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";
import CompletionTimeDistChart from "./CompletionTimeDistChart";
import DownloadExcelButton from "../../../../components/reusable/DownloadExcelButton";

const CompletionTimeDistributionContainer = (): React.JSX.Element => {
    const { toastError } = useAuth();

    const [completionTimeDistData, setCompletionTimeDistData] =
        useState<CompletionTimeDistribution | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [refetch, setRefetch] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getCompletionTimeDistribution();
                setCompletionTimeDistData(res.data);
            } catch (error: any) {
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
        <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white relative">
            <div className="absolute left-3 top-3 z-10">
                <DownloadExcelButton
                    data={completionTimeDistData.timeRanges.map(
                        (timeRange, index) => ({
                            "Time Range": timeRange,
                            "Response Count":
                                completionTimeDistData.responseCounts[index],
                        })
                    )}
                    fileName="Completion-Time-Distribution"
                    sheetName="Completion Times"
                />
            </div>
            <CompletionTimeDistChart dataset={completionTimeDistData} />
        </div>
    );
};

export default CompletionTimeDistributionContainer;
