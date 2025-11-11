import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { authAPI } from "../utils/api/auth.js";

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
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    const permissionsArray = decoded.permissions.split(",");

                    setUser({
                        id: decoded.sub,
                        email: decoded.email,
                        role: decoded.role,
                        firstName: decoded.firstName,
                        lastName: decoded.lastName,
                        permissions: permissionsArray,
                    });

                    setPermissions(permissionsArray);
                } else {
                    sessionStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Failed to decode token on load:", error);
                sessionStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        console.log(email, password);
        const response = await authAPI.login({ email, password });
        console.log(response);

        // Axios wraps the response in a data property
        const data = response.data;

        sessionStorage.setItem("token", data.token);

        // decode the token
        const decoded = jwtDecode(data.token);

        const permissionsArray = decoded.permissions.split(",");

        setPermissions(permissionsArray);

        setUser({
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            permissions: permissionsArray,
        });
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
        setPermissions([]);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                loading,
                hasPermission,
                hasAnyPermission,
                hasAllPermissions,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
