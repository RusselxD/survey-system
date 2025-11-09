import { X, Download } from "lucide-react";
import { useState } from "react";
import { downloadFile, sanitizeFilename } from "../../../../../utils/download.js";

const QRCodeModal = ({ qrModalData, onClose }) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        setIsDownloading(true);
        try {
            const filename = `${sanitizeFilename(
                qrModalData.title
            )}-qr-code.png`;
            await downloadFile(qrModalData.qrCodeUrl, filename);
        } catch (error) {
            console.error("Failed to download QR code:", error);
            alert("Failed to download QR code. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="modal modal-open" onClick={onClose}>
            <div
                className="modal-box dark:bg-gray-700 max-w-sm sm:max-w-md bg-white relative flex flex-col items-center py-5 md:py-8 px-4 sm:px-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button (X) at top right */}
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                >
                    <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                {/* QR Code at center top */}
                <div className="mb-4 sm:mb-6">
                    <img
                        src={qrModalData.qrCodeUrl}
                        alt="QR Code"
                        className="w-48 h-48 sm:w-64 sm:h-64 object-cover"
                    />
                </div>

                {/* Title below QR code */}
                <h3 className="font-semibold break-words text-base custom-primary-txt sm:text-lg text-center mb-4 sm:mb-6 px-2">
                    {qrModalData.title}
                </h3>

                {/* Download button at bottom */}
                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="custom-primary-btn p-2.5 sm:p-3 gap-2 text-xs sm:text-sm disabled:opacity-70 disabled:cursor-not-allowed w-auto"
                >
                    {isDownloading ? (
                        <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Downloading...
                        </>
                    ) : (
                        <>
                            <Download size={18} className="sm:w-5 sm:h-5" />
                            Download QR Code
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default QRCodeModal;
