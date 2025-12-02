import apiClient from "../axiosConfig";

export const surveyPageAPI = {
    getSurveyMainDetails: (id) => apiClient.get(`ViewSurveyDetails/${id}`),

    getSurveyCounts: (id) =>
        apiClient.get(`ViewSurveyDetails/${id}/QuestionAndResponseCounts`),

    getResponses: (id, page = 1, pageSize = 10) =>
        apiClient.get(
            `ViewSurveyDetails/${id}/Responses?page=${page}&pageSize=${pageSize}`
        ),

    getResponseAnswers: (responseId) =>
        apiClient.get(`ViewSurveyDetails/Response/${responseId}/Answers`),
};
