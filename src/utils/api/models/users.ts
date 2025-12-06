import apiClient from "../axiosConfig";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
}

interface CreateUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    roleId: number;
    forceUpdatePassword: boolean;
}

interface UpdateUser {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
}

export const usersAPI = {
    getUsers: () => apiClient.get<User[]>("/Users"),

    getUserByEmail: (email: string) =>
        apiClient.get<User>(`/Users/by-email/${email}`),

    createUser: (userData: CreateUser) =>
        apiClient.post<User>("/Users", userData),

    updateUser: (userId: string, userData: UpdateUser) =>
        apiClient.put<User>(`/Users/${userId}`, userData),

    deleteUser: (userId: string) => apiClient.delete(`/Users/${userId}`),
};

interface Role {
    id: number;
    name: string;
    description: string;
    userCount: number;
}

interface UpdateOrCreateRole {
    name: string;
    description: string;
}

export const rolesAPI = {
    getRoles: () => apiClient.get<Role[]>("/Roles"),

    createRole: (roleData: UpdateOrCreateRole) =>
        apiClient.post<Role>("/Roles", roleData),

    updateRole: (roleId: number, roleData: UpdateOrCreateRole) =>
        apiClient.put<Role>(`/Roles/${roleId}`, roleData),

    updateRolePermissions: (roleId: number, permissions: number[]) =>
        apiClient.put(`/Roles/${roleId}/Permissions`, permissions),

    deleteRole: (roleId: number) => apiClient.delete(`/Roles/${roleId}`),
};

interface Permission {
    id: number;
    name: string;
    description: string;
    roleIds: number[];
}

// Permissions are immutable, so only a GET endpoint is provided
export const permissionsAPI = {
    getPermissions: () => apiClient.get<Permission[]>("/Permissions"),
};
