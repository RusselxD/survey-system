import React from "react";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";
import { formatDistanceToNow } from "date-fns";

const TextAnalytics = ({ question }) => {
    const analyticsData = JSON.parse(question.analyticsData);

    const formatTimeAgo = (dateString) => {
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
            <div className="mb-4">
                <span className="custom-primary-txt text-sm font-medium">
                    Q{question.ordinal}.
                </span>
                <p className="custom-primary-txt font-medium mt-1">
                    {question.questionText}
                </p>
            </div>

            <div className="mt-4">
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-3">
                    Recent responses:
                </p>
                {analyticsData.RecentResponses &&
                analyticsData.RecentResponses.length > 0 ? (
                    <div className="space-y-3">
                        {analyticsData.RecentResponses.map(
                            (response, index) => (
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
