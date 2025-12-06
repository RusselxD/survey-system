import { Activity, Clock, Eye, TrendingUp, LucideIcon } from "lucide-react";
import { DashboardMetrics } from "../../../utils/api/pages/dashboard";

interface SupportingMetric {
    title: string;
    desc: string;
    data: string | number;
    icon: LucideIcon;
    iconColor: string;
}

const supportingMetrics: SupportingMetric[] = [
    {
        title: "Total Views",
        desc: "Survey Opens",
        data: (423875).toLocaleString(),
        icon: Eye,
        iconColor: "text-yellow-500",
    },
    {
        title: "Active Surveys",
        desc: "Currently published",
        data: (120).toLocaleString(),
        icon: Activity,
        iconColor: "text-green-500",
    },
    {
        title: "Responses This Week",
        desc: "Recent Activity",
        data: (1500).toLocaleString(),
        icon: TrendingUp,
        iconColor: "text-purple-500",
    },
    {
        title: "Avg. Duration",
        desc: "Time to complete",
        data: "4.2 min",
        icon: Clock,
        iconColor: "text-cyan-500",
    },
];

interface SupportingMetricsProps {
    data: DashboardMetrics | null;
}

const SupportingMetrics = ({
    data,
}: SupportingMetricsProps): React.JSX.Element => {
    const {
        totalViews,
        activeSurveys,
        responsesThisWeek,
        avgTimeToCompleteMinutes,
    } = data || {};

    // Create a copy to avoid mutating the original array
    const metrics: SupportingMetric[] = [
        {
            ...supportingMetrics[0],
            data: totalViews ? totalViews.toLocaleString() : "0",
        },
        {
            ...supportingMetrics[1],
            data: activeSurveys ? activeSurveys.toLocaleString() : "0",
        },
        {
            ...supportingMetrics[2],
            data: responsesThisWeek ? responsesThisWeek.toLocaleString() : "0",
        },
        {
            ...supportingMetrics[3],
            data: avgTimeToCompleteMinutes
                ? `${avgTimeToCompleteMinutes} min`
                : "0 min",
        },
    ];

    return (
        <div className=" gap-5 grid grid-cols-1 md:grid-cols-2">
            {metrics.map((metric, i) => {
                return (
                    <div
                        className={`stat dark:bg-base-200 bg-white p-5 border dark:border-gray-700 shadow-md rounded-md`}
                        key={i}
                    >
                        <div className="stat-figure rounded-full ">
                            <metric.icon
                                className={`${metric.iconColor}`}
                                size={30}
                            />
                        </div>

                        <div className="stat-title ">{metric.title}</div>
                        <div className="stat-value text-2xl my-2 custom-primary-txt">
                            {metric.data}
                        </div>
                        <div className="stat-desc ">{metric.desc}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default SupportingMetrics;
