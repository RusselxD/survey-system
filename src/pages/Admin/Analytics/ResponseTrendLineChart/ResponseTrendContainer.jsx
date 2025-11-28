import { useEffect, useState } from "react";
import ResponseTrend from "./ResponseTrend";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const ResponseTrendContainer = ({ days }) => {
    const [responseTrendData, setResponseTrendData] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);
    const { toastError } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getResponseTrends(days);
                setResponseTrendData(res.data);
            } catch (error) {
                toastError("Failed to fetch response trends.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [days, refetch]);

    if (isFetching) {
        return <div className="skeleton h-[27rem] w-full"></div>;
    }

    if (!responseTrendData) {
        return (
            <FailedToLoadComponent
                dataName="Response Trend Data"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
                heightAndWidth="h-[27rem] w-full"
            />
        );
    }

    return (
        <div className="custom-container h-[27rem] w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <ResponseTrend dataset={responseTrendData} days={days} />
        </div>
    );
};

export default ResponseTrendContainer;
