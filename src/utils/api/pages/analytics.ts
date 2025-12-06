import apiClient from "../axiosConfig";

interface SurveyTrend {
    surveyId: string;
    surveyName: string;
    responseCounts: number[];
}

export interface ResponseTrends {
    labels: string[];
    responseCounts: number[];
    surveyTrends: SurveyTrend[];
}

export interface TopSurveysByResponseRate {
    surveys: string[];
    responseRates: number[];
    responseCounts: number[];
}

export interface EngagementFunnelItem {
    label: string;
    value: number;
    rate: number;
}

export interface SurveyResponseCount {
    title: string;
    responseCount: number;
}

export interface CompletionTimeDistribution {
    timeRanges: string[];
    responseCounts: number[];
    peakRanges: string[];
}

export interface ResponsesByLocation {
    locations: string[];
    responseCounts: number[];
}

export interface ResponsesByServiceType {
    serviceTypes: string[];
    responseCounts: number[];
}

export interface ResponseActivity {
    labels: string[];
    responseCounts: number[];
}

export interface ResponseActivityHeatMapProps {
    dataset: ResponseActivity;
    view?: "hourly" | "daily";
}

export interface QuestionTypeDistribution {
    questionTypes: string[];
    counts: number[];
}

export interface CompletionRateBySurveyLength {
    surveyNames: string[];
    questionCounts: number[];
    completionRates: number[];
}

export const analyticsAPI = {
    getResponseTrends: (days: number, granularity: string) =>
        apiClient.get<ResponseTrends>(`/Analytics/ResponseTrends/${days}`, {
            params: { granularity: granularity },
        }),

    getTopSurveysByResponseRate: () =>
        apiClient.get<TopSurveysByResponseRate>(
            "/Analytics/TopSurveysByResponseRate"
        ),

    getEngagementFunnelData: () =>
        apiClient.get<EngagementFunnelItem[]>("/Analytics/EngagementFunnel"),

    getTopSurveysByResponseCount: () =>
        apiClient.get<SurveyResponseCount[]>(
            "/Analytics/SurveysWithResponseCounts"
        ),

    getCompletionTimeDistribution: () =>
        apiClient.get<CompletionTimeDistribution>(
            "/Analytics/CompletionTimeDistribution"
        ),

    getResponsesByLocation: (includeAll: boolean) =>
        apiClient.get<ResponsesByLocation>(`/Analytics/ResponsesByLocation`, {
            params: { includeAll: includeAll },
        }),

    getResponsesByServiceType: () =>
        apiClient.get<ResponsesByServiceType>(
            "/Analytics/ResponsesByServiceType"
        ),

    getResponseActivityData: (view: string) =>
        apiClient.get<ResponseActivity>(`/Analytics/ResponseActivity/${view}`),

    getQuestionTypeDistribution: () =>
        apiClient.get<QuestionTypeDistribution>(
            "/Analytics/QuestionTypeDistribution"
        ),

    getCompletionRateBySurveyLength: () =>
        apiClient.get<CompletionRateBySurveyLength>(
            "/Analytics/CompletionRateBySurveyLength"
        ),
};
