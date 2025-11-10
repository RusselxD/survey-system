import DashboardSkeleton from "./DashboardSkeleton";
import MainMetrics from "./MainMetrics";
import ResponseInsights from "./ResponseInsights";
import SatisfactionInsights from "./SatisfactionInsights";
import { SatisfactionTrendChart } from "./SatisfactionTrendChart";

import { ArrowRight, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    formatDate,
    getCurrentWeek,
    getMainMetricsData,
    getSatisfactionInsightsData,
    getResponseInsightsData,
} from "../../../utils/api/dashboard.js";

const Dashboard = () => {
    
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [mainMetricsData, setMainMetricsData] = useState(null);
    const [satisfactionInsightsData, setSatisfactionInsightsData] =
        useState(null);
    const [responseInsightsData, setResponseInsightsData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            // Simulate API calls with delays
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const metricsData = getMainMetricsData();
            setMainMetricsData(metricsData);

            // await new Promise((resolve) => setTimeout(resolve, 500));
            const satisfactionData = getSatisfactionInsightsData();
            setSatisfactionInsightsData(satisfactionData);

            // await new Promise((resolve) => setTimeout(resolve, 500));
            const responseData = getResponseInsightsData();
            setResponseInsightsData(responseData);

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const { today, currentWeek } = getCurrentWeek();

    if (isLoading) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1">
            <MainMetrics data={mainMetricsData} />
            <div className=" flex flex-col">
                <div className="container h-[30rem] dark:bg-base-300 bg-white py-8 mb-8 px-5">
                    <SatisfactionTrendChart />
                </div>
                <SatisfactionInsights
                    currentWeek={currentWeek}
                    data={satisfactionInsightsData}
                />

                <div className="w-full flex">
                    <ResponseInsights
                        today={today}
                        currentWeek={currentWeek}
                        formatDate={formatDate}
                        data={responseInsightsData}
                    />

                    <div className="flex-1 flex items-center justify-center">
                        <button
                            onClick={() => navigate("/admin/analytics")}
                            className="group h-12 custom-contrast-btn gap-2 p-3 dark:bg-base-100"
                        >
                            <BarChart3 className=" text-primary group-hover:text-white" />
                            <span>View Detailed Analytics</span>
                            <div className="flex items-center justify-center w-5 h-5 bg-primary/10 rounded transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20">
                                <ArrowRight className="w-3.5 h-3.5 text-primary transition-colors duration-300 group-hover:text-white" />
                            </div>
                        </button>
                    </div>
                </div>

                {/* <div className="w-full h-[25rem] py-8 flex justify-between border-b-2 border-gray-300">
                    <div className="w-[30%] h-full border-r-2 border-gray-300 pr-10 ">
                        <NPSPieChart />
                    </div>
                    <div className="w-[70%] h-full pl-10 ">
                        <ResponseTimeDistribution />
                    </div>
                </div>
                <div className="border-b-2 border-gray-300 py-3">
                    <LocationsRatingsChart />
                </div>
                <div className="border-b-2 border-gray-300 py-3">
                    <ServiceTypesRatingsChart />
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;
