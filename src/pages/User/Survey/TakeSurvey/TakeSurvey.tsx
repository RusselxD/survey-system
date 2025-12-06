import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { respondentsAPI } from "../../../../utils/api/respondents";
import SurveyViewSkeleton from "../SurveyView/SurveyViewSkeleton";
import SurveyHeader from "./SurveyHeader";
import QuestionContainer from "./QuestionContainer";
import { AxiosError } from "axios";

interface Question {
    id: number;
    typeId: number;
    typeName: string;
    text: string;
    ordinal: number;
    required: boolean;
    metadata: string;
}

interface SurveyDetails {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    status: string;
    askName: boolean;
    askEmail: boolean;
    questions: Question[];
}

const TakeSurvey = (): React.JSX.Element => {
    const { id } = useParams<{ id: string }>();

    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [survey, setSurvey] = useState<SurveyDetails | null>(null);
    const [responseId, setResponseId] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveyData = async () => {
            if (!id) return;

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
                const axiosError = error as AxiosError;
                if (axiosError.response && axiosError.response.status === 404) {
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
