export const downloadFile = async (url: string, filename: string) => {
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

export const sanitizeFilename = (text : string) => {
    return text.replace(/[^a-z0-9]/gi, "_").toLowerCase();
};