import apiClient from "./axiosConfig";

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponse {
    token: string;
}

interface NewPassword {
    newPassword: string;
}

export const authAPI = {
    login: (credentials: LoginCredentials) =>
        apiClient.post<LoginResponse>("/Auth/login", credentials),

    forceUpdatePassword: (newPassword: NewPassword) =>
        apiClient.post<NewPassword>("/Auth/force-update-password", {
            newPassword,
        }),
};
