import {
    BarChart3,
    Briefcase,
    CheckCircle,
    Clock,
    MapPin,
    TrendingUp,
    Users,
} from "lucide-react";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const SurveyDetailsCard = ({ survey }) => {
    return (
        <div className="custom-container p-7 dark:bg-base-300 bg-white">
            <h1 className="custom-primary-txt font-bold text-xl">
                {survey.title}
            </h1>
            {survey.description && (
                <p className="custom-sec-txt my-2 leading-8">
                    {survey.description}
                </p>
            )}
            <div className="flex gap-5 text-sm">
                <p className="space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">
                        Created by:
                    </span>
                    <span className="custom-sec-txt">{survey.createdBy}</span>
                </p>
                <p className="space-x-2">
                    <span className="text-gray-600 dark:text-gray-400">
                        Last updated:
                    </span>
                    <span className="custom-sec-txt">
                        {formatDate(survey.updatedAt)}
                    </span>
                </p>
            </div>
            {survey.locationName && (
                <div className="gap-3 text-sm mt-3 flex items-center custom-sec-txt">
                    <MapPin size={22} />
                    <span>{survey.locationName}</span>
                </div>
            )}

            {survey.serviceTypeName && (
                <div className="gap-3 text-sm mt-3 flex items-center custom-sec-txt">
                    <Briefcase size={22} />
                    <span>{survey.serviceTypeName}</span>
                </div>
            )}
        </div>
    );
};

const MetricsCard = ({ title, value, desc, icon }) => {
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

const MetricsContainer = ({ metrics }) => {
    console.log(metrics);
    return (
        <div className="mt-3 grid grid-cols-3 gap-3">
            <MetricsCard
                title="Total Views"
                value={metrics.totalViews}
                desc="Survey Opens"
                icon={<Users className="text-blue-400" />}
            />
            <MetricsCard
                title="Responses"
                value={metrics.totalResponses}
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

const MainDetails = ({ survey }) => {
    return (
        <div className=" flex-1">
            <SurveyDetailsCard survey={survey} />
            <MetricsContainer metrics={survey.mainMetrics} />
        </div>
    );
};

export default MainDetails;
