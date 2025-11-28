import apiClient from "../axiosConfig";

export const dashboardAPI = {
    getDashboardMetrics: () => apiClient.get("/Dashboard/Metrics"),
};
