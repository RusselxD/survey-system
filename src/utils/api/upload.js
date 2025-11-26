import apiClient from "./axiosConfig";

export const uploadAPI = {
    uploadImage: (image) => {
        const formData = new FormData();
        formData.append("image", image);
        return apiClient.post("/Upload/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
