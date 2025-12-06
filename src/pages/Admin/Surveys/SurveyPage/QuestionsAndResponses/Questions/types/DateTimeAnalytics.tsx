import React from "react";
import QuestionStatsFooter from "../components/QuestionStatsFooter";
import QuestionTypeLabel from "../components/QuestionTypeLabel";
import QuestionHeader from "../components/QuestionHeader";

interface AnalyticsData {
    MinDate?: string;
    MaxDate?: string;
    MinTime?: string;
    MaxTime?: string;
}

interface Question {
    questionType: string;
    ordinal: number;
    questionText: string;
    required: boolean;
    analyticsData: string;
    totalResponses: number;
    answeredCount: number;
    responseRate: number;
}

interface DateTimeAnalyticsProps {
    question: Question;
}

const DateTimeAnalytics = ({
    question,
}: DateTimeAnalyticsProps): React.JSX.Element => {
    const analyticsData: AnalyticsData = JSON.parse(question.analyticsData);
    const isDate = question.questionType === "date";

    const formatDate = (dateString: string | undefined): string => {
        if (!dateString) return "N/A";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            });
        } catch {
            return dateString;
        }
    };

    const formatTime = (timeString: string | undefined): string => {
        if (!timeString) return "N/A";
        try {
            // Parse HH:mm:ss format
            const [hours, minutes] = timeString.split(":");
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? "PM" : "AM";
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        } catch {
            return timeString;
        }
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

            <div className="mt-4 p-4 dark:bg-base-200 bg-gray-50 rounded-md">
                <p className="text-sm">
                    <span className="dark:text-gray-400 text-gray-500">
                        {isDate ? "Date range: " : "Time range: "}
                    </span>
                    <span className="custom-primary-txt font-medium">
                        {isDate ? (
                            <>
                                {formatDate(analyticsData.MinDate)} -{" "}
                                {formatDate(analyticsData.MaxDate)}
                            </>
                        ) : (
                            <>
                                {formatTime(analyticsData.MinTime)} -{" "}
                                {formatTime(analyticsData.MaxTime)}
                            </>
                        )}
                    </span>
                </p>
            </div>

            <QuestionStatsFooter
                totalResponses={question.totalResponses}
                answeredCount={question.answeredCount}
                responseRate={question.responseRate}
            />
        </div>
    );
};

export default DateTimeAnalytics;
