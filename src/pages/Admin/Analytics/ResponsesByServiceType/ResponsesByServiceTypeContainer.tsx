import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";
import ResponsesByServiceTypeChart from "./ResponsesByServiceTypeChart";
import {
    analyticsAPI,
    ResponsesByServiceType,
} from "../../../../utils/api/pages/analytics";

const ResponsesByServiceTypeContainer = (): React.JSX.Element => {
    const { toastError } = useAuth();

    const [responsesByServiceType, setResponsesByServiceType] =
        useState<ResponsesByServiceType | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [refetch, setRefetch] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const res = await analyticsAPI.getResponsesByServiceType();
                setResponsesByServiceType(res.data);
            } catch (error) {
                toastError("Failed to load responses by service type data.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton flex-1 py-32"></div>;
    }

    if (!responsesByServiceType) {
        return (
            <FailedToLoadComponent
                dataName="responses by service type data"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
                heightAndWidth="flex-1 p-12"
            />
        );
    }

    return (
        <div className="custom-container flex-1 flex items-center justify-center sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <ResponsesByServiceTypeChart dataset={responsesByServiceType} />
        </div>
    );
};

export default ResponsesByServiceTypeContainer;
