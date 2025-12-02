import { Link, useParams } from "react-router-dom";
import SurveyMainDetails from "./SurveyMainDetails/SurveyMainDetails";
import { ArrowLeft, Copy } from "lucide-react";
import QuestionsAndResponses from "./QuestionsAndResponses/QuestionsAndResponses";
import { useAuth } from "../../../../context/AuthContext";

const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:5173";

const SurveyPage = () => {
    const { id } = useParams();

    const { toastSuccess } = useAuth();

    const handleCopyLink = () => {
        const text = `${appUrl}/s/${id}`;
        navigator.clipboard
            .writeText(text)
            .then(() => {
                console.log("Text copied to clipboard");
                toastSuccess("Link copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy text: ", err);
            });
    };

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1">
            <div className="flex items-center justify-between mb-2">
                <Link
                    to="/admin/surveys"
                    className="flex items-center gap-2 text-sm w-fit pr-3 py-2 rounded-md  custom-sec-txt hover:custom-primary-txt transition-colors"
                >
                    <ArrowLeft size={20}/>
                    <span>Back to Surveys</span>
                </Link>
                <button
                    onClick={() => handleCopyLink()}
                    className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 px-5 py-3 text-white rounded-md"
                >
                    <Copy size={20} />
                    <span>Public Link</span>
                </button>
            </div>
            <SurveyMainDetails id={id} />
            <QuestionsAndResponses id={id} />
        </div>
    );
};

export default SurveyPage;
