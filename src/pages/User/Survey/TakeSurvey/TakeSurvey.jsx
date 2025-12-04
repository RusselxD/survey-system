import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { respondentsAPI } from "../../../../utils/api/respondents";
import SurveyViewSkeleton from "../SurveyView/SurveyViewSkeleton";
import SurveyHeader from "./SurveyHeader";
import QuestionContainer from "./QuestionContainer";

const TakeSurvey = () => {
    const { id } = useParams();

    const [isFetching, setIsFetching] = useState(true);
    const [survey, setSurvey] = useState(null);
    const [responseId, setResponseId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setIsFetching(true);
                const res = await respondentsAPI.getSurveyQuestions(id);

                // Check if survey has already been completed
                if (respondentsAPI.hasSurveyBeenCompleted(id)) {
                    navigate(`/s/${id}/completed`);
                    return;
                }

                if (res.data.status === "archived") {
                    navigate(`/s/${id}`);
                    return;
                }

                // Check if THIS specific survey has been viewed
                if (!respondentsAPI.hasSurveyBeenViewed(id)) {
                    navigate(`/s/${id}`);
                    return;
                }

                setSurvey(res.data);

                const startRes = await respondentsAPI.startSurvey(id);
                setResponseId(startRes.data.responseId);
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
    }, [id, navigate]);

    if (isFetching) {
        return <SurveyViewSkeleton />;
    }

    if (!survey) {
        return <SurveyViewSkeleton />;
    }

    return (
        <div className="min-h-screen gap-2 sm:gap-4 dark:bg-base-100 bg-gray-200/70 p-2 sm:p-5 flex flex-col items-center md:items-center md:justify-start">
            <SurveyHeader survey={survey} />
            <QuestionContainer survey={survey} responseId={responseId} />
        </div>
    );
};

export default TakeSurvey;
