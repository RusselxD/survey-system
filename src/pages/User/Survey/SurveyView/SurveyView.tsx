import { useEffect, useState } from "react";
import { ListChecks, ArrowRight, Shield, FileText } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { respondentsAPI } from "../../../../utils/api/respondents";
import FailedToLoad from "../../../../components/reusable/FailedToLoad";
import SurveyViewSkeleton from "./SurveyViewSkeleton";
import SurveyArchivedMessage from "../../../../components/reusable/SurveyArchivedMessage";
import { AxiosError } from "axios";
import { settingsAPI } from "../../../../utils/api/pages/settingsPage";

interface SurveyPreview {
    id: string;
    title: string;
    description: string;
    status: string;
    coverImageUrl: string;
    askName: boolean;
    askEmail: boolean;
    questionCount: number;
}

const SurveyView = (): React.JSX.Element => {
    const { id } = useParams<{ id: string }>();

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [survey, setSurvey] = useState<SurveyPreview | null>(null);

    const navigate = useNavigate();
    const [isArchived, setIsArchived] = useState<boolean>(false);

    const [consentText, setConsentText] = useState<string>("");
    const [privacyText, setPrivacyText] = useState<string>("");

    useEffect(() => {
        const fetchSurveyData = async () => {
            if (!id) return;

            try {
                setIsFetching(true);
                const res = await respondentsAPI.getSurveyPreviewDetails(id);

                // Check if survey has already been completed
                if (respondentsAPI.hasSurveyBeenCompleted(id)) {
                    navigate(`/s/${id}/completed`);
                    return;
                }

                if (res.data.status === "archived") {
                    setIsArchived(true);
                } else if (res.data.status === "draft") {
                    navigate("/not-found");
                    return;
                } else {
                    await respondentsAPI.recordSurveyView(id);
                }

                const textsRes = await settingsAPI.getSystemSettings();

                const consentSetting = textsRes.data.find(
                    (s) => s.key === "consent_text"
                );
                const privacySetting = textsRes.data.find(
                    (s) => s.key === "privacy_text"
                );
                setConsentText(consentSetting ? consentSetting.value : "");
                setPrivacyText(privacySetting ? privacySetting.value : "");

                setSurvey(res.data);
            } catch (error) {
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 404) {
                    navigate("/not-found");
                    return;
                }
            } finally {
                setIsFetching(false);
            }
        };
        fetchSurveyData();
    }, [id, navigate]);

    if (isFetching) {
        return <SurveyViewSkeleton />;
    }

    if (!survey) {
        return (
            <div className="min-h-screen flex justify-center">
                <FailedToLoad />
            </div>
        );
    }

    return (
        <div className="min-h-screen dark:bg-base-100 bg-gray-100/70 p-2 sm:p-5 flex items-center md:items-start md:justify-center">
            <div className="md:w-[80%] lg:w-[60%] xl:w-[50%] ">
                {/* Survey Card */}
                <div className="dark:bg-base-300 bg-white rounded-xl overflow-hidden">
                    {/* Image Section (conditional) */}
                    {survey.coverImageUrl && (
                        <div className="relative h-28 sm:h-32 md:h-48 overflow-hidden">
                            <img
                                src={survey.coverImageUrl}
                                alt="Survey cover"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="p-2 sm:p-3 md:p-5">
                        <h1 className="text-xl md:text-2xl lg:text-3xl break-words font-bold custom-primary-txt mb-2">
                            {survey.title}
                        </h1>

                        {isArchived ? (
                            <SurveyArchivedMessage />
                        ) : (
                            <>
                                {survey.description && (
                                    <p className="custom-sec-txt text-xs md:text-sm mb-3 leading-6 md:leading-8">
                                        {survey.description}
                                    </p>
                                )}

                                <div className="flex items-center text-xs md:text-sm gap-2 mb-3 md:mb-4 custom-sec-txt">
                                    <ListChecks className="w-5 h-5 md:w-6 md:h-6" />
                                    <span>
                                        {survey.questionCount} Questions
                                    </span>
                                </div>

                                {/* Consent and Privacy Box */}
                                <div className="dark:bg-gray-700 bg-gray-100 rounded-lg p-3 md:p-4 mb-3 md:mb-4 space-y-4">
                                    <div className="flex gap-3">
                                        <FileText className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm md:text-base font-semibold custom-primary-txt mb-1">
                                                Data Consent
                                            </h3>
                                            <p className="text-xs md:text-sm custom-sec-txt leading-relaxed">
                                                {consentText ||
                                                    "By submitting this form, you consent to the collection and processing of your response."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Shield className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h3 className="text-sm md:text-base font-semibold custom-primary-txt mb-1">
                                                Privacy Policy
                                            </h3>
                                            <p className="text-xs md:text-sm custom-sec-txt leading-relaxed">
                                                {privacyText ||
                                                    "We value your privacy. Your responses are collected solely for service improvement and analytics purposes."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="flex justify-end">
                                    <Link
                                        to={`/s/${survey.id}/take`}
                                        className="mb-3 w-full md:w-fit gap-2 justify-center custom-primary-btn py-2 lg:py-3 md:px-6 text-xs lg:text-sm rounded-md transition-all duration-200 transform shadow-lg hover:shadow-xl"
                                    >
                                        <span>Take Survey</span>
                                        <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>

                                {/* Footer Text */}
                                <p className="text-center w-[80%] mx-auto text-[0.60rem] sm:mb-3 sm:text-xs text-gray-500 ">
                                    By taking this survey, you agree to our data
                                    collection terms
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyView;
