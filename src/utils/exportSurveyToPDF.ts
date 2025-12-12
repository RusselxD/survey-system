import { jsPDF } from "jspdf";

interface SurveyMainMetrics {
    totalViews: number;
    totalResponses: number;
    avgCompletionTimeInMinutes: number;
    responseRate: number;
    completionRate: number;
}

interface QuestionAnalytic {
    questionId: number;
    questionType: string;
    questionText: string;
    totalResponses?: number;
    responseRate?: number;
    averageRating?: number;
    options?: Array<{ option: string; count: number; percentage: number }>;
    [key: string]: any;
}

interface ExportSurveyToPDFOptions {
    title: string;
    description?: string;
    createdBy: string;
    updatedAt: string;
    locationName?: string;
    serviceTypeName?: string;
    mainMetrics: SurveyMainMetrics;
    questions: QuestionAnalytic[];
}

// Format question type for display
const formatQuestionType = (type: string): string => {
    return type
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const exportSurveyToPDF = ({
    title,
    description,
    createdBy,
    updatedAt,
    locationName,
    serviceTypeName,
    mainMetrics,
    questions,
}: ExportSurveyToPDFOptions): void => {
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;
    let yPosition = margin;

    // Pre-format date once
    const formattedDate = new Date(updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const checkPageBreak = (requiredSpace: number): void => {
        if (yPosition + requiredSpace > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
        }
    };

    // Set common text properties once
    const setHeaderStyle = () => {
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(0, 0, 0);
    };

    const setNormalStyle = () => {
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(60, 60, 60);
    };

    // Header
    pdf.setFontSize(18);
    setHeaderStyle();
    const titleLines = pdf.splitTextToSize(title, contentWidth);
    titleLines.forEach((line: string) => {
        checkPageBreak(10);
        pdf.text(line, margin, yPosition);
        yPosition += 10;
    });

    yPosition += 3;

    // Description
    if (description) {
        pdf.setFontSize(11);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(80, 80, 80);
        const descLines = pdf.splitTextToSize(description, contentWidth);
        descLines.forEach((line: string) => {
            checkPageBreak(6);
            pdf.text(line, margin, yPosition);
            yPosition += 6;
        });
        yPosition += 8;
    } else {
        yPosition += 3;
    }

    // Survey Details Section
    pdf.setFontSize(12);
    setHeaderStyle();
    checkPageBreak(8);
    pdf.text("Survey Details", margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);
    setNormalStyle();

    const details = [
        `Created by: ${createdBy}`,
        `Last updated: ${formattedDate}`,
    ];

    if (locationName) details.push(`Location: ${locationName}`);
    if (serviceTypeName) details.push(`Service Type: ${serviceTypeName}`);

    details.forEach((detail) => {
        checkPageBreak(6);
        pdf.text(detail, margin, yPosition);
        yPosition += 6;
    });

    yPosition += 10;

    // Survey Metrics Section
    pdf.setFontSize(12);
    setHeaderStyle();
    checkPageBreak(8);
    pdf.text("Survey Metrics", margin, yPosition);
    yPosition += 8;

    pdf.setFontSize(10);

    const metrics = [
        {
            label: "Total Views",
            value: mainMetrics.totalViews.toLocaleString(),
        },
        {
            label: "Responses",
            value: mainMetrics.totalResponses.toLocaleString(),
        },
        {
            label: "Avg. Duration",
            value: `${mainMetrics.avgCompletionTimeInMinutes.toFixed(1)} mins`,
        },
        {
            label: "Response Rate",
            value: `${mainMetrics.responseRate.toFixed(1)}%`,
        },
        {
            label: "Completion Rate",
            value: `${mainMetrics.completionRate.toFixed(1)}%`,
        },
    ];

    // Create a table-like layout for metrics
    const columnWidth = contentWidth / 2;
    let row = 0;

    metrics.forEach((metric, index) => {
        const isLeftColumn = index % 2 === 0;
        const xPos = isLeftColumn ? margin : margin + columnWidth + 5;

        if (index % 2 === 0 && index > 0) {
            row++;
            checkPageBreak(12);
        }

        const currentY = yPosition + row * 12;

        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(60, 60, 60);
        pdf.text(metric.label, xPos, currentY);

        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        pdf.text(metric.value, xPos, currentY + 5);
    });

    yPosition += (Math.ceil(metrics.length / 2) - 1) * 12 + 15;

    // Questions Section
    if (questions && questions.length > 0) {
        checkPageBreak(15);
        pdf.setFontSize(12);
        setHeaderStyle();
        pdf.text("Questions", margin, yPosition);
        yPosition += 10;

        questions.forEach((question, index) => {
            checkPageBreak(20);

            // Question number and text
            pdf.setFontSize(10);
            setHeaderStyle();
            const questionTitle = `Q${index + 1}. ${question.questionText}`;
            const questionLines = pdf.splitTextToSize(
                questionTitle,
                contentWidth
            );
            questionLines.forEach((line: string) => {
                checkPageBreak(6);
                pdf.text(line, margin, yPosition);
                yPosition += 6;
            });

            yPosition += 2;

            // Question type
            pdf.setFontSize(9);
            pdf.setFont("helvetica", "italic");
            pdf.setTextColor(100, 100, 100);
            checkPageBreak(5);
            pdf.text(
                `Type: ${formatQuestionType(question.questionType)}`,
                margin + 5,
                yPosition
            );
            yPosition += 5;

            // Question metrics
            pdf.setFont("helvetica", "normal");
            pdf.setTextColor(60, 60, 60);

            if (question.totalResponses !== undefined) {
                checkPageBreak(5);
                pdf.text(
                    `Total Responses: ${question.totalResponses}`,
                    margin + 5,
                    yPosition
                );
                yPosition += 5;
            }

            if (question.responseRate !== undefined) {
                checkPageBreak(5);
                pdf.text(
                    `Response Rate: ${question.responseRate.toFixed(1)}%`,
                    margin + 5,
                    yPosition
                );
                yPosition += 5;
            }

            if (question.averageRating !== undefined) {
                checkPageBreak(5);
                pdf.text(
                    `Average Rating: ${question.averageRating.toFixed(2)}`,
                    margin + 5,
                    yPosition
                );
                yPosition += 5;
            }

            // Options breakdown (for multiple choice, checkboxes, etc.)
            if (question.options && question.options.length > 0) {
                checkPageBreak(5);
                pdf.setFont("helvetica", "bold");
                pdf.text("Response Distribution:", margin + 5, yPosition);
                yPosition += 5;

                pdf.setFont("helvetica", "normal");
                question.options.forEach((option: any) => {
                    checkPageBreak(5);
                    const optionText = `  • ${option.option}: ${
                        option.count
                    } (${option.percentage.toFixed(1)}%)`;
                    pdf.text(optionText, margin + 10, yPosition);
                    yPosition += 5;
                });
            }

            // Linear Scale specific metrics
            if (
                question.questionType === "linear_scale" &&
                question.distribution &&
                question.distribution.length > 0
            ) {
                checkPageBreak(5);
                pdf.setFont("helvetica", "bold");
                pdf.text("Rating Distribution:", margin + 5, yPosition);
                yPosition += 5;

                pdf.setFont("helvetica", "normal");
                question.distribution.forEach((dist: any) => {
                    checkPageBreak(5);
                    pdf.text(
                        `  Rating ${dist.value}: ${
                            dist.count
                        } (${dist.percentage.toFixed(1)}%)`,
                        margin + 10,
                        yPosition
                    );
                    yPosition += 5;
                });
            }

            // Text/Paragraph specific metrics
            if (
                (question.questionType === "short_answer" ||
                    question.questionType === "paragraph") &&
                question.commonWords &&
                question.commonWords.length > 0
            ) {
                checkPageBreak(5);
                pdf.setFont("helvetica", "bold");
                pdf.text("Common Words:", margin + 5, yPosition);
                yPosition += 5;

                pdf.setFont("helvetica", "normal");
                const topWords = question.commonWords.slice(0, 10);
                topWords.forEach((wordData: any) => {
                    checkPageBreak(5);
                    pdf.text(
                        `  • ${wordData.word}: ${wordData.count} occurrences`,
                        margin + 10,
                        yPosition
                    );
                    yPosition += 5;
                });

                if (question.avgLength !== undefined) {
                    checkPageBreak(5);
                    pdf.text(
                        `Average Response Length: ${question.avgLength.toFixed(
                            0
                        )} characters`,
                        margin + 5,
                        yPosition
                    );
                    yPosition += 5;
                }
            }

            // Grid specific metrics (Multiple Choice Grid & Checkbox Grid)
            if (
                (question.questionType === "multiple_choice_grid" ||
                    question.questionType === "checkbox_grid") &&
                question.rowData &&
                question.rowData.length > 0
            ) {
                checkPageBreak(5);
                pdf.setFont("helvetica", "bold");
                pdf.text("Grid Responses:", margin + 5, yPosition);
                yPosition += 5;

                pdf.setFont("helvetica", "normal");
                question.rowData.forEach((row: any) => {
                    checkPageBreak(8);
                    pdf.setFont("helvetica", "bold");
                    pdf.setTextColor(60, 60, 60);
                    pdf.text(`  ${row.rowText}:`, margin + 10, yPosition);
                    yPosition += 5;

                    pdf.setFont("helvetica", "normal");
                    if (row.columns && question.columnHeaders) {
                        row.columns.forEach((col: any, colIdx: number) => {
                            if (col.count > 0) {
                                checkPageBreak(5);
                                const columnLabel =
                                    question.columnHeaders[colIdx] ||
                                    `Column ${colIdx + 1}`;
                                pdf.text(
                                    `    ${columnLabel}: ${
                                        col.count
                                    } (${col.rate.toFixed(1)}%)`,
                                    margin + 15,
                                    yPosition
                                );
                                yPosition += 5;
                            }
                        });
                    }
                });
            }

            // Date/Time specific metrics
            if (
                (question.questionType === "date" ||
                    question.questionType === "time") &&
                question.dateRange
            ) {
                checkPageBreak(5);
                pdf.setFont("helvetica", "bold");
                const isDate = question.questionType === "date";
                pdf.text(
                    isDate ? "Date Range:" : "Time Range:",
                    margin + 5,
                    yPosition
                );
                yPosition += 5;

                pdf.setFont("helvetica", "normal");
                if (isDate) {
                    if (question.dateRange.minDate) {
                        checkPageBreak(5);
                        pdf.text(
                            `  Earliest: ${new Date(
                                question.dateRange.minDate
                            ).toLocaleDateString()}`,
                            margin + 10,
                            yPosition
                        );
                        yPosition += 5;
                    }
                    if (question.dateRange.maxDate) {
                        checkPageBreak(5);
                        pdf.text(
                            `  Latest: ${new Date(
                                question.dateRange.maxDate
                            ).toLocaleDateString()}`,
                            margin + 10,
                            yPosition
                        );
                        yPosition += 5;
                    }
                } else {
                    if (question.dateRange.minTime) {
                        checkPageBreak(5);
                        pdf.text(
                            `  Earliest: ${question.dateRange.minTime}`,
                            margin + 10,
                            yPosition
                        );
                        yPosition += 5;
                    }
                    if (question.dateRange.maxTime) {
                        checkPageBreak(5);
                        pdf.text(
                            `  Latest: ${question.dateRange.maxTime}`,
                            margin + 10,
                            yPosition
                        );
                        yPosition += 5;
                    }
                }
            }

            yPosition += 8;
        });
    }

    // Footer on all pages
    const totalPages = pdf.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Generated on ${currentDate}`, margin, pageHeight - 10);
        pdf.text(
            `Page ${i} of ${totalPages}`,
            pageWidth - margin - 20,
            pageHeight - 10
        );
    }

    // Save PDF
    const fileName = `${title.replace(/[^a-z0-9]/gi, "-")}-Survey-Report-${
        new Date().toISOString().split("T")[0]
    }.pdf`;
    pdf.save(fileName);
};
