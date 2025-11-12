import apiClient from "./axiosConfig";

export const usersAPI = {
    getUsers: () => {
        const a = apiClient.get("/Users");
        console.log(a);
        return a;
    },

    updateUser: (userId, userData) =>
        apiClient.put(`/Users/${userId}`, userData),

    deleteUser: (userId) => apiClient.delete(`/Users/${userId}`),
};

export const rolesAPI = {
    getRoles: () => apiClient.get("/Roles"),

    createRole: (roleData) => apiClient.post("/Roles", roleData),

    updateRole: (roleId, roleData) =>
        apiClient.put(`/Roles/${roleId}`, roleData),

    deleteRole: (roleId) => apiClient.delete(`/Roles/${roleId}`),

    // getRoles: (includeDescriptions ) =>
    //     apiClient.get("/Roles", {
    //         params: { includeDescriptions },
    //     }),
};
