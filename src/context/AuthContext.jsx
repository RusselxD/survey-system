import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {API_URL} from '../utils/api/auth'

const AuthContext = createContext(null);

// JWT Claim type constants
const ROLE_CLAIM =
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
const NAME_CLAIM = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 > Date.now()) {
                    setUser({
                        username: decoded[NAME_CLAIM] || decoded.sub,
                        role: decoded[ROLE_CLAIM],
                    });
                } else {
                    sessionStorage.removeItem("token");
                }
            } catch (error) {
                sessionStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        const response = await fetch(`${API_URL}/api/Auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        sessionStorage.setItem("token", data.token);

        const decoded = jwtDecode(data.token);

        setUser({
            username: decoded[NAME_CLAIM] || decoded.sub,
            role: decoded[ROLE_CLAIM],
        });
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
