import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import AnswersContainer from "./AnswersContainer";
import { surveyPageAPI } from "../../../../../../utils/api/pages/surveyPage";

const timeFormatter = (time) => {
    const date = new Date(time);

    const formatted = date.toLocaleString("en-US", {
        month: "short", // Dec
        day: "numeric", // 1
        year: "numeric", // 2024
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return formatted;
};

const ResponseContainer = ({ response, responseNumber }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [isFetchingAnswers, setIsFetchingAnswers] = useState(false);

    const handleExpand = async () => {
        setIsExpanded(!isExpanded);

        if (!isExpanded && answers.length === 0) {
            try {
                setIsFetchingAnswers(true);
                const res = await surveyPageAPI.getResponseAnswers(response.id);
                setAnswers(res.data);
            } catch (error) {
            } finally {
                setIsFetchingAnswers(false);
            }
        }
    };

    return (
        <div className="dark:bg-base-300 relative p-5 rounded-md bg-white border dark:border-slate-700 border-gray-300">
            <button
                onClick={() => handleExpand()}
                className="absolute text-sm hover:custom-primary-txt top-3 right-3 custom-sec-txt flex items-center gap-1"
            >
                <span>Expand</span>
                <ChevronDown />
            </button>

            <div className="flex items-center w-fit gap-3 mb-2">
                <h1 className="custom-primary-txt font-medium">
                    Response {responseNumber}
                </h1>
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                    Completed
                </span>
            </div>

            <p className="text-sm mb-2">
                <span className="dark:text-gray-400 text-gray-500">
                    Submitted:{" "}
                </span>
                <span className="custom-sec-txt">
                    {timeFormatter(response.submittedAt)}
                </span>
            </p>

            {response.respondentName && (
                <p className="text-sm mb-2">
                    <span className="dark:text-gray-400 text-gray-500">
                        Name:{" "}
                    </span>
                    <span className="custom-sec-txt">
                        {response.respondentName}
                    </span>
                </p>
            )}
            {response.respondentEmail && (
                <p className="text-sm mb-2">
                    <span className="dark:text-gray-400 text-gray-500">
                        Email:{" "}
                    </span>
                    <span className="custom-sec-txt">
                        {response.respondentEmail}
                    </span>
                </p>
            )}
            <p className="text-sm">
                <span className="dark:text-gray-400 text-gray-500">
                    Completion Time:{" "}
                </span>
                <span className="custom-sec-txt">
                    {response.completionTime}
                </span>
            </p>
            {isExpanded && (
                <AnswersContainer
                    answers={answers}
                    isFetching={isFetchingAnswers}
                />
            )}
        </div>
    );
};

export default ResponseContainer;
