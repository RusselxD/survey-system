import apiClient from "./axiosConfig";

export const authAPI = {
    login: (credentials) => apiClient.post("/Auth/login", credentials),
}