import apiClient from "../axiosConfig";

export const surveyPageAPI = {
    getSurveyMainDetails: (id) => apiClient.get(`ViewSurveyDetails/${id}`),

    getResponses: (id) => apiClient.get(`ViewSurveyDetails/${id}/Responses`),
};
