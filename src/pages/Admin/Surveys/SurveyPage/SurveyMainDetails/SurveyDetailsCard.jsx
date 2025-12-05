import { Briefcase, MapPin } from "lucide-react";
import { useState } from "react";
import { surveyPageAPI } from "../../../../../utils/api/pages/surveyPage";
import { useAuth } from "../../../../../context/AuthContext";
import ConfirmDeleteModal from "../../../../../components/reusable/ConfirmDeleteModal";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const StatusBadge = ({ status }) => {
    if (!status) return null;

    const statusLower = status.toLowerCase();
    let badgeStyle = "";
    let statusText = "";

    switch (statusLower) {
        case "published":
            badgeStyle =
                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
            statusText = "Published";
            break;
        case "archived":
            badgeStyle =
                "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300";
            statusText = "Archived";
            break;
        default:
            return null;
    }

    return (
        <span
            className={`absolute top-4 right-4 text-xs font-medium px-3 py-2 rounded-lg ${badgeStyle}`}
        >
            {statusText}
        </span>
    );
};

const SurveyDetailsCard = ({ survey, handleUpdateSurveyStatus }) => {
    const navigate = useNavigate();
    const { toastError, toastSuccess } = useAuth();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [isArchiving, setIsArchiving] = useState(false);
    const [isUnarchiving, setIsUnarchiving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleArchive = async () => {
        setIsArchiving(true);
        try {
            await surveyPageAPI.archiveSurvey(survey.id);
            handleUpdateSurveyStatus("archived");
            toastSuccess("Survey archived successfully.");
        } catch (error) {
            toastError("Failed to archive survey.");
        } finally {
            setIsArchiving(false);
        }
    };

    const handleUnarchive = async () => {
        setIsUnarchiving(true);
        try {
            await surveyPageAPI.unarchiveSurvey(survey.id);
            handleUpdateSurveyStatus("published");
            toastSuccess("Survey unarchived successfully.");
        } catch (error) {
            toastError("Failed to unarchive survey.");
        } finally {
            setIsUnarchiving(false);
        }
    };

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            await surveyPageAPI.deleteSurvey(survey.id);
            toastSuccess("Survey deleted successfully.");
            navigate("/admin/surveys");
        } catch (error) {
            toastError("Failed to delete survey.");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDelete = async () => {
        setOpenDeleteModal(true);
    };

    return (
        <div className="custom-container p-7 dark:bg-base-300 bg-white relative">
            {openDeleteModal && (
                <ConfirmDeleteModal
                    toBeDeleted="this survey"
                    onClose={() => setOpenDeleteModal(false)}
                    handleDelete={handleConfirmDelete}
                />
            )}

            <StatusBadge status={survey.status} />

            <h1 className="custom-primary-txt font-bold text-xl pr-24">
                {survey.title}
            </h1>

            {survey.description && (
                <p className="custom-sec-txt my-2 leading-8">
                    {survey.description}
                </p>
            )}

            <div className="flex gap-5 text-sm">
                <p className="space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">
                        Created by:
                    </span>

                    <span className="custom-sec-txt">{survey.createdBy}</span>
                </p>

                <p className="space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">
                        Last updated:
                    </span>

                    <span className="custom-sec-txt">
                        {formatDate(survey.updatedAt)}
                    </span>
                </p>
            </div>

            {survey.locationName && (
                <div className="gap-3 text-sm mt-3 flex items-center custom-sec-txt">
                    <MapPin size={22} />

                    <span>{survey.locationName}</span>
                </div>
            )}

            {survey.serviceTypeName && (
                <div className="gap-3 text-sm mt-3 flex items-center custom-sec-txt">
                    <Briefcase size={22} />

                    <span>{survey.serviceTypeName}</span>
                </div>
            )}

            <div className=" flex items-center justify-end gap-3">
                {survey.status.toLowerCase() === "published" ? (
                    <button
                        onClick={handleArchive}
                        disabled={isArchiving}
                        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isArchiving && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Archive
                    </button>
                ) : (
                    <button
                        onClick={handleUnarchive}
                        disabled={isUnarchiving}
                        className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isUnarchiving && (
                            <span className="loading loading-spinner loading-sm"></span>
                        )}
                        Unarchive
                    </button>
                )}

                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isDeleting && (
                        <span className="loading loading-spinner loading-sm"></span>
                    )}
                    Delete
                </button>
            </div>
        </div>
    );
};

export default SurveyDetailsCard;
