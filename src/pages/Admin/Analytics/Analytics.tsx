import EngagementFunnel from "./EngagementFunnel/EngagementFunnel";
import ResponseTrendContainer from "./ResponseTrendLineChart/ResponseTrendContainer";
import TopSurveysByResponseRateContainer from "./TopSurveysByResponseRate/TopSurveysByResponseRateContainer";
import CompletionTimeDistributionContainer from "./CompletionTimeDistribution/CompletionTimeDistributionContainer";
import ResponsesByLocationContainer from "./ResponsesByLocation/ResponsesByLocationContainer";
import ResponsesByServiceTypeContainer from "./ResponsesByServiceType/ResponsesByServiceTypeContainer";
import ResponseActivityHeatMapContainer from "./ResponseActivityHeatMap/ResponseActivityHeatMapContainer";
import SurveysRankedByResponseCountContainer from "./SurveysRankedByResponseCount/SurveysRankedByResponseCountContainer";
import QuestionTypeDistributionContainer from "./QuestionTypeDistribution/QuestionTypeDistributionContainer";
import CompletionRateBySurveyLengthContainer from "./CompletionRateBySurveyLength/CompletionRateBySurveyLengthContainer";

const Analytics = (): React.JSX.Element => {
    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 flex flex-col gap-3">
            <ResponseTrendContainer />

            {/* Top Surveys by Response Rate & Response Count */}
            <div className="flex gap-3 h-[27rem]">
                <TopSurveysByResponseRateContainer />
                <SurveysRankedByResponseCountContainer />
            </div>

            {/* Completion Time Distribution and Engagement Funnel */}
            <div className="flex gap-3 h-[22rem]">
                <CompletionTimeDistributionContainer />
                <EngagementFunnel />
            </div>

            {/* Responses By Location */}
            <ResponsesByLocationContainer />

            {/* Responses By Service Type */}
            <ResponsesByServiceTypeContainer />

            {/* Reponse Activity Heatmap */}
            <ResponseActivityHeatMapContainer />

            {/* Question Type Usage Lollipop */}
            <QuestionTypeDistributionContainer />

            {/* Completion Rate by Survey Length */}
            <CompletionRateBySurveyLengthContainer />
        </div>
    );
};

export default Analytics;
