import { Link, useNavigate } from "react-router-dom";
import { ShieldAlert, LogIn, ArrowLeft } from "lucide-react";

export function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-base-100 bg-gray-100/70 p-4">
            <div className="custom-container max-w-3xl p-6 sm:p-8 md:p-10 dark:bg-base-300 bg-white rounded-xl shadow-2xl">
                <div className="text-center">
                    {/* 403 Icon with Animation */}
                    <div className="mb-4 sm:mb-6">
                        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-100 dark:bg-orange-900 mb-4 animate-pulse">
                            <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full"></div>
                    </div>

                    {/* 403 Badge */}
                    <div className="inline-block px-4 py-1 bg-orange-100 dark:bg-orange-900 rounded-full mb-3 sm:mb-4">
                        <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">
                            403 ERROR
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold custom-primary-txt mb-2 sm:mb-3 px-4">
                        Access Denied
                    </h1>

                    {/* Description */}
                    <p className="custom-sec-txt text-sm sm:text-base mb-2 max-w-md mx-auto px-4">
                        You don't have permission to access this page.
                    </p>
                    <p className="custom-sec-txt text-xs sm:text-sm mb-6 sm:mb-8 max-w-md mx-auto px-4">
                        This resource requires administrator privileges. Please
                        log in with an authorized account.
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
                        <Link to="/login" className="w-full sm:w-auto">
                            <button className="flex items-center justify-center gap-2 custom-primary-btn px-6 py-3 rounded-lg text-sm font-medium transition-all hover:scale-105 w-full">
                                <LogIn size={18} />
                                Go to Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
