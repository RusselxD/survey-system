import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-base-100 bg-gray-100/70 p-4">
            <div className="custom-container max-w-3xl p-6 sm:p-8 md:p-10 dark:bg-base-300 bg-white rounded-xl shadow-2xl">
                <div className="text-center">
                    {/* Large 404 with animation */}
                    <div className="mb-4 sm:mb-6">
                        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black custom-primary-txt tracking-tight animate-pulse">
                            404
                        </h1>
                        <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold custom-primary-txt mb-2 sm:mb-3 px-4">
                        Oops! Page Not Found
                    </h2>

                    {/* Description */}
                    <p className="custom-sec-txt text-sm sm:text-base mb-6 sm:mb-8 max-w-md mx-auto px-4">
                        The page you're looking for seems to have wandered off.
                        It might have been moved, deleted, or never existed at
                        all.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center justify-center gap-2 border px-6 py-3 rounded-lg text-sm font-medium border-gray-400 text-gray-700 dark:text-white dark:hover:text-gray-900 hover:text-white hover:bg-gray-400 dark:hover:bg-gray-400 transition-all hover:scale-105 w-full sm:w-auto"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="flex items-center justify-center gap-2 custom-primary-btn px-6 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 w-full sm:w-auto"
                        >
                            <Home size={18} />
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
