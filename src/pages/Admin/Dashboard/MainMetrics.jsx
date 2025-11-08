import {
    ClipboardList,
    MessageSquare,
    Smile,
    CircleCheck,
    ThumbsUp,
    Star,
} from "lucide-react";

const metrics = [
    {
        title: "Total Surveys",
        value: undefined,
        desc: "Overall Total Surveys",
        icon: ClipboardList,
        borderColor: "border-blue-500",
        iconColor: "text-blue-500",
    },
    {
        title: "Total Responses",
        value: undefined,
        desc: "Overall Total Responses",
        icon: MessageSquare,
        borderColor: "border-green-500",
        iconColor: "text-green-500",
    },
    {
        title: "Avg. Satisfaction",
        value: undefined,
        desc: "Overall Satisfaction Score",
        icon: Smile,
        borderColor: "border-red-700",
        iconColor: "text-red-700",
    },
    {
        title: "Completion Rate",
        value: undefined,
        desc: "Overall Survey Completion Rate",
        icon: CircleCheck,
        borderColor: "border-orange-500",
        iconColor: "text-orange-500",
    },
    {
        title: "Net Promoter Score",
        value: undefined,
        desc: "Overall Customer Loyalty Score",
        icon: ThumbsUp,
        borderColor: "border-purple-500",
        iconColor: "text-purple-500",
    },
    {
        title: "CSAT",
        value: undefined,
        desc: "Overall Customer Satisfaction Score",
        icon: Star,
        borderColor: "border-pink-500",
        iconColor: "text-pink-500",
    },
];

const MainMetrics = ({ data }) => {
    // Map data values to metrics
    Object.values(data).forEach((value, i) => {
        metrics[i].value = value;
    });

    return (
        <div className="grid grid-cols-3 gap-5 pb-8 ">
            {metrics.map((metric, i) => {
                return (
                    <div
                        className={`stat border-l-4 ${metric.borderColor} shadow-md bg-white rounded-md`}
                        key={i}
                    >
                        <div className="stat-figure rounded-full ">
                            <metric.icon
                                className={`${metric.iconColor}`}
                                size={30}
                            />
                        </div>

                        <div className="stat-title text-black">
                            {metric.title}
                        </div>
                        <div className="stat-value">{metric.value}</div>
                        {metric.desc && (
                            <div className="stat-desc text-gray-500">
                                {metric.desc}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default MainMetrics;
