export const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7296";

// Helper function for authenticated requests
export const fetchWithAuth = async (endpoint, options = {}) => {
    const token = sessionStorage.getItem("token");

    const config = {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    };

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, config);
    return response;
};
