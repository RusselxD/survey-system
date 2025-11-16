import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state so the next render shows the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center dark:bg-base-100 bg-gray-100/70 p-4">
                    <div className="container max-w-3xl p-6 sm:p-8 md:p-10 dark:bg-base-300 bg-white rounded-xl shadow-2xl">
                        <div className="text-center">
                            {/* Error Icon with Animation */}
                            <div className="mb-4 sm:mb-6">
                                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-100 dark:bg-red-900 mb-4 animate-pulse">
                                    <svg
                                        className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-red-400"
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
                                <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"></div>
                            </div>

                            {/* Title */}
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold custom-primary-txt mb-2 sm:mb-3 px-4">
                                Oops! Something Went Wrong
                            </h1>

                            {/* Description */}
                            <p className="custom-sec-txt text-sm sm:text-base mb-2 max-w-md mx-auto px-4">
                                We encountered an unexpected error while
                                processing your request.
                            </p>
                            <p className="custom-sec-txt text-xs sm:text-sm mb-6 sm:mb-8 max-w-md mx-auto px-4">
                                Please try refreshing the page. If the problem
                                persists, contact our support team.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                                <button
                                    onClick={() => window.location.reload()}
                                    className="flex items-center justify-center gap-2 custom-primary-btn px-6 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 w-full sm:w-auto"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    </svg>
                                    Reload Page
                                </button>
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center justify-center gap-2 border px-6 py-3 rounded-lg text-sm font-medium border-gray-400 text-gray-700 dark:text-white dark:hover:text-gray-900 hover:text-white hover:bg-gray-400 dark:hover:bg-gray-400 transition-all hover:scale-105 w-full sm:w-auto"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                        />
                                    </svg>
                                    Go Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
