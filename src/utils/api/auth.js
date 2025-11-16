import apiClient from "./axiosConfig";

export const authAPI = {
    login: (credentials) => apiClient.post("/Auth/login", credentials),

    forceUpdatePassword: (newPassword) =>
        apiClient.post("/Auth/force-update-password", { newPassword }),
};
