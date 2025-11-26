import { BarChart3, FileText, MessageSquare } from "lucide-react";

const surveyCompositionData = [
    {
        title: "Avg Questions",
        desc: "8.9 per survey",
        data: 8.9,
        icon: FileText,
        iconBg: "bg-pink-500/20",
        iconColor: "text-pink-400",
    },
    {
        title: "Avg Responses",
        desc: "108 per survey",
        data: 108,
        icon: MessageSquare,
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
    },
    {
        title: "Total Surveys",
        desc: "All time created",
        data: (23423).toLocaleString(),
        icon: BarChart3,
        iconBg: "bg-indigo-500/20",
        iconColor: "text-indigo-400",
    },
];

const SurveyComposition = () => {
    return (
        <div className="dark:bg-gray-800 bg-white p-5 border dark:border-gray-600 shadow-md rounded-md">
            <h1 className="flex gap-2 ">
                <BarChart3 className="text-blue-400" />
                <span className=" font-medium custom-primary-txt">
                    Survey Composition
                </span>
            </h1>

            <div className="flex flex-col gap-6 mt-6">
                {surveyCompositionData.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-5">
                        <div
                            className={`p-3 flex items-center justify-center rounded-lg ${item.iconBg}`}
                        >
                            {/* Icon per item, you can swap for different Lucide icons if desired */}
                            <item.icon
                                className={`${item.iconColor}`}
                                size={20}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="text-[0.70rem] text-gray-400 dark:text-gray-300">
                                {item.title}
                            </div>
                            <div className="custom-primary-txt font-medium">
                                {item.desc}
                            </div>
                        </div>
                        <div className="text-lg font-medium text-white dark:text-white">
                            {item.data}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyComposition;
