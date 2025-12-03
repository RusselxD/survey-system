import apiClient from "../axiosConfig";

export const surveyPageAPI = {
    getSurveyMainDetails: (surveyId) =>
        apiClient.get(`ViewSurveyDetails/${surveyId}`),

    getSurveyCounts: (surveyId) =>
        apiClient.get(
            `ViewSurveyDetails/${surveyId}/QuestionAndResponseCounts`
        ),

    getQuestionAnalytics: (surveyId) =>
        apiClient.get(`ViewSurveyDetails/${surveyId}/QuestionAnalytics`),

    getResponses: (surveyId, page = 1, pageSize = 10) =>
        apiClient.get(
            `ViewSurveyDetails/${surveyId}/Responses?page=${page}&pageSize=${pageSize}`
        ),

    getResponseAnswers: (responseId) =>
        apiClient.get(`ViewSurveyDetails/Response/${responseId}/Answers`),
};
