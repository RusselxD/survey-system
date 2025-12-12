import { Link, useParams } from "react-router-dom";
import SurveyMainDetails from "./SurveyMainDetails/SurveyMainDetails";
import { ArrowLeft, Copy, FileDown } from "lucide-react";
import QuestionsAndResponses from "./QuestionsAndResponses/QuestionsAndResponses";
import { useAuth } from "../../../../context/AuthContext";
import { useState } from "react";

const appUrl = import.meta.env.VITE_APP_URL || "http://localhost:5173";

const SurveyPage = () => {
    const { id } = useParams<{ id: string }>();
    const { toastSuccess } = useAuth();
    const [exportTrigger, setExportTrigger] = useState<number>(0);
    const [isExporting, setIsExporting] = useState<boolean>(false);

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
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 relative">
            <div className="flex items-center justify-between mb-2">
                <Link
                    to="/admin/surveys"
                    className="flex items-center gap-2 text-sm w-fit pr-3 py-2 rounded-md  custom-sec-txt hover:custom-primary-txt transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Surveys</span>
                </Link>
                <div className="flex gap-2">
                    <button
                        onClick={() => setExportTrigger((prev) => prev + 1)}
                        disabled={isExporting}
                        className="flex items-center gap-2 text-sm bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 text-white rounded-lg transition-colors"
                    >
                        <FileDown size={20} />
                        <span>Export PDF</span>
                    </button>
                    <button
                        onClick={() => handleCopyLink()}
                        className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 px-4 py-3 text-white rounded-lg"
                    >
                        <Copy size={20} />
                        <span>Public Link</span>
                    </button>
                </div>
            </div>
            <SurveyMainDetails
                id={id!}
                exportTrigger={exportTrigger}
                setIsExporting={setIsExporting}
            />
            <QuestionsAndResponses id={id!} />
        </div>
    );
};

export default SurveyPage;