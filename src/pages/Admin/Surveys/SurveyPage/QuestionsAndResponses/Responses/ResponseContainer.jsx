import React from "react";

const timeFormatter = (time) => {
    const date = new Date(time);

    const formatted = date.toLocaleString("en-US", {
        month: "short", // Dec
        day: "numeric", // 1
        year: "numeric", // 2024
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return formatted;
};

const ResponseContainer = ({ response, responseNumber }) => {
    return (
        <div className="dark:bg-base-300 py-5 px-6 rounded-md space-y-3 bg-white border dark:border-slate-700 border-gray-300">
            <div className="flex items-center gap-3">
                <h1 className="custom-primary-txt font-medium">
                    Response {responseNumber}
                </h1>
                <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                    Completed
                </span>
            </div>
            <p className="text-sm">
                <span className="dark:text-gray-400 text-gray-500">
                    Submitted:{" "}
                </span>
                <span className="custom-sec-txt">
                    {timeFormatter(response.submittedAt)}
                </span>
            </p>
            {response.respondentName && (
                <p className="text-sm">
                    <span className="dark:text-gray-400 text-gray-500">
                        Name:{" "}
                    </span>
                    <span className="custom-sec-txt">
                        {response.respondentName}
                    </span>
                </p>
            )}
            {response.respondentEmail && (
                <p className="text-sm">
                    <span className="dark:text-gray-400 text-gray-500">
                        Email:{" "}
                    </span>
                    <span className="custom-sec-txt">
                        {response.respondentEmail}
                    </span>
                </p>
            )}
            <p className="text-sm">
                <span className="dark:text-gray-400 text-gray-500">
                    Completion Time:{" "}
                </span>
                <span className="custom-sec-txt">
                    {response.completionTime}
                </span>
            </p>
        </div>
    );
};

export default ResponseContainer;
