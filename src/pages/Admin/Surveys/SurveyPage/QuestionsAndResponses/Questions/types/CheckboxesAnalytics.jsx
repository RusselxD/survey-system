import React from "react";
import HorizontalBar from "../components/HorizontalBar";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";

const CheckboxesAnalytics = ({ question }) => {
    const analyticsData = JSON.parse(question.analyticsData);

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
                {analyticsData.Options.map(
                    (option, index) =>
                        option.Text && (
                            <HorizontalBar
                                key={index}
                                label={option.Text}
                                count={option.SelectionCount}
                                percentage={option.SelectionRate}
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

export default CheckboxesAnalytics;
