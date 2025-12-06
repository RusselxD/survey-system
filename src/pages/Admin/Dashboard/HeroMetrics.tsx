import {
    MessageSquare,
    CircleCheck,
    TrendingUp,
    LucideIcon,
} from "lucide-react";
import { DashboardMetrics } from "../../../utils/api/pages/dashboard";

interface PrimaryMetric {
    title: string;
    value: string | number;
    desc: string;
    icon: LucideIcon;
    borderColor: string;
    iconColor: string;
}

const primaryMetrics: PrimaryMetric[] = [
    {
        title: "Total Responses",
        value: 0,
        desc: "All submissions",
        icon: MessageSquare,
        borderColor: "border-orange-500",
        iconColor: "text-orange-500",
    },
    {
        title: "Response Rate",
        value: 81.5 + "%",
        desc: "Views -> Responses",
        icon: TrendingUp,
        borderColor: "border-blue-500",
        iconColor: "text-blue-500",
    },
    {
        title: "Completion Rate",
        value: 98 + "%",
        desc: "Started -> Completed",
        icon: CircleCheck,
        borderColor: "border-green-500",
        iconColor: "text-green-500",
    },
];

interface HeroMetricsProps {
    data: DashboardMetrics | null;
}

const HeroMetrics = ({ data }: HeroMetricsProps): React.JSX.Element => {
    const { totalResponses, responseRate, completionRate } = data || {};

    // Create a copy to avoid mutating the original array
    const metrics: PrimaryMetric[] = [
        {
            ...primaryMetrics[0],
            value: totalResponses ? totalResponses.toLocaleString() : "0",
        },
        {
            ...primaryMetrics[1],
            value: responseRate ? `${responseRate}%` : "0%",
        },
        {
            ...primaryMetrics[2],
            value: completionRate ? `${completionRate}%` : "0%",
        },
    ];

    return (
        <div>
            <div className=" grid grid-cols-3 gap-5">
                {metrics.map((metric, i) => {
                    return (
                        <div
                            className={`stat dark:bg-base-300 bg-white border-l-[6px] px-5 ${metric.borderColor} shadow-md rounded-md`}
                            key={i}
                        >
                            <div className="stat-figure rounded-full ">
                                <metric.icon
                                    className={`${metric.iconColor}`}
                                    size={30}
                                />
                            </div>

                            <div className="stat-title font-medium custom-primary-txt">
                                {metric.title}
                            </div>
                            <div className="stat-value custom-primary-txt">
                                {metric.value}
                            </div>
                            <div className="stat-desc custom-sec-txt">
                                {metric.desc}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroMetrics;
