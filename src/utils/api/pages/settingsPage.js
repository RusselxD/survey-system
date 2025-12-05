import apiClient from "../axiosConfig";

export const settingsAPI = {
    getSystemSettings: () => apiClient.get("/Settings/SystemSettings"),

    updatePrivacyText: (key, textPayload) =>
        apiClient.put(`/Settings/SystemSettings/Text/${key}`, textPayload),

    getLocations: () => apiClient.get("/Locations"),

    getServiceTypes: () => apiClient.get("/ServiceTypes"),

    batchUpdateLocations: (payload) =>
        apiClient.post("/Settings/Locations/Batch", payload),

    batchUpdateServiceTypes: (payload) =>
        apiClient.post("/Settings/ServiceType/Batch", payload),
};
