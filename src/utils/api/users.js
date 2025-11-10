import apiClient from "./axiosConfig";

export const usersAPI = {
    getUsers: () => apiClient.get("/Users"),
};
