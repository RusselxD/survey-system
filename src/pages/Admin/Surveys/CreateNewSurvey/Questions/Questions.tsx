import { GripVertical, Trash2, Copy } from "lucide-react";
import { useState } from "react";
import QuestionTypeDropDown from "./QuestionTypeDropDown";
import AddQuestionButton from "./AddQuestionButton";
import IsRequiredCheckbox from "./IsRequiredCheckbox";
import QuestionEditor from "./QuestionEditor";
import { IdNamePair } from "../../../../../utils/api/models/survey";

interface Question {
    id: number;
    type_id: number;
    text: string;
    required: boolean;
    metadata: Record<string, any>;
}

interface QuestionsProps {
    questionTypes: IdNamePair[];
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
}

const Questions = ({
    questionTypes,
    questions,
    setQuestions,
}: QuestionsProps): React.JSX.Element => {
    const [focusedQuestionId, setFocusedQuestionId] = useState<number | null>(
        null
    );

    const handleDeleteQuestion = (id: number) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const handleDuplicateQuestion = (id: number) => {
        const questionToDuplicate = questions.find((q) => q.id === id);
        if (questionToDuplicate) {
            const newQuestion = {
                ...questionToDuplicate,
                id: Date.now(),
                text: `${questionToDuplicate.text} (copy)`,
            };
            const index = questions.findIndex((q) => q.id === id);
            const newQuestions = [...questions];
            newQuestions.splice(index + 1, 0, newQuestion);
            setQuestions(newQuestions);
        }
    };

    const handleChangeQuestionType = (
        questionId: number,
        newTypeId: number
    ) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === questionId ? { ...q, type_id: newTypeId } : q
            )
        );
    };

    const handleChangeIsRequired = (
        questionId: number,
        isRequired: boolean
    ) => {
        setQuestions((prev) =>
            prev.map((q) =>
                q.id === questionId ? { ...q, required: isRequired } : q
            )
        );
    };

    const handleUpdateQuestion = (
        questionId: number,
        updatedQuestion: Question
    ) => {
        setQuestions((prev) =>
            prev.map((q) => (q.id === questionId ? updatedQuestion : q))
        );
    };

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

    const handleDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        index: number
    ) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (
        e: React.DragEvent<HTMLDivElement>,
        index: number
    ) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";

        if (draggedIndex === null || draggedIndex === index) {
            setDragOverIndex(null);
            return;
        }

        setDragOverIndex(index);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOverIndex(null);
    };

    const handleDrop = (
        e: React.DragEvent<HTMLDivElement>,
        dropIndex: number
    ) => {
        e.preventDefault();

        if (draggedIndex === null || draggedIndex === dropIndex) return;

        const newQuestions = [...questions];
        const draggedItem = newQuestions[draggedIndex];

        newQuestions.splice(draggedIndex, 1);
        newQuestions.splice(dropIndex, 0, draggedItem);

        setQuestions(newQuestions);
        setDragOverIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
        setDragOverIndex(null);
    };

    return (
        <div className="custom-container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <h1 className="custom-primary-txt font-semibold mb-3">Questions</h1>

            <div className="space-y-4">
                {questions.map((question, index) => {
                    const isFocused = focusedQuestionId === question.id;
                    return (
                        <div
                            key={question.id}
                            draggable={!isFocused}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index)}
                            onDragEnd={handleDragEnd}
                            onClick={() => setFocusedQuestionId(question.id)}
                            className={`p-4 overflow-y-auto rounded-lg transition-all ${
                                draggedIndex === index ? "opacity-50" : ""
                            } ${
                                dragOverIndex === index
                                    ? "border-2 border-blue-500 dark:border-blue-400"
                                    : isFocused
                                    ? "border-2 border-blue-400 dark:border-blue-500 shadow-lg bg-white dark:bg-slate-800"
                                    : "border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-slate-800/50 hover:border-gray-400 dark:hover:border-gray-500"
                            } ${!isFocused ? "cursor-move" : ""}`}
                        >
                            <div className="flex items-start gap-2">
                                <div
                                    className={`${
                                        !isFocused
                                            ? "cursor-grab active:cursor-grabbing"
                                            : "cursor-default"
                                    }`}
                                >
                                    <GripVertical
                                        size={20}
                                        className={
                                            isFocused
                                                ? "text-blue-500"
                                                : "text-gray-400"
                                        }
                                    />
                                </div>
                                <div className=" w-full overflow-y-auto">
                                    <input
                                        type="text"
                                        value={question.text}
                                        onChange={(e) =>
                                            handleUpdateQuestion(question.id, {
                                                ...question,
                                                text: e.target.value,
                                            })
                                        }
                                        onFocus={() =>
                                            setFocusedQuestionId(question.id)
                                        }
                                        placeholder="Question"
                                        className="w-full text-sm custom-primary-txt mb-3 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent focus:border-blue-500 focus:outline-none"
                                    />

                                    <QuestionEditor
                                        question={question}
                                        questionTypes={questionTypes}
                                        onUpdate={(updatedQuestion) =>
                                            handleUpdateQuestion(
                                                question.id,
                                                updatedQuestion
                                            )
                                        }
                                    />

                                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <QuestionTypeDropDown
                                                question={question}
                                                questionTypes={questionTypes}
                                                handleChangeQuestionType={
                                                    handleChangeQuestionType
                                                }
                                            />
                                            <IsRequiredCheckbox
                                                question={question}
                                                handleChangeIsRequired={
                                                    handleChangeIsRequired
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleDuplicateQuestion(
                                                        question.id
                                                    )
                                                }
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                                title="Duplicate"
                                            >
                                                <Copy size={18} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteQuestion(
                                                        question.id
                                                    )
                                                }
                                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <AddQuestionButton setQuestions={setQuestions} />
        </div>
    );
};

export default Questions;
