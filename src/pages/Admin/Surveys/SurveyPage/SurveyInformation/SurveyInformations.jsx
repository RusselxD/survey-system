import { format } from "date-fns";
import { FileText, X, Copy, Check, Download } from "lucide-react";
import { useState } from "react";
import {
    downloadFile,
    sanitizeFilename,
} from "../../../../../utils/download.js";

const Info = ({ label, value }) => {
    return (
        <div className="flex items-center text-sm mb-2">
            <span className="custom-primary-txt min-w-28">{label}: </span>
            <span className="custom-sec-txt flex-1">{value}</span>
        </div>
    );
};

const SurveyInformations = ({ survey }) => {
    const [copied, setCopied] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(survey.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadQR = async () => {
        setIsDownloading(true);
        try {
            const filename = `${sanitizeFilename(survey.title)}-qr-code.png`;
            await downloadFile(survey.qrCodeUrl, filename);
        } catch (error) {
            console.error("Failed to download QR code:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="my-5">
            <h1 className="font-semibold custom-primary-txt flex items-center gap-1 mb-3">
                <FileText />
                <span>Survey Information</span>
            </h1>

            <div className="p-5 rounded-lg dark:bg-gray-700 bg-gray-100">
                <Info label="Title" value={survey.title} />
                <Info label="Description" value={survey.description} />
                {survey.location && (
                    <Info label="Location" value={survey.location} />
                )}
                {survey.serviceType && (
                    <Info label="Service Type" value={survey.serviceType} />
                )}
                <Info
                    label="Published"
                    value={format(new Date(survey.published), "MMM dd, yyyy")}
                />
                <Info
                    label="Version"
                    value={survey.version || "N/A"}
                />
                <Info
                    label="Link"
                    value={
                        <div className="flex items-center gap-2">
                            <a
                                href={survey.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline truncate"
                            >
                                {survey.url}
                            </a>
                            <button
                                onClick={handleCopyLink}
                                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 text-xs transition-colors flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                title={copied ? "Copied!" : "Copy link"}
                            >
                                {copied ? (
                                    <>
                                        <Check
                                            size={16}
                                            className="text-green-600 dark:text-green-400"
                                        />
                                        <span className="text-green-600 dark:text-green-400">
                                            Copied
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        <span>Copy</span>
                                    </>
                                )}
                            </button>
                        </div>
                    }
                />
                {survey.qrCodeUrl && (
                    <Info
                        label="QR Code"
                        value={
                            <div className="flex items-center gap-2">
                                <img
                                    src={survey.qrCodeUrl}
                                    alt="QR Code"
                                    className="w-12 h-12 object-contain"
                                />
                                <button
                                    onClick={handleDownloadQR}
                                    disabled={isDownloading}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:disabled:hover:bg-transparent"
                                    title={
                                        isDownloading
                                            ? "Downloading..."
                                            : "Download QR Code"
                                    }
                                >
                                    {isDownloading ? (
                                        <>
                                            <span className="loading loading-spinner loading-xs"></span>
                                            <span className="text-sm">
                                                Downloading...
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <Download size={16} />
                                            <span className="text-sm">
                                                Download
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default SurveyInformations;
