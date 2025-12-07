import React from "react";
import { Download } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface DownloadChartButtonProps {
    chartRef: React.RefObject<HTMLDivElement | null>;
    fileName: string;
    onExport?: () => Promise<void>;
}

const DownloadChartButton = ({
    chartRef,
    fileName,
    onExport,
}: DownloadChartButtonProps): React.JSX.Element => {
    const [isDownloading, setIsDownloading] = React.useState<boolean>(false);

    const handleDownload = async (): Promise<void> => {
        if (!chartRef.current) return;

        try {
            setIsDownloading(true);

            // If custom export function provided, use it
            if (onExport) {
                await onExport();
                return;
            }

            const canvas = await html2canvas(chartRef.current, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
                onclone: (clonedDoc) => {
                    // Remove all stylesheets that contain oklch colors
                    const styleElements = clonedDoc.querySelectorAll(
                        "style, link[rel='stylesheet']"
                    );
                    styleElements.forEach((style) => style.remove());

                    // Apply computed styles as inline styles with light mode colors
                    const allElements = clonedDoc.querySelectorAll("*");
                    allElements.forEach((el) => {
                        if (el instanceof HTMLElement) {
                            // Find corresponding original element
                            const xpath = getXPath(el);
                            const originalElement = document.evaluate(
                                xpath,
                                document,
                                null,
                                XPathResult.FIRST_ORDERED_NODE_TYPE,
                                null
                            ).singleNodeValue as HTMLElement;

                            if (originalElement) {
                                const computed =
                                    window.getComputedStyle(originalElement);

                                // Override colors for light background (PDF)
                                // Force text colors to black for readability
                                if (computed.color) {
                                    const colorValue = computed.color;
                                    // If color is white/light (for dark mode), change to black
                                    if (
                                        colorValue.includes("255, 255, 255") ||
                                        colorValue.includes("oklch")
                                    ) {
                                        el.style.color = "#000000";
                                    } else {
                                        el.style.color = colorValue;
                                    }
                                }

                                // Background colors
                                if (computed.backgroundColor) {
                                    const bgColor = computed.backgroundColor;
                                    if (bgColor.includes("oklch")) {
                                        el.style.backgroundColor = "#ffffff";
                                    } else {
                                        el.style.backgroundColor = bgColor;
                                    }
                                }

                                // Border colors
                                if (computed.borderColor) {
                                    const borderColor = computed.borderColor;
                                    if (borderColor.includes("oklch")) {
                                        el.style.borderColor = "#e5e5e5";
                                    } else {
                                        el.style.borderColor = borderColor;
                                    }
                                }
                            }
                        }
                    });

                    // Override canvas text colors for chart.js charts
                    const canvasElements = clonedDoc.querySelectorAll("canvas");
                    canvasElements.forEach((canvas) => {
                        if (canvas instanceof HTMLCanvasElement) {
                            const ctx = canvas.getContext("2d");
                            if (ctx) {
                                // Force text to black
                                ctx.fillStyle = "#000000";
                                ctx.strokeStyle = "#000000";
                            }
                        }
                    });
                },
            });

            // Convert to PDF
            const imgWidth = 210; // A4 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const pdf = new jsPDF("p", "mm", "a4");
            const imgData = canvas.toDataURL("image/png");

            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(
                `${fileName}-${new Date().toISOString().split("T")[0]}.pdf`
            );
        } catch (error) {
            console.error("Error downloading chart:", error);
            alert("Failed to download chart. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    // Helper function to get XPath of an element
    const getXPath = (element: Element): string => {
        if (element.id) {
            return `//*[@id="${element.id}"]`;
        }
        if (element === document.body) {
            return "/html/body";
        }
        let ix = 0;
        const siblings =
            element.parentNode?.children || ([] as unknown as HTMLCollection);
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element) {
                return (
                    getXPath(element.parentNode as Element) +
                    "/" +
                    element.tagName.toLowerCase() +
                    "[" +
                    (ix + 1) +
                    "]"
                );
            }
            if (sibling.tagName === element.tagName) {
                ix++;
            }
        }
        return "";
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download Chart"
        >
            {isDownloading ? (
                <span className="loading loading-spinner loading-xs"></span>
            ) : (
                <Download size={18} className="custom-primary-txt" />
            )}
        </button>
    );
};

export default DownloadChartButton;
