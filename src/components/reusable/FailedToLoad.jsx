
const FailedToLoad = ({
    title = "Failed to Load",
    message = "Unable to load the data. Please check your connection and try again.",
    onRetry = () => window.location.reload(),
    onGoBack = () => window.history.back(),
    retryText = "Retry",
    goBackText = "Go Back",
}) => {
    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 flex items-center justify-center">
            <div className="custom-container p-6 sm:p-8 dark:bg-base-300 bg-white text-center max-w-md">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-600 dark:text-red-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>
                <h2 className="text-xl font-semibold custom-primary-txt mb-2">
                    {title}
                </h2>
                <p className="custom-sec-txt mb-6">{message}</p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                    >
                        {retryText}
                    </button>
                    <button
                        onClick={onGoBack}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 custom-primary-txt rounded-md text-sm transition-colors"
                    >
                        {goBackText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FailedToLoad;
