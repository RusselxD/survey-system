import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../utils/api/auth"; // Make sure this path is correct

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [permissions, setPermissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const hasPermission = (permissionName) => {
        return permissions.includes(permissionName);
    }

    const hasAnyPermission = (permissionNames) => {
        return permissionNames.some(permission => permissions.includes(permission));
    };

    const hasAllPermissions = (permissionNames) => {
        return permissionNames.every(permission => permissions.includes(permission));
    };

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {

                    const permissionsArray = decoded.permissions.split(",");

                    setUser({
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

        // api call
        const response = await fetch(`${API_URL}/api/Auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();

        sessionStorage.setItem("token", data.token);

        // decode the token
        const decoded = jwtDecode(data.token);
        
        const permissionsArray = decoded.permissions.split(",");

        setPermissions(permissionsArray);

        setUser({
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
        <AuthContext.Provider value={{ user, login, logout, loading, hasPermission, hasAnyPermission, hasAllPermissions }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);