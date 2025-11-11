

export const formatDate = (date) => {
    return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
    });
};

export const getCurrentWeek = () => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 6);
    const currentWeek = `${formatDate(sevenDaysAgo)} - ${formatDate(today)}`;
    return { today, currentWeek };
};

export const getMainMetricsData = () => {
    // function call that fetches and returns main metrics data
    // await fetchWithAuth('/api/dashboard/data');

    // mock data
    return {
        totalSurveys: (2562262300).toLocaleString(),
        totalResponses: (123867000).toLocaleString(),
        avgSatisfaction: `${(4.2).toFixed(1)}/5`,
        completionRate: `${(98).toFixed(0)}%`,
        netPromoterScore: 90,
        csat: `${(90).toFixed(0)}%`,
    };
};

export const getSatisfactionInsightsData = () => {
    // function call that fetches and returns main metrics data

    // mock data
    return {
        location: {
            best: "New York",
            worst: "Los Angeles",
            bestScore: 4.8,
            worstScore: 3.5,
        },
        serviceType: {
            best: "Premium",
            worst: "Basic",
            bestScore: 4.9,
            worstScore: 3.2,
        },
    };
};

export const getResponseInsightsData = () => {
    // function call that fetches and returns main metrics data

    // mock data
    return {
        peakHours: "1-2 AM",
        peakHoursAvgResponses: 38,
        trend: 0.5,
    };
};
