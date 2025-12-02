import apiClient from "../axiosConfig";

export const surveyPageAPI = {
    getSurveyMainDetails: (id) => apiClient.get(`ViewSurveyDetails/${id}`),

    getSurveyCounts: (id) => apiClient.get(`ViewSurveyDetails/${id}/QuestionAndResponseCounts`),

    getResponses: (id) => apiClient.get(`ViewSurveyDetails/${id}/Responses`),

    getResponseAnswers: (responseId) =>
        apiClient.get(`ViewSurveyDetails/Response/${responseId}/Answers`),
};
