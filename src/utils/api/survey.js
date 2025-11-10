export const getSurveyData = (uuid) => {
    // function call that fetches and returns a single survey data

    // mock data
    // survey_version
    const survey = {
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        title: "Customer Satisfaction Survey 2025 Annual Report",
        description:
            "This survey aims to gather feedback from our customers regarding their satisfaction with our products and services over the past year. Your insights will help us improve and serve you better in the future.",
        location: "New York, USA",
        serviceType: "Online",
        published: "2025-10-15T09:30:00Z",
        version: "1",
        url: "https://example.com/surveys/customer-satisfaction-2025",
        qrCodeUrl:
            "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=Customer Satisfaction Survey 2025 Annual Report",
        metrics: [
            {
                title: "Total Responses",
                value: "150",
                borderColor: "border-l-blue-500",
            },
            {
                title: "Response Rate",
                value: "75%",
                borderColor: "border-l-green-500",
            },
            {
                title: "Avg Satisfaction",
                value: "4.2/5",
                borderColor: "border-l-yellow-500",
            },
            {
                title: "Completion Rate",
                value: "90%",
                borderColor: "border-l-purple-500",
            },
            {
                title: "NPS Score",
                value: "85",
                borderColor: "border-l-indigo-500",
            },
            { title: "CSAT", value: "88%", borderColor: "border-l-pink-500" },
        ],
    };

    return survey;
};
