import apiClient from "../axiosConfig";

export const analyticsAPI = {
    getResponseTrends: (days, granularity) =>
        apiClient.get(`/Analytics/ResponseTrends/${days}`, {
            params: { granularity: granularity },
        }),

    getTopSurveysByResponseRate: () =>
        apiClient.get("/Analytics/TopSurveysByResponseRate"),

    getEngagementFunnelData: () => apiClient.get("/Analytics/EngagementFunnel"),

    getTopSurveysByResponseCount: () =>
        apiClient.get("/Analytics/SurveysWithResponseCounts"),

    getCompletionTimeDistribution: () =>
        apiClient.get("/Analytics/CompletionTimeDistribution"),

    getResponsesByLocation: (includeAll) =>
        apiClient.get(`/Analytics/ResponsesByLocation`, {
            params: { includeAll: includeAll },
        }),

    getResponsesByServiceType: () =>
        apiClient.get("/Analytics/ResponsesByServiceType"),

    getResponseActivityData: (view) =>
        apiClient.get(`/Analytics/ResponseActivity/${view}`),

    getQuestionTypeDistribution: () =>
        apiClient.get("/Analytics/QuestionTypeDistribution"),

    getCompletionRateBySurveyLength: () =>
        apiClient.get("/Analytics/CompletionRateBySurveyLength"),
};
