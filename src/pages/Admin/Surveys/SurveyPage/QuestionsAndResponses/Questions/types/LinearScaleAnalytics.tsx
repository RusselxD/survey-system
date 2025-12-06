import React from "react";
import HorizontalBar from "../components/HorizontalBar";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";
import QuestionHeader from "../components/QuestionHeader";

interface Distribution {
    Value: number;
    Count: number;
    Percentage: number;
}

interface AnalyticsData {
    Average: number;
    Distribution: Distribution[];
}

interface QuestionMetadata {
    min?: number;
    max?: number;
    minLabel?: string;
    maxLabel?: string;
}

interface Question {
    questionType: string;
    ordinal: number;
    questionText: string;
    required: boolean;
    analyticsData: string;
    questionMetadata: string;
    totalResponses: number;
    answeredCount: number;
    responseRate: number;
}

interface LinearScaleAnalyticsProps {
    question: Question;
}

const LinearScaleAnalytics = ({
    question,
}: LinearScaleAnalyticsProps): React.JSX.Element => {
    const analyticsData: AnalyticsData = JSON.parse(question.analyticsData);
    const questionMetadata: QuestionMetadata = JSON.parse(
        question.questionMetadata
    );

    // Generate star rating based on average
    const renderStars = (average: number): string => {
        const fullStars = Math.floor(average);
        const hasHalfStar = average % 1 >= 0.5;
        const stars: string[] = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push("⭐");
        }
        if (hasHalfStar) {
            stars.push("⭐");
        }

        return stars.join("");
    };

    return (
        <div className="dark:bg-base-300 bg-white p-5 rounded-md border dark:border-slate-700 border-gray-300 relative">
            <div className="absolute top-3 right-3">
                <QuestionTypeLabel questionType={question.questionType} />
            </div>
            <QuestionHeader
                ordinal={question.ordinal}
                questionText={question.questionText}
                required={question.required}
            />

            <div className="mb-4 p-3 dark:bg-base-200 bg-gray-50 rounded-md">
                <p className="text-sm">
                    <span className="dark:text-gray-400 text-gray-500">
                        Average:{" "}
                    </span>
                    <span className="custom-primary-txt font-medium text-lg">
                        {analyticsData.Average.toFixed(2)}{" "}
                        {renderStars(analyticsData.Average)}
                    </span>
                </p>
                {questionMetadata.minLabel && questionMetadata.maxLabel && (
                    <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                        {questionMetadata.min} = {questionMetadata.minLabel},{" "}
                        {questionMetadata.max} = {questionMetadata.maxLabel}
                    </p>
                )}
            </div>

            <div className="mt-4">
                <p className="text-sm dark:text-gray-400 text-gray-500 mb-3">
                    Distribution:
                </p>
                {analyticsData.Distribution.sort(
                    (a: Distribution, b: Distribution) => b.Value - a.Value
                ).map((dist: Distribution) => (
                    <HorizontalBar
                        key={dist.Value}
                        label={dist.Value.toString()}
                        count={dist.Count}
                        percentage={dist.Percentage}
                    />
                ))}
            </div>

            <QuestionStatsFooter
                totalResponses={question.totalResponses}
                answeredCount={question.answeredCount}
                responseRate={question.responseRate}
            />
        </div>
    );
};

export default LinearScaleAnalytics;
