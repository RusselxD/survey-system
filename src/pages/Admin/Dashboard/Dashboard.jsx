import DashboardSkeleton from "./DashboardSkeleton";
import MainMetrics from "./MainMetrics";
import ResponseInsights from "./ResponseInsights";
import SatisfactionInsight from "./SatisfactionInsights";
import { SatisfactionTrendChart } from "./SatisfactionTrendChart";

import { ArrowRight, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";

const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
};

const getCurrentWeek = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    const currentWeek = `${formatDate(sevenDaysAgo)} - ${formatDate(today)}`;
    return { today, currentWeek };
};

const getMainMetricsData = () => {
    // function call that fetches and returns main metrics data

    // mock data
    return {
        totalSurveys: (2562262300).toLocaleString(),
        totalResponses: (123867000).toLocaleString(),
        avgSatisfaction: `${(4.2).toFixed(1)}/5`,
        completionRate: `${(98).toFixed(0)}%`,
        netPromoterScore: 90,
        csat: `${(90).toFixed(0)}%`,
    };
};

const getSatisfactionInsightsData = () => {
    // function call that fetches and returns main metrics data

    // mock data
    return {
        location: {
            best: "New York",
            worst: "Los Angeles",
            bestScore: 4.8,
            worstScore: 3.5,
        },
        serviceType: {
            best: "Premium",
            worst: "Basic",
            bestScore: 4.9,
            worstScore: 3.2,
        },
    };
};

const getResponseInsightsData = () => {
    // function call that fetches and returns main metrics data

    // mock data
    return {
        peakHours: "1-2 AM",
        peakHoursAvgResponses: 38,
        trend: 0.5,
    };
};

const Dashboard = ({ setChosenCategory }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [mainMetricsData, setMainMetricsData] = useState(null);
    const [satisfactionInsightsData, setSatisfactionInsightsData] =
        useState(null);
    const [responseInsightsData, setResponseInsightsData] = useState(null);

    useEffect(() => {
        
        const fetchData = async () => {
            setIsLoading(true);

            // Simulate API calls with delays
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const metricsData = getMainMetricsData();
            setMainMetricsData(metricsData);

            await new Promise((resolve) => setTimeout(resolve, 500));
            const satisfactionData = getSatisfactionInsightsData();
            setSatisfactionInsightsData(satisfactionData);

            await new Promise((resolve) => setTimeout(resolve, 500));
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
        <div className="p-8 bg-gray-100/70">
            <MainMetrics data={mainMetricsData} />
            <div className=" flex flex-col">
                <div className="w-full h-[30rem] bg-white py-8 mb-8 shadow-[0px_0px_5px_rgba(0,0,0,0.2)] rounded-md px-5">
                    <SatisfactionTrendChart />
                </div>

                <SatisfactionInsight
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
                            onClick={() => setChosenCategory(3)}
                            className="group h-12 inline-flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-blue-500 text-blue-600 text-base font-semibold rounded-lg shadow-sm transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md"
                        >
                            <BarChart3 className=" text-blue-600 group-hover:text-white" />
                            <span>View Detailed Analytics</span>
                            <div className="flex items-center justify-center w-5 h-5 bg-blue-50 rounded transition-all duration-300 group-hover:translate-x-0.5 group-hover:bg-white/20">
                                <ArrowRight className="w-3.5 h-3.5 text-blue-600 transition-colors duration-300 group-hover:text-white" />
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
