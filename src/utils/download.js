/**
 * Downloads a file from a URL using blob conversion
 * @param {string} url - The URL of the file to download
 * @param {string} filename - The desired filename for the download
 * @returns {Promise<void>}
 * @throws {Error} If the download fails
 */
export const downloadFile = async (url, filename) => {
    try {
        // Fetch the file as a blob
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }
        const blob = await response.blob();

        // Create a temporary URL for the blob
        const blobUrl = window.URL.createObjectURL(blob);

        // Create a temporary anchor element to trigger download
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error("Failed to download file:", error);
        throw error;
    }
};

/**
 * Helper function to sanitize a string for use as a filename
 * @param {string} text - The text to sanitize
 * @returns {string} - Sanitized filename-safe string
 */
export const sanitizeFilename = (text) => {
    return text.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};


// import bcrypt from "bcrypt";

// async function generateHash() {
//     const password = "Russel-08";
//     const hash = await bcrypt.hash(password, 10);
//     console.log("Password:", password);
//     console.log("Hashed:", hash);
// }

// generateHash();