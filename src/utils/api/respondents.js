import apiClient from "./axiosConfig";

// Helper to get or create session ID
const getSessionId = (surveyId) => {
    const storageKey = `survey_view_session_${surveyId}`;
    let sessionId = sessionStorage.getItem(storageKey);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(storageKey, sessionId);
    }
    return sessionId;
};

export const respondentsAPI = {
    getSurveyPreviewDetails: (surveyId) =>
        apiClient.get(`TakeSurvey/Preview/${surveyId}`),

    getSurveyQuestions: (surveyId) =>
        apiClient.get(`TakeSurvey/DetailsAndQuestions/${surveyId}`),

    recordSurveyView: (surveyId) =>
        apiClient.post(`TakeSurvey/View/${surveyId}`, {
            sessionId: getSessionId(surveyId),
        }),

    startSurvey: (surveyId) =>
        apiClient.post("TakeSurvey/Start", {
            surveyId: surveyId,
        }),

    sumitSurveyResponse: (responseId, responseData) =>
        apiClient.put(`TakeSurvey/Submit/${responseId}`, responseData),

    // Helper to check if a survey has been viewed
    hasSurveyBeenViewed: (surveyId) => {
        const storageKey = `survey_view_session_${surveyId}`;
        return sessionStorage.getItem(storageKey) !== null;
    },

    // Helper to mark survey as completed
    markSurveyAsCompleted: (surveyId) => {
        const storageKey = `survey_complete_session_${surveyId}`;
        sessionStorage.setItem(storageKey, "completed");
    },

    // Helper to check if survey has been completed
    hasSurveyBeenCompleted: (surveyId) => {
        const storageKey = `survey_complete_session_${surveyId}`;
        return sessionStorage.getItem(storageKey) !== null;
    },

    // Helper to clear completion status (for retaking survey)
    clearSurveyCompletion: (surveyId) => {
        const completionKey = `survey_complete_session_${surveyId}`;
        const viewKey = `survey_view_session_${surveyId}`;
        sessionStorage.removeItem(completionKey);
        sessionStorage.removeItem(viewKey);
    },
};
