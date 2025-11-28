import { useParams } from "react-router-dom";
import ButtonsContainer from "./ButtonsContainer/ButtonsContainer";
import Metrics from "./Metrics/Metrics";
import QuestionsAndPerformance from "./QuestionsAndPerformance/QuestionsAndPerformance";
import SurveyInformations from "./SurveyInformation/SurveyInformations";
import { useEffect, useState } from "react";
import { surveyAPI } from "../../../../utils/api/models/survey";

const SurveyPage = () => {
    const { uuid } = useParams();

    const [survey, setSurvey] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Start loading as soon as the component mounts

    useEffect(() => {
        const fetchData = async () => {
            try {
                const surveyData = await surveyAPI.getSurveyData(uuid);
                setSurvey(surveyData);
            } catch (error) {
                console.error("Failed to fetch survey data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [uuid]);

    if (isLoading) {
        return (
            <div className="text-center p-8">
                <p>Loading survey data...</p>
            </div>
        );
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1">
            <div className="custom-container bg-white dark:bg-base-300 p-3 sm:p-4 lg:p-7">
                {/* Header */}
                <h3 className="font-semibold text-xl border-b pb-3 border-gray-400 custom-primary-txt">
                    {survey.title}
                </h3>

                <Metrics metrics={survey.metrics} />
                <SurveyInformations survey={survey} />
                <QuestionsAndPerformance />
                <ButtonsContainer survey={survey} />
            </div>
        </div>
    );
};

export default SurveyPage;
