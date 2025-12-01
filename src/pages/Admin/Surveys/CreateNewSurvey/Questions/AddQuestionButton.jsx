import { Plus } from "lucide-react";

const AddQuestionButton = ({ setQuestions }) => {
    return (
        <button
            onClick={() => {
                setQuestions((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        type_id: 0, // Default to multiple_choice
                        text: "",
                        required: false,
                        metadata: {},
                    },
                ]);
            }}
            className="flex text-sm mt-3 gap-2 transition-colors items-center justify-center px-3 py-2 rounded-md bg-blue-700 text-white hover:bg-blue-800"
        >
            <Plus size={20} />
            <span>Add Question</span>
        </button>
    );
};

export default AddQuestionButton;
