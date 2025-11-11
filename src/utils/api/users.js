import apiClient from "./axiosConfig";

export const usersAPI = {
    getUsers: () => {
        const a = apiClient.get("/Users");
        console.log(a);
        return a;
    },

    updateUser: (userId, userData) => apiClient.put(`/Users/${userId}`, userData),

    deleteUser: (userId) => apiClient.delete(`/Users/${userId}`),
};

export const rolesAPI = {
    getRoles: (includeDescriptions = false) =>
        apiClient.get("/Roles", {
            params: { includeDescriptions },
        }),
};
