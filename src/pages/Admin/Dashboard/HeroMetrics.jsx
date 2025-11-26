import { MessageSquare, CircleCheck, TrendingUp } from "lucide-react";

const primaryMetrics = [
    {
        title: "Total Responses",
        value: (345600).toLocaleString(),
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

const HeroMetrics = ({ data }) => {
    return (
        <div>
            <div className=" grid grid-cols-3 gap-5">
                {primaryMetrics.map((metric, i) => {
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
