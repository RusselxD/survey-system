import React, { useState, useEffect } from "react";
import DashboardSkeleton from "./DashboardSkeleton";
import MainMetrics from "./HeroMetrics";
import {
    dashboardAPI,
    DashboardMetrics,
} from "../../../utils/api/pages/dashboard";
import SupportingMetrics from "./SupportingMetrics";
import SurveyComposition from "./SurveyComposition";
import FailedToLoad from "../../../components/reusable/FailedToLoad";

const Dashboard = (): React.JSX.Element => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errorLoadingData, setErrorLoadingData] = useState<boolean>(false);
    const [mainMetricsData, setMainMetricsData] =
        useState<DashboardMetrics | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dashboardAPI.getDashboardMetrics();
                setMainMetricsData(res.data);
                setErrorLoadingData(false);
            } catch (error: any) {
                setErrorLoadingData(true);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (errorLoadingData) {
        return <FailedToLoad />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1 space-y-5">
            <MainMetrics data={mainMetricsData} />
            <SupportingMetrics data={mainMetricsData} />
            <SurveyComposition data={mainMetricsData} />
        </div>
    );
};

export default Dashboard;
