import React, { useEffect, useState, useRef } from "react";
import { surveyPageAPI } from "../../../../../../utils/api/pages/surveyPage";
import MultipleChoiceAnalytics from "./types/MultipleChoiceAnalytics";
import CheckboxesAnalytics from "./types/CheckboxesAnalytics";
import LinearScaleAnalytics from "./types/LinearScaleAnalytics";
import TextAnalytics from "./types/TextAnalytics";
import GridAnalytics from "./types/GridAnalytics";
import DateTimeAnalytics from "./types/DateTimeAnalytics";

interface QuestionAnalytic {
    questionId: number;
    questionType: string;
    questionText: string;
    ordinal: number;
    required: boolean;
    analyticsData: string;
    questionMetadata: string;
    totalResponses: number;
    answeredCount: number;
    responseRate: number;
    [key: string]: any;
}

interface QuestionsProps {
    id: string;
}

const Questions = ({ id }: QuestionsProps): React.JSX.Element => {
    const [questionAnalytics, setQuestionAnalytics] = useState<
        QuestionAnalytic[]
    >([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

    const observerTarget = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use different loading state for initial vs pagination
                if (page === 1) {
                    setIsFetching(true);
                } else {
                    setIsLoadingMore(true);
                }

                const res = await surveyPageAPI.getQuestionAnalyticsPaginated(
                    id,
                    page,
                    5
                );
                setQuestionAnalytics((prev) => [...prev, ...res.data.data]);
                setHasMore(res.data.hasMore);
            } catch (error) {
                console.error("Failed to fetch question analytics:", error);
            } finally {
                setIsFetching(false);
                setIsLoadingMore(false);
            }
        };

        if (hasMore) {
            fetchData();
        }
    }, [id, page]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMore &&
                    !isLoadingMore &&
                    !isFetching
                ) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, isLoadingMore, isFetching]);

    const renderQuestionAnalytics = (
        question: QuestionAnalytic
    ): React.JSX.Element => {
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

    // Initial loading skeleton
    if (isFetching && page === 1) {
        return (
            <div className="space-y-3">
                <div className="skeleton w-full h-32"></div>
                <div className="skeleton w-full h-32"></div>
                <div className="skeleton w-full h-32"></div>
            </div>
        );
    }

    if (questionAnalytics.length === 0 && !isFetching) {
        return (
            <div className="dark:bg-base-300 bg-white p-8 rounded-md border dark:border-slate-700 border-gray-300 text-center">
                <p className="custom-sec-txt">
                    No question analytics available yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {questionAnalytics.map((question: QuestionAnalytic) =>
                renderQuestionAnalytics(question)
            )}

            {/* Loading indicator for pagination */}
            {isLoadingMore && (
                <div className="space-y-3">
                    <div className="skeleton w-full h-32"></div>
                    <div className="skeleton w-full h-32"></div>
                </div>
            )}

            {/* Invisible element to trigger loading */}
            {hasMore && <div ref={observerTarget} className="h-4" />}

            {!hasMore && questionAnalytics.length > 0 && (
                <p className="text-center text-gray-500 py-4">
                    All questions loaded
                </p>
            )}
        </div>
    );
};

export default Questions;
