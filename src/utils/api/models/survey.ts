import apiClient from "../axiosConfig";

export interface Survey {
    id: string;
    title: string;
    description: string;
    status: string;
    qrCodeUrl: string;
    coverImageUrl: string;
    questionCount: number;
    responseCount: number;
    updatedAt: string;
}

interface SurveyQuestionInToEdit {
    id: number;
    typeId: number;
    typeName: string;
    text: string;
    ordinal: number;
    required: boolean;
    metadata: string;
}

interface SurveyToEdit {
    id: string;
    title: string;
    description: string;
    coverImageUrl: string;
    serviceTypeId: number;
    locationId: number;
    askName: boolean;
    askEmail: boolean;
    surveyQuestions: SurveyQuestionInToEdit[];
}

interface SurveyQuestionInCreateOrUpdate {
    typeId: number;
    text: string;
    ordinal: number;
    required: boolean;
    metadata: string;
}

interface SurveyCreate {
    title: string;
    description: string;
    status: string;
    coverImageUrl: string;
    askName: boolean;
    askEmail: boolean;
    serviceTypeId: number;
    locationId: number;
    createdBy: string;
    surveyQuestions: SurveyQuestionInCreateOrUpdate[];
}

interface SurveyUpdate {
    title: string;
    description: string;
    status: string;
    coverImageUrl: string;
    askName: boolean;
    askEmail: boolean;
    serviceTypeId: number;
    locationId: number;
    createdBy: string;
    surveyQuestions: SurveyQuestionInCreateOrUpdate[];
}

// Shared interface for entities with id and name
export interface IdNamePair {
    id: number;
    name: string;
}

export const surveyAPI = {
    getSurveys: () => apiClient.get<Survey[]>("/Surveys"),

    getSurveyToEdit: (id: string) =>
        apiClient.get<SurveyToEdit>(`/Surveys/to-edit/${id}`),

    createSurvey: (surveyData: SurveyCreate) =>
        apiClient.post<Survey>("/Surveys", surveyData),

    updateSurvey: (id: string, surveyData: SurveyUpdate) =>
        apiClient.put(`/Surveys/${id}`, surveyData),

    saveQrCodeUrl: (id: string, qrCodeUrl: string) =>
        apiClient.put(`/Surveys/${id}/qr-code`, { qrCodeUrl }),
};

export const locationsAPI = {
    getLocations: () => apiClient.get<IdNamePair[]>("/Locations"),
};

export const serviceTypesAPI = {
    getServiceTypes: () => apiClient.get<IdNamePair[]>("/ServiceTypes"),
};

export const questionTypesAPI = {
    getQuestionTypes: () => apiClient.get<IdNamePair[]>("/QuestionTypes"),
};
