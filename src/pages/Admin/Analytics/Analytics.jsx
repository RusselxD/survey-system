import React from "react";

const Analytics = () => {
    return (
        <div className="p-0 sm:p-1 md:p-3 lg:p-8 dark:bg-base-100 bg-gray-100/70 flex-1 custom-primary-txt">
            1. Response Time Analysis ✅ (You already have this) Chart Type:
            Histogram / Distribution Chart What it shows: Distribution of
            completion times Peak completion time ranges Outliers (too fast =
            suspicious, too slow = abandoned)
            {/* Example visualization: */}
            {/* ┌─────────────────────────────────────┐
│ Response Time Distribution          │
│                                     │
│     ▂▅█▆▃▂                         │
│   ▂█████████▅▃▂▁                   │
│ ▁▃███████████████▆▄▂▁              │
├─────────────────────────────────┤
│ <1  1-3  3-5  5-10  10-15  15+ min │
└─────────────────────────────────────┘──── */}
        </div>
    );
};

export default Analytics;
