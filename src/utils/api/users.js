import apiClient from "./axiosConfig";

export const usersAPI = {
    getUsers: () => apiClient.get("/Users"),

    getUserByEmail: (email) => apiClient.get(`/Users/by-email/${email}`),

    createUser: (userData) => apiClient.post("/Users", userData),

    updateUser: (userId, userData) =>
        apiClient.put(`/Users/${userId}`, userData),

    deleteUser: (userId) => apiClient.delete(`/Users/${userId}`),
};

export const rolesAPI = {
    getRoles: () => apiClient.get("/Roles"),

    createRole: (roleData) => apiClient.post("/Roles", roleData),

    updateRole: (roleId, roleData) =>
        apiClient.put(`/Roles/${roleId}`, roleData),

    updateRolePermissions: (roleId, permissions) =>
        apiClient.put(`/Roles/${roleId}/Permissions`, permissions),

    deleteRole: (roleId) => apiClient.delete(`/Roles/${roleId}`),
};

export const permissionsAPI = {
    getPermissions: () => apiClient.get("/Permissions"),
};
