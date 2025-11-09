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
        <div className="dark:bg-base-300 bg-white w-[60%] rounded-md shadow-[0px_0px_5px_rgba(0,0,0,0.2)] px-5 py-5 flex flex-col">
            <h1 className="flex items-center justify-start dark:text-base-content custom-primary-txt space-x-2 text-xl font-semibold mb-5 ">
                <MessageSquare />
                <span>Response Insights</span>
                <span className="text-sm custom-sec-txt">
                    &#40;{currentWeek}&#41;
                </span>
            </h1>

            <div className="flex space-x-3">

                <div className="stat rounded-md dark:bg-base-100 bg-gray-100 ">
                    <div className="stat-title text-sm font-medium custom-primary-txt">
                        Peak Hours
                    </div>
                    <div className="stat-value custom-primary-txt">{peakHours}</div>
                    <div className="stat-desc custom-sec-txt">
                        Average {peakHoursAvgResponses} responses
                    </div>
                </div>

                <div className="stat rounded-md dark:bg-base-100 bg-gray-100">
                    <div className="stat-title text-sm font-medium custom-primary-txt">
                        Satisfaction Trend
                    </div>
                    <div
                        className={`stat-value flex items-center ${
                            trendIsUP ? "dark:text-green-400 text-green-600" : "text-red-600"
                        }`}
                    >
                        {trendIsUP ? (
                            <Triangle
                                className="inline-block mr-1 "
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
                    <div className="stat-desc custom-sec-txt">
                        vs previous week &#40;{previousWeek}&#41;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponseInsights;
