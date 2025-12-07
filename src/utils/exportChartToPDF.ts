import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ExportChartToPDFOptions {
    chartRef: React.RefObject<HTMLDivElement | null>;
    fileName: string;
    title: string;
    subtitle?: string;
    additionalDetails?: Array<{ label: string; value: string | number }>;
}

export const exportChartToPDF = async ({
    chartRef,
    fileName,
    title,
    subtitle,
    additionalDetails,
}: ExportChartToPDFOptions): Promise<void> => {
    if (!chartRef.current) {
        throw new Error("Chart reference is not available");
    }

    // Store original width
    const originalWidth = chartRef.current.style.width;

    // Temporarily set chart to a wider width for better PDF quality
    chartRef.current.style.width = "1400px";

    // Wait for chart to re-render with new width
    await new Promise((resolve) => setTimeout(resolve, 300));

    const canvas = await html2canvas(chartRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
            // Remove all stylesheets that might contain oklch colors
            const styleElements = clonedDoc.querySelectorAll(
                "style, link[rel='stylesheet']"
            );
            styleElements.forEach((style) => style.remove());

            // Apply inline styles to override any problematic colors
            const allElements = clonedDoc.querySelectorAll("*");
            allElements.forEach((el) => {
                if (el instanceof HTMLElement) {
                    const computed = window.getComputedStyle(el);

                    // Force safe colors
                    if (computed.backgroundColor) {
                        const bg = computed.backgroundColor;
                        if (bg.includes("oklch")) {
                            el.style.backgroundColor = "#ffffff";
                        } else {
                            el.style.backgroundColor = bg;
                        }
                    }

                    if (computed.color) {
                        const color = computed.color;
                        if (color.includes("oklch")) {
                            el.style.color = "#000000";
                        } else {
                            el.style.color = color;
                        }
                    }

                    if (computed.borderColor) {
                        const border = computed.borderColor;
                        if (border.includes("oklch")) {
                            el.style.borderColor = "#e5e5e5";
                        } else {
                            el.style.borderColor = border;
                        }
                    }
                }
            });
        },
    });

    // PDF dimensions (A4)
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Margins and spacing
    const topMargin = 15;
    const bottomMargin = 15;
    const sideMargin = 10; // Small padding for chart
    const contentWidth = pageWidth - 2 * sideMargin;

    // Add title
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    const titleLines = pdf.splitTextToSize(title, pageWidth - 30);
    let yPosition = topMargin + 10;

    titleLines.forEach((line: string) => {
        const titleWidth = pdf.getTextWidth(line);
        const titleX = (pageWidth - titleWidth) / 2;
        pdf.text(line, titleX, yPosition);
        yPosition += 8;
    });

    // Add subtitle if provided
    if (subtitle) {
        pdf.setFontSize(12);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(100, 100, 100);
        const subtitleLines = pdf.splitTextToSize(subtitle, pageWidth - 30);

        subtitleLines.forEach((line: string) => {
            const subtitleWidth = pdf.getTextWidth(line);
            const subtitleX = (pageWidth - subtitleWidth) / 2;
            pdf.text(line, subtitleX, yPosition);
            yPosition += 6;
        });

        pdf.setTextColor(0, 0, 0); // Reset to black
    }

    yPosition += 5; // Space before chart

    // Add horizontal line separator
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(sideMargin, yPosition, pageWidth - sideMargin, yPosition);

    yPosition += 10;

    // Add additional details if provided
    if (additionalDetails && additionalDetails.length > 0) {
        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(60, 60, 60);

        additionalDetails.forEach((detail) => {
            pdf.setFont("helvetica", "bold");
            pdf.text(`${detail.label}: `, sideMargin + 5, yPosition);

            const labelWidth = pdf.getTextWidth(`${detail.label}: `);
            pdf.setFont("helvetica", "normal");
            pdf.text(
                String(detail.value),
                sideMargin + 5 + labelWidth,
                yPosition
            );

            yPosition += 6;
        });

        yPosition += 5;

        // Add another separator after details
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.line(sideMargin, yPosition, pageWidth - sideMargin, yPosition);

        yPosition += 10;
    }

    // Calculate chart dimensions to fit in remaining space
    const availableHeight = pageHeight - yPosition - bottomMargin;
    const imgData = canvas.toDataURL("image/png");

    // Calculate scaled dimensions maintaining aspect ratio
    const canvasAspectRatio = canvas.width / canvas.height;
    let imgWidth = contentWidth; // Use full width with small side margins
    let imgHeight = imgWidth / canvasAspectRatio;

    // If image is too tall, scale it down
    if (imgHeight > availableHeight) {
        imgHeight = availableHeight;
        imgWidth = imgHeight * canvasAspectRatio;
    }

    // Position image with small side margin
    const imgX = sideMargin;

    // Add the chart image
    pdf.addImage(imgData, "PNG", imgX, yPosition, imgWidth, imgHeight);

    // Add footer with date and page number
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    pdf.setFontSize(9);
    pdf.setTextColor(128, 128, 128);
    pdf.text(`Generated on ${currentDate}`, sideMargin, pageHeight - 10);
    pdf.text("Page 1", pageWidth - sideMargin - 15, pageHeight - 10);

    // Save the PDF
    pdf.save(`${fileName}-${new Date().toISOString().split("T")[0]}.pdf`);

    // Restore original width
    if (chartRef.current) {
        chartRef.current.style.width = originalWidth;
    }
};
