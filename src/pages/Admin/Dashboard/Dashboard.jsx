import DashboardSkeleton from "./DashboardSkeleton";
import MainMetrics from "./HeroMetrics.jsx";

import { useState, useEffect } from "react";
import { dashboardAPI } from "../../../utils/api/pages/dashboard.js";
import SupportingMetrics from "./SupportingMetrics.jsx";
import SurveyComposition from "./SurveyComposition.jsx";

import FailedToLoad from "../../../components/reusable/FailedToLoad.jsx";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorLoadingData, setErrorLoadingData] = useState(false);
    const [mainMetricsData, setMainMetricsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dashboardAPI.getDashboardMetrics();
                setMainMetricsData(res.data);
                setErrorLoadingData(false);
            } catch (error) {
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
