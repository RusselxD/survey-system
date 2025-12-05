import { useEffect, useState } from "react";
import { surveyPageAPI } from "../../../../../../utils/api/pages/surveyPage";
import MultipleChoiceAnalytics from "./types/MultipleChoiceAnalytics";
import CheckboxesAnalytics from "./types/CheckboxesAnalytics";
import LinearScaleAnalytics from "./types/LinearScaleAnalytics";
import TextAnalytics from "./types/TextAnalytics";
import GridAnalytics from "./types/GridAnalytics";
import DateTimeAnalytics from "./types/DateTimeAnalytics";

const Questions = ({ id }) => {
    const [questionAnalytics, setQuestionAnalytics] = useState(null);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await surveyPageAPI.getQuestionAnalytics(id);
                setQuestionAnalytics(res.data);
            } catch (error) {
                console.error("Failed to fetch question analytics:", error);
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [id]);

    const renderQuestionAnalytics = (question) => {
        switch (question.questionType) {
            case "multiple_choice":
            case "dropdown":
                return (
                    <MultipleChoiceAnalytics
                        key={question.questionId}
                        question={question}
                    />
                );

            case "checkboxes":
                return (
                    <CheckboxesAnalytics
                        key={question.questionId}
                        question={question}
                    />
                );

            case "linear_scale":
                return (
                    <LinearScaleAnalytics
                        key={question.questionId}
                        question={question}
                    />
                );

            case "short_answer":
            case "paragraph":
                return (
                    <TextAnalytics
                        key={question.questionId}
                        question={question}
                    />
                );

            case "multiple_choice_grid":
            case "checkbox_grid":
                return (
                    <GridAnalytics
                        key={question.questionId}
                        question={question}
                    />
                );

            case "date":
            case "time":
                return (
                    <DateTimeAnalytics
                        key={question.questionId}
                        question={question}
                    />
                );

            default:
                return (
                    <div
                        key={question.questionId}
                        className="dark:bg-base-300 bg-white p-5 rounded-md border dark:border-slate-700 border-gray-300"
                    >
                        <p className="custom-sec-txt text-sm">
                            Analytics not available for this question type:{" "}
                            {question.questionType}
                        </p>
                    </div>
                );
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-3">
                <div className="skeleton w-full h-32"></div>
                <div className="skeleton w-full h-32"></div>
                <div className="skeleton w-full h-32"></div>
            </div>
        );
    }

    if (!questionAnalytics || questionAnalytics.length === 0) {
        return (
            <div className="dark:bg-base-300 bg-white p-8 rounded-md border dark:border-slate-700 border-gray-300 text-center">
                <p className="custom-sec-txt">
                    No question analytics available yet.
                </p>
            </div>
        );
    }

    console.log(questionAnalytics)

    return (
        <div className="space-y-4">
            {questionAnalytics.map((question) =>
                renderQuestionAnalytics(question)
            )}
        </div>
    );
};

export default Questions;
