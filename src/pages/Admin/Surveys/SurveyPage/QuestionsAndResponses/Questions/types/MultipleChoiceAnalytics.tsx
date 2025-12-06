import React from "react";
import HorizontalBar from "../components/HorizontalBar";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";
import QuestionHeader from "../components/QuestionHeader";

interface AnalyticsData {
    Labels: string[];
    ResponseCounts: number[];
    ResponseRates: number[];
    MostCommon?: string;
}

interface Question {
    questionType: string;
    ordinal: number;
    questionText: string;
    required: boolean;
    analyticsData: string;
    totalResponses: number;
    answeredCount: number;
    responseRate: number;
}

interface MultipleChoiceAnalyticsProps {
    question: Question;
}

const MultipleChoiceAnalytics = ({
    question,
}: MultipleChoiceAnalyticsProps): React.JSX.Element => {
    const analyticsData: AnalyticsData = JSON.parse(question.analyticsData);

    return (
        <div className="dark:bg-base-300 bg-white p-5 rounded-md border dark:border-slate-700 border-gray-300 relative">
            <div className="absolute top-3 right-3">
                <QuestionTypeLabel questionType={question.questionType} />
            </div>
            <QuestionHeader
                ordinal={question.ordinal}
                questionText={question.questionText}
                required={question.required}
            />

            {analyticsData.MostCommon && (
                <div className="mb-4 p-3 dark:bg-base-200 bg-gray-50 rounded-md">
                    <p className="text-sm">
                        <span className="dark:text-gray-400 text-gray-500">
                            Most common:{" "}
                        </span>
                        <span className="custom-primary-txt font-medium">
                            {analyticsData.MostCommon} (
                            {analyticsData.ResponseRates[
                                analyticsData.Labels.indexOf(
                                    analyticsData.MostCommon
                                )
                            ]?.toFixed(1)}
                            %)
                        </span>
                    </p>
                </div>
            )}

            <div className="mt-4">
                {analyticsData.Labels.map(
                    (label: string, index: number) =>
                        label && (
                            <HorizontalBar
                                key={index}
                                label={label}
                                count={analyticsData.ResponseCounts[index]}
                                percentage={analyticsData.ResponseRates[index]}
                            />
                        )
                )}
            </div>

            <QuestionStatsFooter
                totalResponses={question.totalResponses}
                answeredCount={question.answeredCount}
                responseRate={question.responseRate}
            />
        </div>
    );
};

export default MultipleChoiceAnalytics;
