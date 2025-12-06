import apiClient from "../axiosConfig";

interface SystemSetting {
    key: string;
    value: string;
}

interface LocationOrServiceType {
    id: number;
    name: string;
}

interface BatchUpdatePayload {
    toDelete: number[];
    toAdd: string[];
    toEdit: Array<{
        id: number;
        name: string;
    }>;
}

interface TextPayload {
    text: string;
}

export const settingsAPI = {
    getSystemSettings: () =>
        apiClient.get<SystemSetting[]>("/Settings/SystemSettings"),

    updatePrivacyText: (key: string, textPayload: TextPayload) =>
        apiClient.put(`/Settings/SystemSettings/Text/${key}`, textPayload),

    getLocations: () => apiClient.get<LocationOrServiceType[]>("/Locations"),

    getServiceTypes: () =>
        apiClient.get<LocationOrServiceType[]>("/ServiceTypes"),

    batchUpdateLocations: (payload: BatchUpdatePayload) =>
        apiClient.post<LocationOrServiceType[]>(
            "/Settings/Locations/Batch",
            payload
        ),

    batchUpdateServiceTypes: (payload: BatchUpdatePayload) =>
        apiClient.post<LocationOrServiceType[]>(
            "/Settings/ServiceType/Batch",
            payload
        ),
};
