import React, { useEffect, useState } from "react";
import CompletionTimeDistChart from "./CompletionTimeDistribution/CompletionTimeDistChart";
import TopSurveysByResponse from "./TopSurveysByResponseRate/TopSurveysByResponse";
import EngagementFunnel from "./EngagementFunnel/EngagementFunnel";
import ResponsesByLocation from "./ResponsesByLocation/ResponsesByLocation";
import ResponseTrendContainer from "./ResponseTrendLineChart/ResponseTrendContainer";
import TopSurveysByResponseRateContainer from "./TopSurveysByResponseRate/TopSurveysByResponseRateContainer";
import TopSurveysByResponseCount from "./TopSurveysByResponseCount/TopSurveysByResponseCount";

const topSurveyByResponsesData = {
    surveys: [
        "Customer Satisfaction Q4",
        "Product Feedback Survey",
        "Employee Pulse Check",
        "Event Feedback Survey",
        "Onboarding Experience",
    ],
    responseRates: [92, 85, 78, 71, 68],
    responseCounts: [1840, 1275, 936, 568, 408],
};

// Top Surveys By Response Count

const completionTimeDistData = {
    timeRanges: ["0-2", "2-4", "4-6", "6-8", "8-10", "10-12", "12-14", "14+"],
    responseCounts: [45, 120, 185, 210, 110, 90, 70, 30],
    peakRange: "6-8",
};

const engagementFunnelData = [
    { label: "Survey Views", value: 423867 },
    { label: "Survey Started", value: 352653, rate: 83.2 },
    { label: "Survey Completed", value: 345600, rate: 81.5 },
];

const responsesByLocationData = {
    locations: [
        "Arkong Bato",
        "Bagbaguin",
        "Balangkas",
        "Bignay",
        "Bisig",
        "Canumay East",
        "Canumay West",
        "Coloong",
        "Dalandanan",
        "Gen. T. de Leon",
        "Isla",
        "Karuhatan",
        "Lawang Bato",
        "Lingunan",
        "Mabolo",
        "Malanday",
        "Malinta",
        "Mapulang Lupa",
        "Marulas",
        "Maysan",
        "Palasan",
        "Parada",
        "Pariancillo Villa",
        "Pasolo",
        "Paso de Blas",
        "Poblacion",
        "Pulo",
        "Punturin",
        "Rincon",
        "Tagalag",
        "Ugong",
        "Veinte Reales",
        "Wawang Pulo",
        "No Location",
    ],
    responseCounts: [
        15234, 1567, 9823, 7456, 6234, 5123, 4567, 3890, 3234, 2567, 2123, 1890,
        8456, 7234, 6456, 5890, 5234, 4567, 4123, 3789, 3456, 3123, 2890, 2567,
        2234, 1987, 1765, 1543, 1321, 1198, 1076, 954, 832, 1231,
    ],
};

const Analytics = () => {
    const [days, setDays] = useState(10);

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 flex flex-col gap-3">
            <ResponseTrendContainer days={days} />

            {/* Top Surveys by Response Rate & Response Count */}
            <div className="flex gap-3 h-[27rem]">
                <TopSurveysByResponseRateContainer />
                <TopSurveysByResponseCount />
            </div>

            {/* Completion Time Distribution and Engagement Funnel */}
            <div className="flex gap-3 h-[22rem]">
                <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
                    <CompletionTimeDistChart dataset={completionTimeDistData} />
                </div>

                <EngagementFunnel dataset={engagementFunnelData} />
            </div>

            {/* Responses By Location */}
            <div className="custom-container flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
                <ResponsesByLocation dataset={responsesByLocationData} />
            </div>

            {/* Responses By Service Type */}
        </div>
    );
};

export default Analytics;
