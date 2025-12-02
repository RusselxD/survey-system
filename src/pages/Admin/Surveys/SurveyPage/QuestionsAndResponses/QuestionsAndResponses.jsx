import { useEffect, useState } from "react";
import Questions from "./Questions/Questions";
import Responses from "./Responses/Responses";
import { surveyPageAPI } from "../../../../../utils/api/pages/surveyPage";

const TabHeader = ({
    chosenTab,
    setChosenTab,
    questionCount,
    responseCount,
}) => {
    return (
        <div className="relative mb-5">
            {/* Bottom border container - sits below tabs */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-300 dark:bg-gray-500 z-0"></div>

            <div className="flex font-medium relative z-10">
                <button
                    onClick={() => setChosenTab("questions")}
                    className={`relative ${
                        chosenTab == "questions"
                            ? "dark:text-blue-400"
                            : "dark:text-gray-300"
                    } px-5 py-2 w-fit`}
                >
                    Questions &#40;{questionCount}&#41;
                    {chosenTab == "questions" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 dark:bg-blue-400 bg-blue-500 z-20"></div>
                    )}
                </button>
                <button
                    onClick={() => setChosenTab("responses")}
                    className={`relative ${
                        chosenTab == "responses"
                            ? "dark:text-blue-400"
                            : "dark:text-gray-300"
                    } px-5 py-2 w-fit`}
                >
                    Responses &#40;{responseCount}&#41;
                    {chosenTab == "responses" && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 dark:bg-blue-400 bg-blue-500 z-20"></div>
                    )}
                </button>
            </div>
        </div>
    );
};

const QuestionsAndResponses = ({ id }) => {
    const [chosenTab, setChosenTab] = useState("questions");

    const [questionCount, setQuestionCount] = useState(0);
    const [responseCount, setResponseCount] = useState(0);
    const [isFetchingCounts, setIsFetchingCounts] = useState(true);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                setIsFetchingCounts(true);
                const res = await surveyPageAPI.getSurveyCounts(id);
                setQuestionCount(res.data.questionCount);
                setResponseCount(res.data.responseCount);
            } catch (error) {
                // TODO
            } finally {
                setIsFetchingCounts(false);
            }
        };
        fetchCounts();
    }, []);

    return (
        <div className="mt-10">
            <TabHeader
                chosenTab={chosenTab}
                setChosenTab={setChosenTab}
                questionCount={questionCount}
                responseCount={responseCount}
            />
            <div
                style={{
                    display: chosenTab === "questions" ? "block" : "none",
                }}
            >
                <Questions id={id} />
            </div>

            <div
                style={{
                    display: chosenTab === "responses" ? "block" : "none",
                }}
            >
                <Responses id={id} />
            </div>
        </div>
    );
};

export default QuestionsAndResponses;
