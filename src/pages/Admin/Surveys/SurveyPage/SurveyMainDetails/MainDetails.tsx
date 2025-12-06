import React from "react";
import { BarChart3, CheckCircle, Clock, TrendingUp, Users } from "lucide-react";
import SurveyDetailsCard from "./SurveyDetailsCard";

interface MetricsCardProps {
    title: string;
    value: string | number;
    desc: string;
    icon: React.ReactNode;
}

const MetricsCard = ({
    title,
    value,
    desc,
    icon,
}: MetricsCardProps): React.JSX.Element => {
    return (
        <div className="custom-container p-5 dark:bg-base-300 flex flex-col gap-1 bg-white relative">
            <div className="absolute top-5 right-5 text-gray-400 dark:text-gray-500">
                {icon}
            </div>
            <p className="custom-sec-txt text-sm">{title}</p>
            <p className="font-bold custom-primary-txt text-2xl">{value}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
        </div>
    );
};

interface MainMetrics {
    totalViews: number;
    totalResponses: number;
    avgCompletionTimeInMinutes: number;
    responseRate: number;
    completionRate: number;
}

interface MetricsContainerProps {
    metrics: MainMetrics;
}

const MetricsContainer = ({
    metrics,
}: MetricsContainerProps): React.JSX.Element => {
    return (
        <div className="mt-3 grid grid-cols-3 gap-3">
            <MetricsCard
                title="Total Views"
                value={metrics.totalViews.toLocaleString()}
                desc="Survey Opens"
                icon={<Users className="text-blue-400" />}
            />
            <MetricsCard
                title="Responses"
                value={metrics.totalResponses.toLocaleString()}
                desc="All Submissions"
                icon={<CheckCircle className="text-green-400" />}
            />
            <MetricsCard
                title="Avg. Duration"
                value={metrics.avgCompletionTimeInMinutes + " mins"}
                desc="Time to Complete"
                icon={<Clock className="text-cyan-400" />}
            />
            <MetricsCard
                title="Response Rate"
                value={metrics.responseRate + "%"}
                desc="Views -> Responses"
                icon={<TrendingUp className="text-purple-400" />}
            />
            <MetricsCard
                title="Completion Rate"
                value={metrics.completionRate + "%"}
                desc="Started -> Completed"
                icon={<BarChart3 className="text-emerald-400" />}
            />
        </div>
    );
};

interface Survey {
    id: string;
    title: string;
    description: string;
    status: string;
    createdBy: string;
    updatedAt: string;
    locationName?: string;
    serviceTypeName?: string;
    qrCodeUrl: string;
    coverImageUrl: string;
    mainMetrics: MainMetrics;
}

interface MainDetailsProps {
    survey: Survey;
    handleUpdateSurveyStatus: (newStatus: string) => void;
}

const MainDetails = ({
    survey,
    handleUpdateSurveyStatus,
}: MainDetailsProps): React.JSX.Element => {
    return (
        <div className=" flex-1">
            <SurveyDetailsCard
                survey={survey}
                handleUpdateSurveyStatus={handleUpdateSurveyStatus}
            />
            <MetricsContainer metrics={survey.mainMetrics} />
        </div>
    );
};

export default MainDetails;
