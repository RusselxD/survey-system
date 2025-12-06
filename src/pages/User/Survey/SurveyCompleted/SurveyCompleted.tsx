import { useEffect, useState } from "react";
import { CheckCircle, Info } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { respondentsAPI } from "../../../../utils/api/respondents";
import SurveyViewSkeleton from "../SurveyView/SurveyViewSkeleton";
import FailedToLoad from "../../../../components/reusable/FailedToLoad";
import { AxiosError } from "axios";

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

const SurveyCompleted = (): React.JSX.Element => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [survey, setSurvey] = useState<SurveyPreview | null>(null);

    useEffect(() => {
        const fetchSurveyData = async () => {
            if (!id) return;

            try {
                setIsFetching(true);
                const res = await respondentsAPI.getSurveyPreviewDetails(id);
                setSurvey(res.data);
            } catch (error) {
                console.log(error);
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
            <div className="md:w-[80%] lg:w-[60%] xl:w-[50%]">
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

                        {/* Success Message */}
                        <div className="sm:px-5 lg:mb-3 text-center">
                            {/* Icon */}
                            <div className="flex justify-center mb-3">
                                <div className="dark:bg-gray-700 bg-gray-100 rounded-full p-4">
                                    <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-green-500" />
                                </div>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg md:text-xl font-bold custom-primary-txt mb-2">
                                Response Submitted Successfully!
                            </h2>

                            {/* Description */}
                            <p className="italic text-xs md:text-sm custom-sec-txt mb-3 leading-relaxed">
                                Thank you for taking the time to complete this
                                survey.
                            </p>

                            {/* Info Box */}
                            <div className="dark:bg-gray-700 bg-gray-100 rounded-lg p-3 lg:p-4 w-full">
                                <div className="flex items-start gap-3 text-left">
                                    <Info className="w-5 h-5 custom-sec-txt mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm lg:text-base font-medium custom-primary-txt mb-1">
                                            What happens next?
                                        </p>
                                        <p className="text-xs lg:text-sm custom-sec-txt leading-relaxed lg:leading-loose">
                                            Your response has been securely
                                            recorded and will be used to improve
                                            our services. We appreciate your
                                            valuable feedback and the time you
                                            invested in completing this survey.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={() => {
                                        respondentsAPI.clearSurveyCompletion(
                                            survey.id
                                        );
                                        navigate(`/s/${survey.id}`);
                                    }}
                                    className="w-full md:w-fit gap-2 justify-center custom-primary-btn py-2 lg:py-3 md:px-6 text-xs lg:text-sm rounded-md transition-all duration-200 transform shadow-lg hover:shadow-xl"
                                >
                                    Submit Another Response
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyCompleted;
