import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "../utils/api/auth.js";
import { toast } from "react-toastify";
import { CheckCircle, XCircle } from "lucide-react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const hasPermission = (permissionName) => {
        return permissions.includes(permissionName);
    };

    const hasAnyPermission = (permissionNames) => {
        return permissionNames.some((permission) =>
            permissions.includes(permission)
        );
    };

    const hasAllPermissions = (permissionNames) => {
        return permissionNames.every((permission) =>
            permissions.includes(permission)
        );
    };

    useEffect(() => {
        const decodeTokenOnLoad = () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const decoded = jwtDecode(token);

                    if (decoded.exp * 1000 > Date.now()) {
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
                            forceUpdatePassword:
                                decoded.forceUpdatePassword === "True",
                        });

                        setPermissions(permissionsArray);
                    } else {
                        console.log("Token expired, removing...");
                        localStorage.removeItem("token");
                    }
                } catch (error) {
                    console.error("Failed to decode token on load:", error);
                    localStorage.removeItem("token");
                }
            }
            setLoading(false);
        };
        decodeTokenOnLoad();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login({ email, password });

            const data = response.data;

            localStorage.setItem("token", data.token);

            // decode the token
            const decoded = jwtDecode(data.token);

            const permissionsArray = decoded.permissions
                ? decoded.permissions.split(",")
                : [];

            setPermissions(permissionsArray);
            const forceUpdatePassword = decoded.forceUpdatePassword === "True";

            setUser({
                id: decoded.sub,
                email: decoded.email,
                role: decoded.role,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                permissions: permissionsArray,
                forceUpdatePassword: forceUpdatePassword,
            });
        } catch (error) {
            // Re-throw the error so Login.jsx can catch it
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setPermissions([]);
    };

    const toastSuccess = (message) => {
        toast(
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle
                        className="w-5 h-5 text-green-700"
                        strokeWidth={2}
                    />
                </div>
                <div className="flex-1">
                    <strong className="text-green-900 font-bold text-sm block mb-1">
                        Success!
                    </strong>
                    <p className="text-green-800 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>,
            {
                style: {
                    background: "rgb(220, 252, 231)", // green-100
                    border: "2px solid rgb(134, 239, 172)", // green-300
                    padding: "0.8rem 0.5rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.1)",
                },
                icon: false,
            }
        );
    };

    const toastError = (message) => {
        toast(
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                    <XCircle className="w-5 h-5 text-red-700" strokeWidth={2} />
                </div>
                <div className="flex-1">
                    <strong className="text-red-900 font-bold text-sm block mb-1">
                        Error!
                    </strong>
                    <p className="text-red-800 text-sm leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>,
            {
                style: {
                    background: "rgb(254, 226, 226)", // red-100
                    border: "2px solid rgb(252, 165, 165)", // red-300
                    padding: "0.8rem 0.5rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgba(239, 68, 68, 0.1)",
                },
                icon: false,
            }
        );
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                hasPermission,
                hasAnyPermission,
                hasAllPermissions,
                toastSuccess,
                toastError,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
