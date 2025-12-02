import React from "react";

const AnswerDisplay = ({ answer }) => {
    const questionMetadata = answer.questionMetadata
        ? JSON.parse(answer.questionMetadata)
        : {};
    const answerMetadata = answer.answerMetadata
        ? JSON.parse(answer.answerMetadata)
        : null;

    const renderAnswer = () => {
        switch (answer.questionType) {
            case "short_answer":
            case "paragraph":
            case "date":
            case "time":
                return (
                    <p className="custom-sec-txt text-sm">
                        {answer.answer || "No answer provided"}
                    </p>
                );

            case "multiple_choice":
            case "dropdown": {
                const selectedOption = questionMetadata.options?.find(
                    (opt) => opt.id === answerMetadata?.selectedOptionId
                );
                return (
                    <p className="custom-sec-txt text-sm">
                        {selectedOption?.text || "No answer provided"}
                    </p>
                );
            }

            case "checkboxes": {
                const selectedOptions = questionMetadata.options?.filter(
                    (opt) => answerMetadata?.selectedOptionIds?.includes(opt.id)
                );
                return (
                    <ul className="list-disc list-inside space-y-1">
                        {selectedOptions && selectedOptions.length > 0 ? (
                            selectedOptions.map((opt) => (
                                <li
                                    key={opt.id}
                                    className="custom-sec-txt text-sm"
                                >
                                    {opt.text}
                                </li>
                            ))
                        ) : (
                            <p className="custom-sec-txt text-sm">
                                No answer provided
                            </p>
                        )}
                    </ul>
                );
            }

            case "linear_scale": {
                const value = answerMetadata?.value;
                return (
                    <div className="flex items-center gap-3">
                        <p className="custom-sec-txt text-sm font-medium">
                            {value !== undefined ? value : "No answer provided"}
                        </p>
                        {value !== undefined && (
                            <p className="text-xs dark:text-gray-400 text-gray-500">
                                ({questionMetadata.min} to{" "}
                                {questionMetadata.max})
                            </p>
                        )}
                    </div>
                );
            }

            case "multiple_choice_grid": {
                if (!answerMetadata) {
                    return (
                        <p className="custom-sec-txt text-sm">
                            No answer provided
                        </p>
                    );
                }
                return (
                    <div className="space-y-2">
                        {questionMetadata.rows?.map((row) => {
                            const selectedColumnId = answerMetadata[row.id];
                            const selectedColumn =
                                questionMetadata.columns?.find(
                                    (col) => col.id === selectedColumnId
                                );
                            return (
                                <div
                                    key={row.id}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <span className="dark:text-gray-400 text-gray-500">
                                        {row.text}:
                                    </span>
                                    <span className="custom-sec-txt">
                                        {selectedColumn?.text || "Not answered"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                );
            }

            case "checkbox_grid": {
                if (!answerMetadata) {
                    return (
                        <p className="custom-sec-txt text-sm">
                            No answer provided
                        </p>
                    );
                }
                return (
                    <div className="space-y-2">
                        {questionMetadata.rows?.map((row) => {
                            const selectedColumnIds =
                                answerMetadata[row.id] || [];
                            const selectedColumns =
                                questionMetadata.columns?.filter((col) =>
                                    selectedColumnIds.includes(col.id)
                                );
                            return (
                                <div key={row.id} className="text-sm">
                                    <span className="dark:text-gray-400 text-gray-500">
                                        {row.text}:
                                    </span>
                                    {selectedColumns &&
                                    selectedColumns.length > 0 ? (
                                        <ul className="list-disc list-inside ml-4 mt-1">
                                            {selectedColumns.map((col) => (
                                                <li
                                                    key={col.id}
                                                    className="custom-sec-txt"
                                                >
                                                    {col.text}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span className="custom-sec-txt ml-2">
                                            Not answered
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            }

            default:
                return (
                    <p className="custom-sec-txt text-sm">
                        {answer.answer || "No answer provided"}
                    </p>
                );
        }
    };

    return (
        <div className="border-b dark:border-gray-600 border-gray-300 pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-start gap-2 mb-2">
                <span className="custom-primary-txt text-sm font-medium">
                    Q{answer.ordinal}.
                </span>
                <p className="custom-primary-txt text-sm font-medium flex-1">
                    {answer.questionText}
                </p>
            </div>
            <div className="ml-6">{renderAnswer()}</div>
        </div>
    );
};

const AnswersContainer = ({ answers, isFetching }) => {
    if (isFetching) {
        return (
            <div className="mt-6 space-y-4">
                <div className="bg-base-200 skeleton h-16 w-full"></div>
                <div className="bg-base-200 skeleton h-16 w-full"></div>
                <div className="bg-base-200 skeleton h-16 w-full"></div>
            </div>
        );
    }

    if (!answers || answers.length === 0) {
        return (
            <div className="mt-6 p-4 dark:bg-base-200 bg-gray-50 rounded-md">
                <p className="custom-sec-txt text-sm text-center">
                    No answers found for this response.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-6 space-y-4">
            {answers.map((answer) => (
                <AnswerDisplay key={answer.id} answer={answer} />
            ))}
        </div>
    );
};

export default AnswersContainer;
