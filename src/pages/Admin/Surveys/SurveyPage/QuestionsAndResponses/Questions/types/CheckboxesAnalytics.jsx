import React from "react";
import HorizontalBar from "../components/HorizontalBar";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";
import QuestionHeader from "../components/QuestionHeader";

const CheckboxesAnalytics = ({ question }) => {
    const analyticsData = JSON.parse(question.analyticsData);

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
