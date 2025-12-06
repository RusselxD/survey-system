import apiClient from "./axiosConfig";

interface SurveyPreview {
    id: string;
    title: string;
    description: string;
    status: string;
    coverImageUrl: string;
    askName: boolean;
    askEmail: boolean;
    questionCount: number;
}

interface Question {
    id: number;
    typeId: number;
    typeName: string;
    text: string;
    ordinal: number;
    required: boolean;
    metadata: string;
}

interface SurveyDetails {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    status: string;
    askName: boolean;
    askEmail: boolean;
    questions: Question[];
}

interface RecordViewRequest {
    sessionId: string;
}

interface StartSurveyRequest {
    surveyId: string;
}

interface StartSurveyResponse {
    responseId: string;
}

interface ResponseAnswer {
    questionId: number;
    answer: string | null;
    metadata: string | null;
}

interface SubmitSurveyRequest {
    respondentName: string | null;
    respondentEmail: string | null;
    responseAnswers: ResponseAnswer[];
}

// Helper to get or create session ID
const getSessionId = (surveyId: string) => {
    const storageKey = `survey_view_session_${surveyId}`;
    let sessionId: string | null = sessionStorage.getItem(storageKey);
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        sessionStorage.setItem(storageKey, sessionId);
    }
    return sessionId;
};

export const respondentsAPI = {
    getSurveyPreviewDetails: (surveyId: string) =>
        apiClient.get<SurveyPreview>(`TakeSurvey/Preview/${surveyId}`),

    getSurveyQuestions: (surveyId: string) =>
        apiClient.get<SurveyDetails>(
            `TakeSurvey/DetailsAndQuestions/${surveyId}`
        ),

    recordSurveyView: (surveyId: string) => {
        const payload: RecordViewRequest = {
            sessionId: getSessionId(surveyId),
        };
        return apiClient.post(`TakeSurvey/View/${surveyId}`, payload);
    },

    startSurvey: (surveyId: string) => {
        const payload: StartSurveyRequest = {
            surveyId: surveyId,
        };
        return apiClient.post<StartSurveyResponse>("TakeSurvey/Start", payload);
    },

    sumitSurveyResponse: (
        responseId: string,
        responseData: SubmitSurveyRequest
    ) => apiClient.put(`TakeSurvey/Submit/${responseId}`, responseData),

    // Helper to check if a survey has been viewed
    hasSurveyBeenViewed: (surveyId: string) => {
        const storageKey = `survey_view_session_${surveyId}`;
        return sessionStorage.getItem(storageKey) !== null;
    },

    // Helper to mark survey as completed
    markSurveyAsCompleted: (surveyId: string) => {
        const storageKey = `survey_complete_session_${surveyId}`;
        sessionStorage.setItem(storageKey, "completed");
    },

    // Helper to check if survey has been completed
    hasSurveyBeenCompleted: (surveyId: string) => {
        const storageKey = `survey_complete_session_${surveyId}`;
        return sessionStorage.getItem(storageKey) !== null;
    },

    // Helper to clear completion status (for retaking survey)
    clearSurveyCompletion: (surveyId: string) => {
        const completionKey = `survey_complete_session_${surveyId}`;
        const viewKey = `survey_view_session_${surveyId}`;
        sessionStorage.removeItem(completionKey);
        sessionStorage.removeItem(viewKey);
    },
};
