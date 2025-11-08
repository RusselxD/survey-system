import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

// Chart.js safely ignores duplicate registrations, so we can register
// unconditionally without using internal registry APIs that differ between versions.
ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const NPSPieChart = () => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                },
            },
            title: {
                display: true,
                text: "Net Promoter Score (NPS) Distribution",
                font: {
                    size: 16,
                    weight: "bold",
                },
                padding: {
                    bottom: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.parsed;
                        const total = context.dataset.data.reduce(
                            (a, b) => a + b,
                            0
                        );
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value}% (${percentage}% of total)`;
                    },
                },
            },
        },
    };

    const npsData = {
        labels: ["Promoters (4-5)", "Passives (3)", "Detractors (1-2)"],
        datasets: [
            {
                data: [3, 2, 1],
                backgroundColor: [
                    "rgba(34, 197, 94, 0.8)", // Green for promoters
                    "rgba(253, 224, 71, 0.8)", // Yellow for passives
                    "rgba(239, 68, 68, 0.8)", // Red for detractors
                ],
                borderColor: [
                    "rgba(34, 197, 94, 1)",
                    "rgba(253, 224, 71, 1)",
                    "rgba(239, 68, 68, 1)",
                ],
                borderWidth: 2,
                hoverBackgroundColor: [
                    "rgba(34, 197, 94, 1)",
                    "rgba(253, 224, 71, 1)",
                    "rgba(239, 68, 68, 1)",
                ],
                hoverOffset: 8,
            },
        ],
    };

    return <Pie data={npsData} options={options} />;
};
