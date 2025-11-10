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
        desc: "Total Number of Surveys",
        icon: ClipboardList,
        borderColor: "border-blue-500",
        iconColor: "text-blue-500",
    },
    {
        title: "Total Responses",
        value: undefined,
        desc: "Total Number of Responses",
        icon: MessageSquare,
        borderColor: "border-orange-500",
        iconColor: "text-orange-500",
    },
    {
        title: "Avg. Satisfaction",
        value: undefined,
        desc: "Average of Ratings (1-5 stars)",
        icon: Smile,
        borderColor: "border-green-500",
        iconColor: "text-green-500",
    },
    {
        title: "Completion Rate",
        value: undefined,
        desc: "Overall Survey Completion Rate",
        icon: CircleCheck,
        borderColor: "border-purple-500",
        iconColor: "text-purple-500",
    },
    {
        title: "NPS",
        value: undefined,
        desc: "Overall Net Promoter Score",
        icon: ThumbsUp,
        borderColor: "border-cyan-500",
        iconColor: "text-cyan-500",
    },
    {
        title: "Customer Satisfaction (CSAT)",
        value: undefined,
        desc: "Satisfied ratings (4-5 stars)",
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
    );
};

export default MainMetrics;
