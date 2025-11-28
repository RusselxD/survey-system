import apiClient from "../axiosConfig";

export const analyticsAPI = {
    getResponseTrends: (days) =>
        apiClient.get(`/Analytics/ResponseTrends/${days}`),

    getTopSurveysByResponseRate: () =>
        apiClient.get("/Analytics/TopSurveysByResponseRate"),

    getEngagementFunnelData: () => apiClient.get("/Analytics/EngagementFunnel"),

    getTopSurveysByResponseCount: () =>
        apiClient.get("/Analytics/SurveysWithResponseCounts"),
};
