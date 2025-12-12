import React, { useEffect, useState } from "react";
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
import { exportSurveyToPDF } from "../../../../../utils/exportSurveyToPDF";

const appUrl = import.meta.env.VITE_APP_URL;

interface SurveyMainDetailsData {
    id: string;
    title: string;
    description: string;
    status: string;
    createdBy: string;
    updatedAt: string;
    locationName?: string;
    serviceTypeName?: string;
    qrCodeUrl: string;
    coverImageUrl: string;
    mainMetrics: {
        totalViews: number;
        totalResponses: number;
        avgCompletionTimeInMinutes: number;
        responseRate: number;
        completionRate: number;
    };
}

interface SurveyMainDetailsProps {
    id: string;
    exportTrigger?: number;
    setIsExporting?: (value: boolean) => void;
}

const SurveyMainDetails = ({
    id,
    exportTrigger,
    setIsExporting,
}: SurveyMainDetailsProps): React.JSX.Element => {
    const { toastError, toastSuccess, startExport, endExport } = useAuth();
    const navigate = useNavigate();

    const [surveyMainDetails, setSurveyMainDetails] =
        useState<SurveyMainDetailsData | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [generatingQrCode, setGeneratingQrCode] = useState<boolean>(false);
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
                ...prev!,
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

    const handleUpdateSurveyStatus = (newStatus: string): void => {
        setSurveyMainDetails((prev) => ({
            ...prev!,
            status: newStatus,
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await surveyPageAPI.getSurveyMainDetails(id);
                setSurveyMainDetails(res.data);
            } catch (error: any) {
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

    // Handle PDF export
    useEffect(() => {
        const handleExport = async () => {
            if (exportTrigger && exportTrigger > 0 && surveyMainDetails) {
                if (setIsExporting) setIsExporting(true);
                startExport();
                try {
                    // Fetch questions data
                    const questionsRes =
                        await surveyPageAPI.getQuestionAnalytics(id);
                    const questions = questionsRes.data;

                    // Parse analyticsData for each question and format for PDF
                    const formattedQuestions = questions.map((q: any) => {
                        const baseQuestion = {
                            questionId: q.questionId,
                            questionType: q.questionType,
                            questionText: q.questionText,
                            totalResponses: q.totalResponses,
                            responseRate: q.responseRate,
                        };

                        // Parse analyticsData if it exists
                        if (!q.analyticsData) {
                            return baseQuestion;
                        }

                        try {
                            const parsedData = JSON.parse(q.analyticsData);

                            // For Checkboxes (uses Options array)
                            if (parsedData.Options) {
                                return {
                                    ...baseQuestion,
                                    options: parsedData.Options.map(
                                        (opt: any) => ({
                                            option: opt.Text,
                                            count: opt.SelectionCount,
                                            percentage: opt.SelectionRate,
                                        })
                                    ),
                                };
                            }

                            // For Multiple Choice, Dropdown (uses Labels)
                            if (
                                parsedData.Labels &&
                                parsedData.ResponseCounts
                            ) {
                                return {
                                    ...baseQuestion,
                                    options: parsedData.Labels.map(
                                        (label: string, idx: number) => ({
                                            option: label,
                                            count: parsedData.ResponseCounts[
                                                idx
                                            ],
                                            percentage:
                                                parsedData.ResponseRates[idx],
                                        })
                                    ),
                                };
                            }

                            // For Linear Scale
                            if (
                                parsedData.Distribution &&
                                parsedData.Average !== undefined
                            ) {
                                return {
                                    ...baseQuestion,
                                    distribution: parsedData.Distribution.map(
                                        (d: any) => ({
                                            value: d.Value,
                                            count: d.Count,
                                            percentage: d.Percentage,
                                        })
                                    ),
                                    averageRating: parsedData.Average,
                                };
                            }

                            // For Text/Paragraph (short_answer, paragraph)
                            if (parsedData.CommonWords) {
                                return {
                                    ...baseQuestion,
                                    commonWords: parsedData.CommonWords,
                                    avgLength: parsedData.AvgLength,
                                };
                            }

                            // For Grid (multiple_choice_grid & checkbox_grid)
                            if (parsedData.Rows) {
                                // Parse metadata to get row/column labels
                                const metadata = q.questionMetadata
                                    ? JSON.parse(q.questionMetadata)
                                    : null;

                                return {
                                    ...baseQuestion,
                                    rowData: parsedData.Rows.map(
                                        (row: any, idx: number) => ({
                                            rowText:
                                                metadata?.rows?.[idx]?.text ||
                                                row.RowText ||
                                                `Row ${idx + 1}`,
                                            columns: row.Columns.map(
                                                (col: any) => ({
                                                    count: col.Count,
                                                    rate: col.Rate,
                                                })
                                            ),
                                        })
                                    ),
                                    columnHeaders:
                                        metadata?.columns?.map(
                                            (c: any) => c.text
                                        ) || [],
                                };
                            }

                            // For Date/Time
                            if (
                                parsedData.MinDate ||
                                parsedData.MaxDate ||
                                parsedData.MinTime ||
                                parsedData.MaxTime
                            ) {
                                return {
                                    ...baseQuestion,
                                    dateRange: {
                                        minDate: parsedData.MinDate,
                                        maxDate: parsedData.MaxDate,
                                        minTime: parsedData.MinTime,
                                        maxTime: parsedData.MaxTime,
                                    },
                                };
                            }
                        } catch (error) {
                            console.error(
                                "Error parsing analytics data:",
                                error
                            );
                        }

                        return baseQuestion;
                    });

                    exportSurveyToPDF({
                        title: surveyMainDetails.title,
                        description: surveyMainDetails.description,
                        createdBy: surveyMainDetails.createdBy,
                        updatedAt: surveyMainDetails.updatedAt,
                        locationName: surveyMainDetails.locationName,
                        serviceTypeName: surveyMainDetails.serviceTypeName,
                        mainMetrics: surveyMainDetails.mainMetrics,
                        questions: formattedQuestions,
                    });

                    toastSuccess("PDF exported successfully!");
                } catch (error) {
                    console.error("Error exporting PDF:", error);
                    toastError("Failed to export PDF. Please try again.");
                } finally {
                    if (setIsExporting) setIsExporting(false);
                    endExport();
                }
            }
        };

        handleExport();
    }, [exportTrigger]);

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
