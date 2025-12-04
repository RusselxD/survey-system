import { Download, QrCode } from "lucide-react";
import React from "react";
import { downloadFile } from "../../../../../utils/download";

const QrCodeContainer = ({
    survey,
    generatingQrCode,
    handleGenerateQrCode,
}) => {
    let hasQrCode = Boolean(survey.qrCodeUrl);

    const handleDownload = async () => {
        try {
            await downloadFile(survey.qrCodeUrl, `${survey.title} QR Code.png`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-5 py-4 dark:bg-base-300 bg-white border dark:border-slate-700 border-gray-300 rounded-lg overflow-hidden w-full">
            <div className=" flex justify-between items-center mb-4">
                <h1 className="font-medium custom-sec-txt text-sm">QR Code</h1>
                {hasQrCode && (
                    <button
                        onClick={() => handleDownload()}
                        className="dark:text-blue-400 dark:hover:text-blue-500 text-blue-600 hover:text-blue-700 flex gap-1 text-sm items-center"
                    >
                        <Download size={18} />
                        <span>Download</span>
                    </button>
                )}
            </div>

            {hasQrCode ? (
                <img
                    src={survey.qrCodeUrl}
                    alt="QR Code"
                    className="w-52 h-52 border mx-auto object-cover"
                />
            ) : (
                <div className="h-52 flex rounded-md border dark:border-gray-600 border-gray-300 dark:bg-gray-800 bg-gray-200 flex-col items-center justify-center">
                    <QrCode className="dark:text-gray-500 w-14 h-14" />
                    <p className="custom-sec-txt my-3 text-sm">
                        No QR code generated yet
                    </p>
                    <button
                        onClick={() => handleGenerateQrCode()}
                        className="flex text-sm items-center text-white bg-blue-600 hover:bg-blue-700 gap-2 px-4 py-2 rounded-md"
                    >
                        {generatingQrCode ? (
                            <span className="loading loading-sm"></span>
                        ) : (
                            <QrCode size={16} />
                        )}

                        <span>Generate QR Code</span>
                    </button>
                </div>
            )}

            {hasQrCode && (
                <p className="mt-2 text-center custom-sec-txt text-xs">
                    Scan to access survey
                </p>
            )}
        </div>
    );
};

const CoverImageContainer = ({ survey }) => {
    if (!survey.coverImageUrl) {
        return null;
    }

    return (
        <div className="border dark:border-slate-700 border-gray-300 rounded-lg overflow-hidden w-full">
            <div className="px-5 py-4 font-medium dark:bg-base-300 bg-white custom-sec-txt text-sm">
                Header Image
            </div>
            <img
                src={survey.coverImageUrl}
                alt="Cover"
                className="w-full h-40 object-cover"
            />
        </div>
    );
};

const PhotosContainer = ({
    survey,
    generatingQrCode,
    handleGenerateQrCode,
}) => {
    return (
        <div className=" w-[30%] space-y-3">
            <CoverImageContainer survey={survey} />
            <QrCodeContainer
                survey={survey}
                generatingQrCode={generatingQrCode}
                handleGenerateQrCode={handleGenerateQrCode}
            />
        </div>
    );
};

export default PhotosContainer;
