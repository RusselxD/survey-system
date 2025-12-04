import React, { useEffect, useState } from "react";
import { ListChecks, ArrowRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { respondentsAPI } from "../../../../utils/api/respondents";
import FailedToLoad from "../../../../components/reusable/FailedToLoad";
import SurveyViewSkeleton from "./SurveyViewSkeleton";
import SurveyArchivedMessage from "../../../../components/reusable/SurveyArchivedMessage";

const SurveyView = () => {
    const { id } = useParams();

    const [isFetching, setIsFetching] = useState(true);
    const [survey, setSurvey] = useState(null);

    const navigate = useNavigate();
    const [isArchived, setIsArchived] = useState(false);

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setIsFetching(true);
                const res = await respondentsAPI.getSurveyPreviewDetails(id);

                // Check if survey has already been completed
                if (respondentsAPI.hasSurveyBeenCompleted(res.data.id)) {
                    navigate(`/s/${res.data.id}/completed`);
                    return;
                }

                if (res.data.status === "archived") {
                    setIsArchived(true);
                } else {
                    await respondentsAPI.recordSurveyView(res.data.id);
                }

                setSurvey(res.data);
            } catch (error) {
                console.log("Logging Error");
                console.log(error);
                if (error.response && error.response.status === 404) {
                    navigate("/not-found");
                    return;
                }
            } finally {
                setIsFetching(false);
            }
        };
        fetchSurveyData();
    }, [id]);

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

                                {/* Note Box */}
                                <div className="dark:bg-gray-700 bg-gray-100 rounded-lg p-3 md:p-4 mb-3 md:mb-4">
                                    <p className="text-sm md:text-base font-medium custom-sec-txt mb-2">
                                        Note:
                                    </p>
                                    <ul className="text-xs md:text-sm custom-sec-txt space-y-1 md:space-y-2 list-disc pl-5 pr-2">
                                        <li>Your responses are confidential</li>
                                        {(survey.askName ||
                                            survey.askEmail) && (
                                            <li className="leading-5 md:leading-7">
                                                Personal information you chose
                                                to provide will be securely
                                                stored and used solely for
                                                survey administration purposes
                                                in accordance with{" "}
                                                <a
                                                    href="https://privacy.gov.ph/data-privacy-act/"
                                                    target="_blank"
                                                    className="text-blue-500 hover:underline"
                                                >
                                                    data privacy regulations
                                                </a>
                                            </li>
                                        )}
                                        <li>
                                            All data are encrypted and securely
                                            stored
                                        </li>
                                        <li>
                                            You can complete this survey at your
                                            own pace
                                        </li>
                                    </ul>
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
