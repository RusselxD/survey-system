// utils/qrCodeHelper.js
import QRCode from "qrcode";

export const generateQRCodeFile = async (text, options = {}) => {
    try {
        // Generate QR code as data URL
        const dataUrl = await QRCode.toDataURL(text, {
            width: options.width || 300,
            margin: options.margin || 2,
            color: {
                dark: options.darkColor || "#000000",
                light: options.lightColor || "#FFFFFF",
            },
            errorCorrectionLevel: options.errorCorrectionLevel || "M",
        });

        // Convert data URL to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Create File object (just like a regular file upload)
        const file = new File([blob], options.filename || "qrcode.png", {
            type: "image/png",
        });

        return file;
    } catch (error) {
        console.error("Error generating QR code:", error);
        throw error;
    }
};
