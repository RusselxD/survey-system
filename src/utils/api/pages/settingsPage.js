import apiClient from "../axiosConfig";

export const settingsAPI = {
    getSystemSettings: () => apiClient.get("/SystemSettings"),

    getLocations: () => apiClient.get("/Locations"),

    getServiceTypes: () => apiClient.get("/ServiceTypes"),

    batchUpdateLocations: (payload) =>
        apiClient.post("/Settings/Locations/Batch", payload),

    batchUpdateServiceTypes: (payload) =>
        apiClient.post("/Settings/ServiceType/Batch", payload),
};
