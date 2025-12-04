import React from "react";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";
import QuestionHeader from "../components/QuestionHeader";

const GridAnalytics = ({ question }) => {
    const analyticsData = JSON.parse(question.analyticsData);
    const questionMetadata = JSON.parse(question.questionMetadata);

    // Get all column headers from metadata
    const columnHeaders = questionMetadata.columns || [];

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

            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="border-b dark:border-gray-600 border-gray-300">
                            <th className="text-left p-2 custom-sec-txt font-medium"></th>
                            {columnHeaders.map((col) => (
                                <th
                                    key={col.id}
                                    className="text-center p-2 custom-sec-txt font-medium"
                                >
                                    {col.text}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {analyticsData.Rows.map((row, rowIndex) => {
                            const rowMetadata =
                                questionMetadata.rows?.[rowIndex];

                            return (
                                <tr
                                    key={rowIndex}
                                    className="border-b dark:border-gray-600 border-gray-200 last:border-b-0"
                                >
                                    <td className="p-2 custom-primary-txt font-medium">
                                        {rowMetadata?.text ||
                                            row.RowText ||
                                            `Row ${rowIndex + 1}`}
                                    </td>
                                    {row.Columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="text-center p-2 custom-sec-txt"
                                        >
                                            {col.Count > 0 ? (
                                                <>
                                                    <div className="font-medium">
                                                        {col.Count.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs dark:text-gray-400 text-gray-500">
                                                        {col.Rate.toFixed(1)}%
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="dark:text-gray-600 text-gray-400">
                                                    -
                                                </span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <QuestionStatsFooter
                totalResponses={question.totalResponses}
                answeredCount={question.answeredCount}
                responseRate={question.responseRate}
            />
        </div>
    );
};

export default GridAnalytics;
