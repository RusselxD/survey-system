const SurveyViewSkeleton = (): React.JSX.Element => {
    return (
        <div className="min-h-screen dark:bg-base-100 bg-gray-100/70 p-2 sm:p-5 flex items-center md:items-start justify-center">
            <div className="w-full md:w-[60%] lg:w-[50%] gap-3 sm:gap-4 flex flex-col items-start -mt-32 md:mt-0">
                <div className="skeleton w-full h-20 md:h-24 lg:h-32"></div>
                <div className="skeleton h-10 sm:h-12 w-[80%]"></div>
                <div className="skeleton h-5 sm:h-7 w-full"></div>
                <div className="skeleton h-5 sm:h-7 w-full"></div>
                <div className="skeleton h-5 sm:h-7 w-full"></div>
                <div className="skeleton h-5 sm:h-7 w-full"></div>
                <div className="skeleton h-5 sm:h-7 w-full"></div>
                <div className="skeleton h-5 sm:h-7 w-full"></div>
            </div>
        </div>
    );
};

export default SurveyViewSkeleton;
