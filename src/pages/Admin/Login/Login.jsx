import { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.forceUpdatePassword) {
                navigate("/update-password", { replace: true });
            } else {
                navigate("/admin/dashboard", { replace: true });
            }
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        setError("");
        setLoading(true);

        try {
            await login(email, password);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Invalid email or password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-base-100 bg-gray-100/70 p-4">
            <div className="w-full max-w-md p-6 sm:p-8 dark:bg-base-300 bg-white rounded-xl shadow-2xl">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-3 sm:mb-4">
                        <LogIn className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold custom-primary-txt mb-2">
                        Admin Login
                    </h1>
                    <p className="custom-sec-txt text-xs sm:text-sm">
                        Enter your credentials to access the admin panel
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 rounded-lg bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                        <p className="text-sm text-red-600 dark:text-red-400">
                            {error}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium custom-primary-txt mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium custom-primary-txt mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors text-sm"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "custom-primary-btn hover:scale-[1.02]"
                        } text-white`}
                    >
                        {loading ? (
                            <>
                                <span className="loading loading-spinner loading-sm"></span>
                                Logging in...
                            </>
                        ) : (
                            <>
                                <LogIn size={18} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
