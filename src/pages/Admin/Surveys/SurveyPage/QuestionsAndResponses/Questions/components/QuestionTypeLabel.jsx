import React from "react";

const QuestionTypeLabel = ({ questionType }) => {
    const formatQuestionType = (type) => {
        return type
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    return (
        <span className="text-xs px-2 py-1 dark:bg-base-200 bg-gray-100 dark:text-gray-400 text-gray-600 rounded border dark:border-gray-600 border-gray-300">
            {formatQuestionType(questionType)}
        </span>
    );
};

export default QuestionTypeLabel;
