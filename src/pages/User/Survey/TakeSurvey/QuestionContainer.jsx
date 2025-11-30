import React, { useState, useRef } from "react";

const QuestionContainer = ({ survey }) => {
    const [responses, setResponses] = useState({});
    const [errors, setErrors] = useState({});
    // Store shuffled orders to prevent re-shuffling on re-renders
    const shuffledOrders = useRef({});

    if (!survey) return null;

    const handleResponseChange = (
        questionId,
        questionType,
        value,
        metadata = null
    ) => {
        let formattedResponse;

        // Simple types: answer in answer field, metadata is null
        if (
            ["short_answer", "paragraph", "time", "date"].includes(questionType)
        ) {
            formattedResponse = {
                answer: value,
                metadata: null,
            };
        } else {
            // Complex types: answer is null, metadata is JSON string
            formattedResponse = {
                answer: null,
                metadata: metadata ? JSON.stringify(metadata) : null,
            };
        }

        setResponses((prev) => ({
            ...prev,
            [questionId]: formattedResponse,
        }));
        // Clear error when user provides input
        if (errors[questionId]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[questionId];
                return newErrors;
            });
        }
    };

    const validateAndSubmit = () => {
        const newErrors = {};

        // Validate name if required
        if (survey.askName && !responses.name?.trim()) {
            newErrors.name = "Name is required";
        }

        // Validate email if required
        if (survey.askEmail && !responses.email?.trim()) {
            newErrors.email = "Email is required";
        } else if (
            survey.askEmail &&
            responses.email &&
            !isValidEmail(responses.email)
        ) {
            newErrors.email = "Please enter a valid email";
        }

        // Validate required questions
        survey.questions.forEach((question) => {
            if (question.required) {
                const response = responses[question.id];
                const isSimpleType = [
                    "short_answer",
                    "paragraph",
                    "time",
                    "date",
                ].includes(question.typeName);

                if (!response) {
                    newErrors[question.id] = "This question is required";
                } else if (isSimpleType && !response.answer?.trim()) {
                    newErrors[question.id] = "This question is required";
                } else if (!isSimpleType && !response.metadata) {
                    newErrors[question.id] = "This question is required";
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Scroll to first error
            const firstErrorKey = Object.keys(newErrors)[0];
            document
                .getElementById(`question-${firstErrorKey}`)
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            return;
        }

        // Submit survey
        console.log("Survey responses:", responses);
        // TODO: Call API to submit responses
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const parseMetadata = (metadataString) => {
        if (!metadataString) return null;
        try {
            return JSON.parse(metadataString);
        } catch (e) {
            return null;
        }
    };

    const getShuffledOptions = (questionId, options, shouldShuffle) => {
        if (!shouldShuffle || !options) return options;

        // If we haven't shuffled this question yet, create and store the shuffled order
        if (!shuffledOrders.current[questionId]) {
            shuffledOrders.current[questionId] = [...options].sort(
                () => Math.random() - 0.5
            );
        }
        return shuffledOrders.current[questionId];
    };

    const getShuffledRows = (questionId, rows, shouldShuffle) => {
        if (!shouldShuffle || !rows) return rows;

        // If we haven't shuffled this question yet, create and store the shuffled order
        if (!shuffledOrders.current[`${questionId}-rows`]) {
            shuffledOrders.current[`${questionId}-rows`] = [...rows].sort(
                () => Math.random() - 0.5
            );
        }
        return shuffledOrders.current[`${questionId}-rows`];
    };

    const renderQuestion = (question) => {
        const metadata = question.metadata ? JSON.parse(question.metadata) : {};
        const questionId = question.id;

        switch (question.typeName) {
            case "short_answer":
                return (
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600"
                        placeholder={metadata.placeholder || "Your answer"}
                        value={responses[questionId]?.answer || ""}
                        onChange={(e) =>
                            handleResponseChange(
                                questionId,
                                "short_answer",
                                e.target.value
                            )
                        }
                    />
                );

            case "paragraph":
                return (
                    <textarea
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600 min-h-[120px]"
                        placeholder={metadata.placeholder || "Your answer"}
                        value={responses[questionId]?.answer || ""}
                        onChange={(e) =>
                            handleResponseChange(
                                questionId,
                                "paragraph",
                                e.target.value
                            )
                        }
                    />
                );

            case "multiple_choice":
                const mcOptions = getShuffledOptions(
                    questionId,
                    metadata.options,
                    metadata.shuffleOptions
                );
                const mcResponse = responses[questionId];
                const mcMetadata = parseMetadata(mcResponse?.metadata);
                const selectedMcOptionId = mcMetadata?.selectedOptionId || null;

                return (
                    <div className="space-y-2">
                        {mcOptions.map((option) => (
                            <label
                                key={option.id}
                                className="flex items-center space-x-3 cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    name={`question-${questionId}`}
                                    value={option.text}
                                    checked={selectedMcOptionId === option.id}
                                    onChange={() => {
                                        handleResponseChange(
                                            questionId,
                                            "multiple_choice",
                                            null,
                                            { selectedOptionId: option.id }
                                        );
                                    }}
                                    className="w-4 h-4"
                                />
                                <span>{option.text}</span>
                            </label>
                        ))}
                    </div>
                );

            case "checkboxes":
                const cbOptions = getShuffledOptions(
                    questionId,
                    metadata.options,
                    metadata.shuffleOptions
                );
                const cbResponse = responses[questionId];
                const cbMetadata = parseMetadata(cbResponse?.metadata);
                const selectedOptionIds = cbMetadata?.selectedOptionIds || [];

                return (
                    <div className="space-y-2">
                        {cbOptions.map((option) => (
                            <label
                                key={option.id}
                                className="flex items-center space-x-3 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedOptionIds.includes(
                                        option.id
                                    )}
                                    onChange={(e) => {
                                        const newOptionIds = e.target.checked
                                            ? [...selectedOptionIds, option.id]
                                            : selectedOptionIds.filter(
                                                  (id) => id !== option.id
                                              );
                                        handleResponseChange(
                                            questionId,
                                            "checkboxes",
                                            null,
                                            { selectedOptionIds: newOptionIds }
                                        );
                                    }}
                                    className="w-4 h-4"
                                />
                                <span>{option.text}</span>
                            </label>
                        ))}
                    </div>
                );

            case "dropdown":
                const dropdownOptions = getShuffledOptions(
                    questionId,
                    metadata.options,
                    metadata.shuffleOptions
                );
                const dropdownResponse = responses[questionId];
                const dropdownMetadata = parseMetadata(
                    dropdownResponse?.metadata
                );
                const selectedDropdownOptionId =
                    dropdownMetadata?.selectedOptionId || null;

                return (
                    <div className="space-y-2">
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600"
                            value={
                                selectedDropdownOptionId
                                    ? dropdownOptions.find(
                                          (opt) =>
                                              opt.id ===
                                              selectedDropdownOptionId
                                      )?.text || ""
                                    : ""
                            }
                            onChange={(e) => {
                                const selectedOption = dropdownOptions.find(
                                    (opt) => opt.text === e.target.value
                                );
                                if (selectedOption) {
                                    handleResponseChange(
                                        questionId,
                                        "dropdown",
                                        null,
                                        { selectedOptionId: selectedOption.id }
                                    );
                                }
                            }}
                        >
                            <option value="">Choose...</option>
                            {dropdownOptions.map((option) => (
                                <option key={option.id} value={option.text}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                    </div>
                );

            case "linear_scale":
                const scale = [];
                for (
                    let i = metadata.min;
                    i <= metadata.max;
                    i += metadata.step
                ) {
                    scale.push(i);
                }
                const linearScaleResponse = responses[questionId];
                const linearScaleMetadata = parseMetadata(
                    linearScaleResponse?.metadata
                );
                const selectedScaleValue = linearScaleMetadata?.value || null;

                return (
                    <div className="space-y-3">
                        <div className="flex justify-between items-center gap-2">
                            {scale.map((value) => (
                                <label
                                    key={value}
                                    className="flex flex-col items-center cursor-pointer"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${questionId}`}
                                        value={value}
                                        checked={selectedScaleValue === value}
                                        onChange={() =>
                                            handleResponseChange(
                                                questionId,
                                                "linear_scale",
                                                null,
                                                { value: value }
                                            )
                                        }
                                        className="w-4 h-4 mb-1"
                                    />
                                    <span className="text-sm">{value}</span>
                                </label>
                            ))}
                        </div>
                        {(metadata.minLabel || metadata.maxLabel) && (
                            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>{metadata.minLabel}</span>
                                <span>{metadata.maxLabel}</span>
                            </div>
                        )}
                    </div>
                );

            case "multiple_choice_grid":
                const mcGridRows = getShuffledRows(
                    questionId,
                    metadata.rows,
                    metadata.shuffleRows
                );
                const mcGridResponse = responses[questionId];
                const gridResponses =
                    parseMetadata(mcGridResponse?.metadata) || {};

                return (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border dark:border-gray-600 p-2"></th>
                                    {metadata.columns.map((col) => (
                                        <th
                                            key={col.id}
                                            className="border dark:border-gray-600 p-2 text-sm"
                                        >
                                            {col.text}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {mcGridRows.map((row) => (
                                    <tr key={row.id}>
                                        <td className="border dark:border-gray-600 p-2 font-medium">
                                            {row.text}
                                        </td>
                                        {metadata.columns.map((col) => (
                                            <td
                                                key={col.id}
                                                className="border dark:border-gray-600 p-2 text-center"
                                            >
                                                <input
                                                    type="radio"
                                                    name={`grid-${questionId}-${row.id}`}
                                                    checked={
                                                        gridResponses[
                                                            row.id
                                                        ] === col.id
                                                    }
                                                    onChange={() => {
                                                        const newGridResponses =
                                                            {
                                                                ...gridResponses,
                                                                [row.id]:
                                                                    col.id,
                                                            };
                                                        handleResponseChange(
                                                            questionId,
                                                            "multiple_choice_grid",
                                                            null,
                                                            newGridResponses
                                                        );
                                                    }}
                                                    className="w-4 h-4"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "checkbox_grid":
                const cbGridRows = getShuffledRows(
                    questionId,
                    metadata.rows,
                    metadata.shuffleRows
                );
                const cbGridResponse = responses[questionId];
                const cbGridResponses =
                    parseMetadata(cbGridResponse?.metadata) || {};

                return (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border dark:border-gray-600 p-2"></th>
                                    {metadata.columns.map((col) => (
                                        <th
                                            key={col.id}
                                            className="border dark:border-gray-600 p-2 text-sm"
                                        >
                                            {col.text}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cbGridRows.map((row) => (
                                    <tr key={row.id}>
                                        <td className="border dark:border-gray-600 p-2 font-medium">
                                            {row.text}
                                        </td>
                                        {metadata.columns.map((col) => (
                                            <td
                                                key={col.id}
                                                className="border dark:border-gray-600 p-2 text-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={cbGridResponses[
                                                        row.id
                                                    ]?.includes(col.id)}
                                                    onChange={(e) => {
                                                        const rowSelections =
                                                            cbGridResponses[
                                                                row.id
                                                            ] || [];
                                                        const newRowSelections =
                                                            e.target.checked
                                                                ? [
                                                                      ...rowSelections,
                                                                      col.id,
                                                                  ]
                                                                : rowSelections.filter(
                                                                      (id) =>
                                                                          id !==
                                                                          col.id
                                                                  );
                                                        const newCbGridResponses =
                                                            {
                                                                ...cbGridResponses,
                                                                [row.id]:
                                                                    newRowSelections,
                                                            };
                                                        handleResponseChange(
                                                            questionId,
                                                            "checkbox_grid",
                                                            null,
                                                            newCbGridResponses
                                                        );
                                                    }}
                                                    className="w-4 h-4"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );

            case "date":
                return (
                    <input
                        type="date"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600"
                        value={responses[questionId]?.answer || ""}
                        onChange={(e) =>
                            handleResponseChange(
                                questionId,
                                "date",
                                e.target.value
                            )
                        }
                    />
                );

            case "time":
                return (
                    <input
                        type="time"
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600"
                        value={responses[questionId]?.answer || ""}
                        onChange={(e) =>
                            handleResponseChange(
                                questionId,
                                "time",
                                e.target.value
                            )
                        }
                    />
                );

            default:
                return (
                    <p className="text-gray-500">
                        Unsupported question type: {question.typeName}
                    </p>
                );
        }
    };

    return (
        <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[50%] space-y-4">
            {/* Name Field */}
            {survey.askName && (
                <div
                    id="question-name"
                    className="p-6 dark:bg-base-300 bg-white rounded-lg"
                >
                    <label className="block mb-2 font-medium">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600"
                        placeholder="Your name"
                        value={responses.name || ""}
                        onChange={(e) =>
                            handleResponseChange("name", e.target.value)
                        }
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>
            )}

            {/* Email Field */}
            {survey.askEmail && (
                <div
                    id="question-email"
                    className="p-6 dark:bg-base-300 bg-white rounded-lg"
                >
                    <label className="block mb-2 font-medium">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-base-100 dark:border-gray-600"
                        placeholder="your.email@example.com"
                        value={responses.email || ""}
                        onChange={(e) =>
                            handleResponseChange("email", e.target.value)
                        }
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email}
                        </p>
                    )}
                </div>
            )}

            {/* Questions */}
            {survey.questions.map((question, index) => (
                <div
                    key={question.id}
                    id={`question-${question.id}`}
                    className="p-6 dark:bg-base-300 bg-white rounded-lg"
                >
                    <div className="mb-4">
                        <h3 className="text-lg font-medium">
                            {index + 1}. {question.text}
                            {question.required && (
                                <span className="text-red-500 ml-1">*</span>
                            )}
                        </h3>
                    </div>
                    {renderQuestion(question)}
                    {errors[question.id] && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors[question.id]}
                        </p>
                    )}
                </div>
            ))}

            {/* Submit Button */}
            <div className="p-6 dark:bg-base-300 bg-white rounded-lg">
                <button
                    onClick={validateAndSubmit}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                    Submit Survey
                </button>
            </div>
        </div>
    );
};

export default QuestionContainer;
