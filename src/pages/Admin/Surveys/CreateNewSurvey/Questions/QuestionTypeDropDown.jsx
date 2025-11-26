const QuestionTypeDropDown = ({
    question,
    questionTypes,
    handleChangeQuestionType,
}) => {
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
                        {qt.name}
                    </option>
                );
            })}
        </select>
    );
};

export default QuestionTypeDropDown;
