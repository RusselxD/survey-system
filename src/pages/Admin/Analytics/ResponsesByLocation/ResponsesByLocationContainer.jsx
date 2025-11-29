import React, { useEffect, useState } from "react";
import ResponsesByLocation from "./ResponsesByLocation";
import { useAuth } from "../../../../context/AuthContext";
import { se } from "date-fns/locale";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const ResponsesByLocationContainer = () => {
    const { toastError } = useAuth();

    const [responsesByLocationData, setResponsesByLocationData] =
        useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);

    const [includeAll, setIncludeAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getResponsesByLocation(includeAll);
                setResponsesByLocationData(res.data);
            } catch (error) {
                toastError("Failed to load responses by location data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton flex-1 py-40"></div>;
    }

    if (!responsesByLocationData) {
        return (
            <FailedToLoadComponent
                dataName="responses by location data"
                handleReloadComponent={() => setRefetch(refetch + 1)}
                heightAndWidth="flex-1 p-12"
            />
        );
    }

    return (
        <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <ResponsesByLocation dataset={responsesByLocationData} />
        </div>
    );
};

export default ResponsesByLocationContainer;
