import { MessageSquare, Triangle } from "lucide-react";

const ResponseInsights = ({ today, currentWeek, formatDate, data }) => {

    const { peakHours, peakHoursAvgResponses, trend } = data;

    const trendIsUP = trend > 0;

    const fourteenDaysAgo = new Date(today);
    const eightDaysAgo = new Date(today);

    fourteenDaysAgo.setDate(today.getDate() - 13);
    eightDaysAgo.setDate(today.getDate() - 7);

    const previousWeek = `${formatDate(fourteenDaysAgo)} - ${formatDate(
        eightDaysAgo
    )}`;

    return (
        <div className="border border-violet-400 bg-violet-50 w-[60%] rounded-md shadow-[0px_0px_5px_rgba(0,0,0,0.2)] px-5 py-5 flex flex-col">
            <h1 className="flex items-center justify-start space-x-2 text-xl font-semibold mb-5 ">
                <MessageSquare />
                <span>Response Insights</span>
                <span className="text-sm text-gray-600">
                    &#40;{currentWeek}&#41;
                </span>
            </h1>

            <div className="flex space-x-3">
                <div className="stat rounded-md bg-white">
                    <div className="stat-title text-sm font-medium text-black">
                        Peak Hours
                    </div>
                    <div className="stat-value text-black">{peakHours}</div>
                    <div className="stat-desc text-gray-500">
                        Average {peakHoursAvgResponses} responses
                    </div>
                </div>
                <div className="stat rounded-md bg-white">
                    <div className="stat-title text-sm font-medium text-black">
                        Trend
                    </div>
                    <div
                        className={`stat-value text-black flex items-center ${
                            trendIsUP ? "text-green-600" : "text-red-600"
                        }`}
                    >
                        {trendIsUP ? (
                            <Triangle
                                className="inline-block mr-1 text-green-500"
                                size={20}
                                fill="currentColor"
                            />
                        ) : (
                            <Triangle
                                className="inline-block mr-1 text-red-500 rotate-180"
                                size={20}
                                fill="currentColor"
                            />
                        )}

                        <span>
                            &nbsp;{trendIsUP ? "+" : ""}
                            {trend}
                        </span>
                    </div>
                    <div className="stat-desc text-gray-500">
                        vs previous week &#40;{previousWeek}&#41;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponseInsights;
