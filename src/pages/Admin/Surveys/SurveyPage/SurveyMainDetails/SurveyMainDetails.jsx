import { useEffect, useState } from "react";
import { surveyPageAPI } from "../../../../../utils/api/pages/surveyPage";
import SurveyMainDetailsSkeleton from "./SurveyMainDetailsSkeleton";
import MainDetails from "./MainDetails";
import PhotosContainer from "./PhotosContainer";
import { generateQRCodeFile } from "../../../../../utils/qrcode";
import { uploadAPI } from "../../../../../utils/api/upload";
import { useAuth } from "../../../../../context/AuthContext";
import { surveyAPI } from "../../../../../utils/api/models/survey";

const appUrl = import.meta.env.VITE_APP_URL;

const SurveyMainDetails = ({ id }) => {
    const { toastError } = useAuth();

    const [surveyMainDetails, setSurveyMainDetails] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const [generatingQrCode, setGeneratingQrCode] = useState(false);
    const handleGenerateQrCode = async () => {
        try {
            setGeneratingQrCode(true);

            const qrContent = `${appUrl}/s/${id}`;

            const qrCodeFile = await generateQRCodeFile(qrContent, {
                width: 400,
                filename: "my-qrcode.png",
            });

            const imageUrlRes = await uploadAPI.uploadImage(qrCodeFile);

            // Get the URL to save in database
            const qrCodeUrl = imageUrlRes.data.fileUrl;

            // Save the QR code URL to the survey in the backend
            await surveyAPI.saveQrCodeUrl(id, qrCodeUrl);

            // Update local state
            setSurveyMainDetails((prev) => ({
                ...prev,
                qrCodeUrl: qrCodeUrl,
            }));

        } catch (error) {
            console.log(error);
            toastError("Failed to generate QR code. Please try again.");
        } finally {
            setGeneratingQrCode(false);
        }
    };

    console.log(surveyMainDetails);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await surveyPageAPI.getSurveyMainDetails(id);
                setSurveyMainDetails(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [id]);

    if (isFetching) {
        return <SurveyMainDetailsSkeleton />;
    }

    if (!surveyMainDetails) {
        return null;
    }

    return (
        <div className=" flex gap-4">
            <MainDetails survey={surveyMainDetails} />
            <PhotosContainer
                survey={surveyMainDetails}
                generatingQrCode={generatingQrCode}
                handleGenerateQrCode={handleGenerateQrCode}
            />
        </div>
    );
};

export default SurveyMainDetails;
