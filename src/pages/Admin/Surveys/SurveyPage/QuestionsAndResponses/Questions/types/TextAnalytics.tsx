import React from "react";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";
import QuestionHeader from "../components/QuestionHeader";
import { formatDistanceToNow } from "date-fns";

interface RecentResponse {
    Answer: string;
    AnsweredAt: string;
}

interface AnalyticsData {
    RecentResponses?: RecentResponse[];
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

interface TextAnalyticsProps {
    question: Question;
}

const TextAnalytics = ({ question }: TextAnalyticsProps): React.JSX.Element => {
    const analyticsData: AnalyticsData = JSON.parse(question.analyticsData);

    const formatTimeAgo = (dateString: string): string => {
        try {
            return formatDistanceToNow(new Date(dateString), {
                addSuffix: true,
            });
        } catch {
            return "Recently";
        }
    };

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

            <div className="mt-4">
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-3">
                    Recent responses:
                </p>
                {analyticsData.RecentResponses &&
                analyticsData.RecentResponses.length > 0 ? (
                    <div className="space-y-3">
                        {analyticsData.RecentResponses.map(
                            (response: RecentResponse, index: number) => (
                                <div
                                    key={index}
                                    className="p-3 dark:bg-base-200 bg-gray-50 rounded-md border dark:border-gray-600 border-gray-200"
                                >
                                    <p className="custom-sec-txt text-sm mb-1">
                                        "{response.Answer}"
                                    </p>
                                    <p className="text-xs dark:text-gray-400 text-gray-500">
                                        {formatTimeAgo(response.AnsweredAt)}
                                    </p>
                                </div>
                            )
                        )}
                    </div>
                ) : (
                    <p className="text-sm dark:text-gray-400 text-gray-500 italic">
                        No responses yet
                    </p>
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

export default TextAnalytics;
