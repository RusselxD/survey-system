import React from "react";

const Analytics = () => {
    return (
        <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1 custom-primary-txt">
            <p>[▼ Date Range] [▼ Location] [▼ Service Type] [Apply]</p>
            <h3>NPS Distribution</h3>
            <p>[Detailed pie chart with segments]</p>
            <h3>Response Time Analysis</h3>
            <p>[Detailed time distribution chart]</p>
            <h3>Location Performance</h3>
            <p>[Detailed horizontal bar chart by location]</p>
            <h3>Service Type Comparison</h3>
            <p>[Detailed horizontal bar chart by service]</p>
            <h3>Trend Analysis (30+ days)</h3>
            <p>[Long-term trend lines]</p>
            <h3>Text Feedback Analysis</h3>
            <p>[Word cloud, sentiment analysis]</p>
        </div>
    );
};

export default Analytics;
