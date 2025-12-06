import apiClient from "./axiosConfig";
import { AxiosResponse } from "axios";

interface UploadImageResponse {
    fileUrl: string;
}

export const uploadAPI = {
    uploadImage: (image: File): Promise<AxiosResponse<UploadImageResponse>> => {
        const formData = new FormData();
        formData.append("image", image);
        return apiClient.post("/Upload/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
