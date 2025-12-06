import { IdNamePair } from "../../../../../utils/api/models/survey";

interface Question {
    id: number;
    type_id: number;
    text: string;
    required: boolean;
    metadata: Record<string, any>;
}

const formatName = (name: string): string => {
    let res = "";
    name.split("_").forEach(
        (word) => (res += word.charAt(0).toUpperCase() + word.slice(1) + " ")
    );
    return res.trim();
};

interface QuestionTypeDropDownProps {
    question: Question;
    questionTypes: IdNamePair[];
    handleChangeQuestionType: (questionId: number, newTypeId: number) => void;
}

const QuestionTypeDropDown = ({
    question,
    questionTypes,
    handleChangeQuestionType,
}: QuestionTypeDropDownProps): React.JSX.Element => {
    return (
        <select
            value={question.type_id || 0}
            onChange={(e) =>
                handleChangeQuestionType(question.id, Number(e.target.value))
            }
            className="border dark:border-slate-600 p-2 text-xs rounded-md dark:bg-gray-900 bg-gray-200 dark:text-gray-100 text-gray-800 custom-sec-txt"
        >
            <option value={0}>Select question type</option>
            {questionTypes.map((qt, i) => {
                return (
                    <option value={qt.id} key={i}>
                        {formatName(qt.name)}
                    </option>
                );
            })}
        </select>
    );
};

export default QuestionTypeDropDown;
