import { Star, MapPin, Settings } from "lucide-react";

const CategoryInsights = ({
    icon,
    title,
    best,
    bestData,
    worst,
    worstData,
}) => {
    return (
        <div className="pr-10">
            <div className="flex items-center gap-3 mb-3 text-base-content">
                {icon}
                <h2 className="text-base font-medium custom-primary-txt">
                    {title}
                </h2>
            </div>

            <div className="space-y-4">
                {/* Best Performer */}
                <div className="dark:bg-emerald-600 bg-emerald-100 border-l-4 dark:border-emerald-700 border-emerald-500 rounded-lg px-5 py-3 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <div>
                            <span className="inline-block px-3 py-1 dark:bg-emerald-00 bg-emerald-500 text-white text-xs font-semibold rounded-full mb-2">
                                BEST PERFORMER
                            </span>
                            <h3 className="text-lg font-bold custom-primary-txt mb-1">
                                {best}
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[
                                        ...Array(
                                            Math.floor(parseFloat(bestData))
                                        ),
                                    ].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 dark:text-emerald-300 text-emerald-500"
                                            fill="currentColor"
                                        />
                                    ))}
                                    {[
                                        ...Array(
                                            5 - Math.floor(parseFloat(bestData))
                                        ),
                                    ].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 dark:text-emerald-50 text-emerald-300"
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <span className="text-2xl font-bold custom-primary-txt">
                                    {bestData}
                                </span>
                                <span className="custom-sec-txt font-medium">
                                    /5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Needs Attention */}
                <div className=" dark:bg-red-600 bg-red-100 border-l-4 dark:border-red-800 border-red-500 rounded-lg px-5 py-3 transition-all hover:shadow-md">
                    <div className="flex items-start justify-between">
                        <div>
                            <span className="inline-block px-3 py-1 dark:bg-red-700 bg-red-500 text-white text-xs font-semibold rounded-full mb-2">
                                NEEDS ATTENTION
                            </span>
                            <h3 className="text-lg font-bold custom-primary-txt mb-1">
                                {worst}
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                    {[
                                        ...Array(
                                            Math.floor(parseFloat(worstData))
                                        ),
                                    ].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 dark:text-orange-300 text-orange-500"
                                            fill="currentColor"
                                        />
                                    ))}
                                    {[
                                        ...Array(
                                            5 -
                                                Math.floor(
                                                    parseFloat(worstData)
                                                )
                                        ),
                                    ].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-5 h-5 dark:text-orange-50 text-orange-300"
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>
                                <span className="text-2xl font-bold custom-primary-txt">
                                    {worstData}
                                </span>
                                <span className="custom-sec-txt font-medium">
                                    /5
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SatisfactionInsights = ({ currentWeek, data }) => {
    const { location, serviceType } = data;

    return (
        <div className="container px-5 py-7 flex flex-col mb-8 dark:bg-base-300">
            <h1 className="flex items-center custom-primary-txt space-x-2 text-xl font-semibold mb-5 border-b-2 pb-3 border-gray-300">
                <Star/>
                <span>Satisfaction Insights</span>
                <span className="text-sm custom-sec-txt">
                    &#40;{currentWeek}&#41;
                </span>
            </h1>

            <div className="grid grid-cols-2 gap-5">
                <CategoryInsights
                    icon={<MapPin />}
                    title="Locations"
                    best={location.best}
                    bestData={location.bestScore}
                    worst={location.worst}
                    worstData={location.worstScore}
                />
                <CategoryInsights
                    icon={<Settings />}
                    title="Service Types"
                    best={serviceType.best}
                    bestData={serviceType.bestScore}
                    worst={serviceType.worst}
                    worstData={serviceType.worstScore}
                />
            </div>
        </div>
    );
};

export default SatisfactionInsights;
