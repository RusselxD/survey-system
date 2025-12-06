import apiClient from "../axiosConfig";

export interface DashboardMetrics {
    totalResponses: number;
    responseRate: number;
    completionRate: number;
    totalViews: number;
    activeSurveys: number;
    responsesThisWeek: number;
    avgTimeToCompleteMinutes: number;
    totalSurveys: number;
    avgQuestions: number;
    avgResponses: number;
}

export const dashboardAPI = {
    getDashboardMetrics: () =>
        apiClient.get<DashboardMetrics>("/Dashboard/Metrics"),
};
