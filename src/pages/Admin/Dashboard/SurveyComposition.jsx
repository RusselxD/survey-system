import { BarChart3, FileText, MessageSquare } from "lucide-react";

const surveyCompositionData = [
    {
        title: "Total Surveys",
        desc: "all time",
        data: (23423).toLocaleString(),
        icon: BarChart3,
        iconBg: "bg-indigo-500/20",
        iconColor: "text-indigo-400",
    },
    {
        title: "Avg Questions per survey",
        desc: "per survey",
        data: 8.9,
        icon: FileText,
        iconBg: "bg-pink-500/20",
        iconColor: "text-pink-400",
    },
    {
        title: "Avg Responses per survey",
        desc: "per survey",
        data: 108,
        icon: MessageSquare,
        iconBg: "bg-blue-500/20",
        iconColor: "text-blue-400",
    },
];

const SurveyComposition = ({ data }) => {
    const { totalSurveys, avgQuestions, avgResponses } = data || {};

    surveyCompositionData[0].data = totalSurveys;
    surveyCompositionData[1].data = avgQuestions;
    surveyCompositionData[2].data = avgResponses;
    return (
        <div className="dark:bg-base-200 bg-white p-5 border dark:border-gray-700 shadow-md rounded-md">
            <h1 className="flex gap-2 ">
                <BarChart3 className="text-blue-400" />
                <span className=" font-medium custom-primary-txt">
                    Survey Composition
                </span>
            </h1>

            <div className="flex gap-6 mt-6">
                {surveyCompositionData.map((item, idx) => (
                    <div
                        key={idx}
                        className=" flex-1 flex justify-center py-3 gap-5 items-center"
                    >
                        <div
                            className={`p-3 flex items-center justify-center rounded-lg ${item.iconBg}`}
                        >
                            {/* Icon per item, you can swap for different Lucide icons if desired */}
                            <item.icon
                                className={`${item.iconColor}`}
                                size={25}
                            />
                        </div>
                        <div>
                            <div className="text-2xl my-1 font-semibold text-white dark:text-white">
                                {item.data}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-300">
                                {item.title}
                            </div>
                            {/* <div className="text-xs custom-primary-txt">
                                {item.desc}
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SurveyComposition;
