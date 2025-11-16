import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ShieldCheck, AlertCircle } from "lucide-react";
import { authAPI } from "../../../utils/api/auth";
import { useAuth } from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const PasswordInput = ({
    label,
    value,
    setValue,
    show,
    setShow,
    error,
    placeholder,
}) => (
    <div>
        <label className="block text-xs font-medium custom-primary-txt mb-1.5">
            {label}
        </label>
        <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-10 pr-10 py-2.5 text-sm border-2 border-gray-300 dark:border-gray-600 rounded-lg dark:bg-base-200 bg-white custom-primary-txt focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 transition-all"
            />
            <div
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
                {show ? (
                    <EyeOff className="w-4 h-4" />
                ) : (
                    <Eye className="w-4 h-4" />
                )}
            </div>
        </div>
        {error && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {error}
            </p>
        )}
    </div>
);

const ForceUpdatePassword = () => {
    const { user, setUser, toastSuccess, toastError } = useAuth();

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.forceUpdatePassword) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!newPassword.trim()) {
            newErrors.newPassword = "New password is required";
        } else if (newPassword.length < 8) {
            newErrors.newPassword = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(newPassword)) {
            newErrors.newPassword =
                "Password must contain uppercase, lowercase, and number";
        }

        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const res = await authAPI.forceUpdatePassword(newPassword);

            localStorage.setItem("token", res.data.token);

            // Decode the new token and update user state
            const decoded = jwtDecode(res.data.token);
            const permissionsArray = decoded.permissions
                ? decoded.permissions.split(",")
                : [];

            setUser({
                id: decoded.sub,
                email: decoded.email,
                role: decoded.role,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                permissions: permissionsArray,
                forceUpdatePassword: decoded.forceUpdatePassword === "True",
            });

            toastSuccess("Password updated successfully");
            navigate("/admin/dashboard");
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Failed to update password"
            );
            toastError(
                err?.response?.data?.message ||
                    err?.message ||
                    "Failed to update password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center dark:bg-base-100 bg-gray-100/70 p-4">
            <div className="w-full max-w-md">
                {/* Header Card */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/30 mb-4">
                        <ShieldCheck className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold custom-primary-txt mb-2">
                        Update Your Password
                    </h1>
                    <p className="custom-sec-txt text-xs sm:text-sm max-w-sm mx-auto">
                        For security reasons, you must change your password
                        before continuing
                    </p>
                </div>

                {/* Form Card */}
                <div className="p-6 sm:p-8 dark:bg-base-300 bg-white rounded-xl shadow-2xl">
                    {/* Global Error */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-red-600 dark:text-red-400">
                                {error}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <PasswordInput
                            label="New Password"
                            value={newPassword}
                            setValue={setNewPassword}
                            show={showNewPassword}
                            setShow={setShowNewPassword}
                            error={errors.newPassword}
                            placeholder="Enter new password"
                        />

                        <PasswordInput
                            label="Confirm New Password"
                            value={confirmPassword}
                            setValue={setConfirmPassword}
                            show={showConfirmPassword}
                            setShow={setShowConfirmPassword}
                            error={errors.confirmPassword}
                            placeholder="Confirm new password"
                        />

                        {/* Password Requirements */}
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <p className="text-xs font-medium text-blue-800 dark:text-blue-300 mb-2">
                                Password Requirements:
                            </p>
                            <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    At least 8 characters long
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Contains uppercase and lowercase letters
                                </li>
                                <li className="flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    Contains at least one number
                                </li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 px-4 rounded-lg text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                                loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    <span>Updating Password...</span>
                                </>
                            ) : (
                                <>
                                    <ShieldCheck className="w-5 h-5" />
                                    <span>Update Password</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs custom-sec-txt mt-4">
                    Need help? Contact your system administrator
                </p>
            </div>
        </div>
    );
};

export default ForceUpdatePassword;
