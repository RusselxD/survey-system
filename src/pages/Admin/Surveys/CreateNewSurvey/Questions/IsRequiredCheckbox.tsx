interface Question {
    id: number;
    type_id: number;
    text: string;
    required: boolean;
    metadata: Record<string, any>;
}

interface IsRequiredCheckboxProps {
    question: Question;
    handleChangeIsRequired: (questionId: number, isRequired: boolean) => void;
}

const IsRequiredCheckbox = ({
    question,
    handleChangeIsRequired,
}: IsRequiredCheckboxProps): React.JSX.Element => {
    return (
        <label className="flex items-center gap-2 cursor-pointer w-fit">
            <input
                onChange={(e) =>
                    handleChangeIsRequired(question.id, e.target.checked)
                }
                type="checkbox"
                checked={question.required}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-800 cursor-pointer"
            />
            <span className="text-xs custom-primary-txt">Required</span>
        </label>
    );
};

export default IsRequiredCheckbox;
