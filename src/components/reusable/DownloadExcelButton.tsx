import React from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

interface DownloadExcelButtonProps {
    data: any;
    fileName: string;
    sheetName?: string;
}

const DownloadExcelButton = ({
    data,
    fileName,
    sheetName = "Sheet1",
}: DownloadExcelButtonProps): React.JSX.Element => {
    const [isDownloading, setIsDownloading] = React.useState<boolean>(false);

    const handleDownload = (): void => {
        try {
            setIsDownloading(true);

            // Create worksheet from data
            const worksheet = XLSX.utils.json_to_sheet(data);

            // Create workbook and append worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

            // Generate Excel file and trigger download
            XLSX.writeFile(
                workbook,
                `${fileName}-${new Date().toISOString().split("T")[0]}.xlsx`
            );
        } catch (error) {
            console.error("Error downloading Excel:", error);
            alert("Failed to download Excel file. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download Excel"
        >
            {isDownloading ? (
                <span className="loading loading-spinner loading-xs"></span>
            ) : (
                <Download size={18} className="custom-primary-txt" />
            )}
        </button>
    );
};

export default DownloadExcelButton;
