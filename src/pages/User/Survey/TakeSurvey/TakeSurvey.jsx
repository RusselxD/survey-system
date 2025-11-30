import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { respondentsAPI } from "../../../../utils/api/respondents";
import SurveyViewSkeleton from "../SurveyView/SurveyViewSkeleton";
import SurveyHeader from "./SurveyHeader";
import QuestionContainer from "./QuestionContainer";

const TakeSurvey = () => {
    const { id } = useParams();

    const [isFetching, setIsFetching] = useState(true);
    const [survey, setSurvey] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setIsFetching(true);
                const res = await respondentsAPI.getSurveyQuestions(id);

                if (res.data.status === "archived") {
                    navigate(`/s/${res.data.id}`);
                    return;
                }

                // Check if THIS specific survey has been viewed
                if (!respondentsAPI.hasSurveyBeenViewed(res.data.id)) {
                    console.log(
                        "Survey not viewed yet, redirecting to preview..."
                    );
                    navigate(`/s/${res.data.id}`);
                    return;
                }

                setSurvey(res.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate("/not-found");
                    return;
                }
                console.log(error);
            } finally {
                setIsFetching(false);
            }
        };
        fetchSurveyData();
    }, [id]);

    if (isFetching) {
        return <SurveyViewSkeleton />;
    }

    return (
        <div className="min-h-screen gap-2 sm:gap-4 dark:bg-base-100 bg-gray-100/70 p-2 sm:p-5 flex flex-col items-center md:items-center md:justify-start">
            <SurveyHeader survey={survey} />
            <QuestionContainer survey={survey} />
        </div>
    );
};

export default TakeSurvey;
