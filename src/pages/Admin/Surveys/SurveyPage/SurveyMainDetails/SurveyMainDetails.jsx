import { useEffect, useState } from "react";
import { surveyPageAPI } from "../../../../../utils/api/pages/surveyPage";
import SurveyMainDetailsSkeleton from "./SurveyMainDetailsSkeleton";
import MainDetails from "./MainDetails";
import PhotosContainer from "./PhotosContainer";
import { generateQRCodeFile } from "../../../../../utils/qrcode";
import { uploadAPI } from "../../../../../utils/api/upload";
import { useAuth } from "../../../../../context/AuthContext";
import { surveyAPI } from "../../../../../utils/api/models/survey";
import FailedToLoad from "../../../../../components/reusable/FailedToLoad";
import { useNavigate } from "react-router-dom";

const appUrl = import.meta.env.VITE_APP_URL;

const SurveyMainDetails = ({ id }) => {
    const { toastError, toastSuccess } = useAuth();
    const navigate = useNavigate();

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

            toastSuccess("QR code generated successfully.");
        } catch (error) {
            console.log(error);
            toastError("Failed to generate QR code. Please try again.");
        } finally {
            setGeneratingQrCode(false);
        }
    };

    const handleUpdateSurveyStatus = (newStatus) => {
        setSurveyMainDetails((prev) => ({
            ...prev,
            status: newStatus,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await surveyPageAPI.getSurveyMainDetails(id);
                setSurveyMainDetails(res.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate("/not-found");
                    return;
                }
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
        return <FailedToLoad />;
    }

    return (
        <div className=" flex gap-4">
            <MainDetails
                survey={surveyMainDetails}
                handleUpdateSurveyStatus={handleUpdateSurveyStatus}
            />
            <PhotosContainer
                survey={surveyMainDetails}
                generatingQrCode={generatingQrCode}
                handleGenerateQrCode={handleGenerateQrCode}
            />
        </div>
    );
};

export default SurveyMainDetails;
