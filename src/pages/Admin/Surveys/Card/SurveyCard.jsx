import { ScanQrCode, Users, FileText } from "lucide-react";
import { useState } from "react";
import QRCodeModal from "../Modals/QRCodeModal";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    const statusColors = {
        published: "bg-green-500",
        draft: "bg-yellow-500",
        archived: "bg-gray-500",
    };

    return (
        <span
            className={`absolute top-3 right-3 px-3 py-2 ${statusColors[statusLower]} text-white text-xs font-semibold rounded-lg uppercase shadow-md`}
        >
            {status}
        </span>
    );
};

const ResponseAndQuestionsCount = ({ responsesCount, questionsCount }) => {
    return (
        <div className="flex gap-2 sm:gap-3 custom-sec-txt">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ">
                <Users size={14} className="sm:w-4 sm:h-4" />
                <p>{responsesCount.toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ">
                <FileText size={14} className="sm:w-4 sm:h-4" />
                <p>
                    {questionsCount}{" "}
                    {questionsCount === 1 ? "question" : "questions"}
                </p>
            </div>
        </div>
    );
};

const SurveyCard = ({ survey }) => {
    const navigate = useNavigate();

    const [qrModalIsOpen, setQrModalIsOpen] = useState(false);
    const [qrModalData, setQrModalData] = useState(null);

    return (
        <div className="card dark:bg-gray-700 bg-gray-100 dark:border-0 border border-gray-300 w-full max-w-sm shadow-sm hover:shadow-md transition-shadow relative">
            {survey.coverImageUrl && (
                <figure className="relative h-40 overflow-hidden">
                    <img
                        src={survey.coverImageUrl}
                        alt={survey.title}
                        className="w-full h-full object-cover"
                    />
                    {getStatusBadge(survey.status)}
                </figure>
            )}

            {/* Status Badge for no image */}
            {!survey.coverImageUrl && getStatusBadge(survey.status)}

            <div className="card-body p-4 sm:p-5 ">
                <h2
                    className={`text-base font-semibold custom-primary-txt truncate ${
                        !survey.coverImageUrl ? "pr-24 sm:pr-28" : ""
                    }`}
                >
                    {survey.title}
                </h2>

                <div className="flex flex-col justify-between flex-1 ">
                    <p
                        className={`text-xs sm:text-sm leading-5 sm:leading-6 custom-sec-txt line-clamp-3 break-words ${
                            survey.description ? "" : "italic"
                        }`}
                    >
                        {survey.description || "No description provided yet."}
                    </p>

                    <div className="mt-2">
                        {survey.status.toLowerCase() !== "draft" && (
                            <ResponseAndQuestionsCount
                                responsesCount={survey.responseCount}
                                questionsCount={survey.questionCount}
                            />
                        )}

                        {survey.status.toLowerCase() === "draft" && (
                            <p className="text-xs dark:text-yellow-400 text-orange-500">
                                Last Edited:{" "}
                                {formatDistanceToNow(
                                    new Date(survey.updatedAt),
                                    { addSuffix: true }
                                )}
                            </p>
                        )}
                        <div className="card-actions justify-between items-center mt-2">
                            {survey.qrCodeUrl && (
                                <ScanQrCode
                                    size={35}
                                    onClick={() => {
                                        setQrModalData({
                                            title: survey.title,
                                            qrCodeUrl: survey.qrCodeUrl,
                                        });
                                        setQrModalIsOpen(true);
                                    }}
                                    className=" hover:bg-gray-100 dark:hover:bg-gray-600 custom-primary-txt p-1 rounded-md transition-colors cursor-pointer"
                                />
                            )}

                            {/* To keep the View Details button aligned */}
                            {!survey.qrCodeUrl && survey.status !== "draft" && (
                                <p>&nbsp;</p>
                            )}

                            {survey.status === "draft" && (
                                <>
                                    <button
                                        onClick={() => {
                                            navigate(
                                                `/admin/surveys/${survey.id}/edit`
                                            );
                                        }}
                                        className="bg-green-600 hover:bg-green-700 border border-green-700 text-white px-3 sm:px-4 py-1.5 sm:py-2.5 text-xs rounded-md transition-all active:scale-95 inline-flex items-center"
                                    >
                                        Continue Editing
                                    </button>
                                </>
                            )}

                            {survey.status !== "draft" && (
                                <Link
                                    to={`/admin/surveys/${survey.id}/view-details`}
                                    className="custom-primary-btn px-4 py-2 lg:py-3 text-xs"
                                >
                                    View Details
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {qrModalIsOpen && (
                <QRCodeModal
                    qrModalData={qrModalData}
                    onClose={() => setQrModalIsOpen(false)}
                />
            )}
        </div>
    );
};

export default SurveyCard;
