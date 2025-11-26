const SurveysSkeleton = () => {
    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1">
            <div className="skeleton h-16 mb-4"></div>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 w-full">
                <div className="break-inside-avoid mb-4">
                    <div className="skeleton h-44"></div>
                </div>
                <div className="break-inside-avoid mb-4">
                    <div className="skeleton h-32"></div>
                </div>
                <div className="break-inside-avoid mb-4">
                    <div className="skeleton h-56"></div>
                </div>
                <div className="break-inside-avoid mb-4">
                    <div className="skeleton h-40"></div>
                </div>
                <div className="break-inside-avoid mb-4">
                    <div className="skeleton h-48"></div>
                </div>
            </div>
        </div>
    );
};

export default SurveysSkeleton;
