import apiClient from "../axiosConfig";

interface SurveyMainMetrics {
    totalViews: number;
    totalResponses: number;
    completionRate: number;
    responseRate: number;
    avgCompletionTimeInMinutes: number;
}

interface SurveyMainDetails {
    id: string;
    title: string;
    description: string;
    status: string;
    locationName: string;
    serviceTypeName: string;
    qrCodeUrl: string;
    coverImageUrl: string;
    createdBy: string;
    updatedAt: string;
    mainMetrics: SurveyMainMetrics;
}

interface SurveyCounts {
    questionCount: number;
    responseCount: number;
}

interface QuestionAnalytics {
    questionId: number;
    questionText: string;
    questionType: string;
    ordinal: number;
    required: boolean;
    questionMetadata: string;
    totalResponses: number;
    answeredCount: number;
    responseRate: number;
    analyticsData: string;
}

interface ResponseItem {
    id: string;
    respondentName: string;
    respondentEmail: string;
    submittedAt: string;
    timeToCompleteSeconds: number;
    completionTime: string;
}

interface PaginatedResponses {
    data: ResponseItem[];
    page: number;
    pageSize: number;
    totalCount: number;
    hasMore: boolean;
}

interface ResponseAnswer {
    id: number;
    responseId: string;
    questionId: number;
    questionText: string;
    questionType: string;
    questionMetadata: string;
    answer: string;
    answerMetadata: string;
    ordinal: number;
}

export const surveyPageAPI = {
    getSurveyMainDetails: (surveyId: string) =>
        apiClient.get<SurveyMainDetails>(`ViewSurveyDetails/${surveyId}`),

    getSurveyCounts: (surveyId: string) =>
        apiClient.get<SurveyCounts>(
            `ViewSurveyDetails/${surveyId}/QuestionAndResponseCounts`
        ),

    getQuestionAnalytics: (surveyId: string) =>
        apiClient.get<QuestionAnalytics[]>(
            `ViewSurveyDetails/${surveyId}/QuestionAnalytics`
        ),

    getResponses: (surveyId: string, page = 1, pageSize = 10) =>
        apiClient.get<PaginatedResponses>(
            `ViewSurveyDetails/${surveyId}/Responses?page=${page}&pageSize=${pageSize}`
        ),

    getResponseAnswers: (responseId: string) =>
        apiClient.get<ResponseAnswer[]>(
            `ViewSurveyDetails/Response/${responseId}/Answers`
        ),

    archiveSurvey: (surveyId: string) =>
        apiClient.put(`ViewSurveyDetails/Archive/${surveyId}`),

    unarchiveSurvey: (surveyId: string) =>
        apiClient.put(`ViewSurveyDetails/Unarchive/${surveyId}`),

    deleteSurvey: (surveyId: string) =>
        apiClient.delete(`ViewSurveyDetails/${surveyId}`),
};
