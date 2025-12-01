import apiClient from "../axiosConfig";

export const surveyPageAPI = {
    getSurveyMainDetails: (id) => apiClient.get(`ViewSurveyDetails/${id}`),
};
