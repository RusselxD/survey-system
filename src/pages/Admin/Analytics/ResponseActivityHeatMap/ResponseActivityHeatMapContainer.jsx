import { useEffect, useState } from "react";
import ResponseActivityHeatMap from "./ResponseActivityHeatMap";
import { useAuth } from "../../../../context/AuthContext";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const ResponseActivityHeatMapContainer = () => {

    const [viewType, setViewType] = useState("hourly"); // "hourly" or "daily"

    const { toastError } = useAuth();

    const [dataset, setDataset] = useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getResponseActivityData(
                    viewType
                );
                setDataset(res.data);
            } catch (error) {
                console.log(error);
                toastError("Failed to fetch response activity data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch, viewType]);

    if (isFetching) {
        return <div className="skeleton w-full h-96 rounded-lg"></div>;
    }

    if (!dataset) {
        return (
            <FailedToLoadComponent
                dataName="response activity data"
                handleReloadComponent={() => setIsFetching((prev) => prev + 1)}
                heightAndWidth="w-full h-96"
            />
        );
    }

    return (
        <div className="custom-container overflow-hidden w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <ResponseActivityHeatMap
                dataset={dataset}
                view={viewType}
            />
        </div>
    );
};

export default ResponseActivityHeatMapContainer;

{
    /* View Toggle */
}
{
    /* <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => setViewType("hourly")}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            viewType === "hourly"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                    >
                        Hourly View
                    </button>
                    <button
                        onClick={() => setViewType("daily")}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            viewType === "daily"
                                ? "bg-blue-500 text-white shadow-lg"
                                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                        }`}
                    >
                        Daily View
                    </button>
                </div> */
}
