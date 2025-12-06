import React from "react";

interface QuestionStatsFooterProps {
    totalResponses: number;
    answeredCount: number;
    responseRate: number;
}

const QuestionStatsFooter = ({
    totalResponses,
    answeredCount,
    responseRate,
}: QuestionStatsFooterProps): React.JSX.Element => {
    return (
        <div className="mt-4 pt-4 border-t dark:border-gray-600 border-gray-300 flex flex-wrap gap-4 text-sm">
            <div>
                <span className="dark:text-gray-400 text-gray-500">
                    Total Responses:{" "}
                </span>
                <span className="custom-sec-txt font-medium">
                    {totalResponses.toLocaleString()}
                </span>
            </div>
            <div>
                <span className="dark:text-gray-400 text-gray-500">
                    Answered:{" "}
                </span>
                <span className="custom-sec-txt font-medium">
                    {answeredCount.toLocaleString()}
                </span>
            </div>
            <div>
                <span className="dark:text-gray-400 text-gray-500">
                    Response Rate:{" "}
                </span>
                <span className="custom-sec-txt font-medium">
                    {responseRate.toFixed(2)}%
                </span>
            </div>
        </div>
    );
};

export default QuestionStatsFooter;
