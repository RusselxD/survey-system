import React from "react";

interface QuestionHeaderProps {
    ordinal: number;
    questionText: string;
    required: boolean;
}

const QuestionHeader = ({
    ordinal,
    questionText,
    required,
}: QuestionHeaderProps): React.JSX.Element => {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2">
                <span className="custom-primary-txt text-sm font-medium">
                    Q{ordinal}.
                </span>
                {required && (
                    <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-500 rounded border border-red-500/30">
                        Required
                    </span>
                )}
            </div>
            <p className="custom-primary-txt font-medium mt-1">
                {questionText}
            </p>
        </div>
    );
};

export default QuestionHeader;
