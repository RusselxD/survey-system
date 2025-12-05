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

    archiveSurvey: (surveyId) =>
        apiClient.put(`ViewSurveyDetails/Archive/${surveyId}`),

    unarchiveSurvey: (surveyId) =>
        apiClient.put(`ViewSurveyDetails/Unarchive/${surveyId}`),

    deleteSurvey: (surveyId) =>
        apiClient.delete(`ViewSurveyDetails/${surveyId}`),
};
