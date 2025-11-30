import { Plus, X, Copy } from "lucide-react";
import { useState } from "react";

const QuestionEditor = ({ question, questionTypes, onUpdate }) => {
    const questionType = questionTypes.find((qt) => qt.id === question.type_id);
    const typeName = questionType?.name;

    const getDefaultMetadata = (type) => {
        const defaults = {
            short_answer: { placeholder: "" },
            paragraph: { placeholder: "" },
            multiple_choice: {
                options: [{ id: Date.now(), text: "Option 1" }],
                shuffleOptions: false,
            },
            checkboxes: {
                options: [{ id: Date.now(), text: "Option 1" }],
                shuffleOptions: false,
            },
            dropdown: {
                options: [{ id: Date.now(), text: "Option 1" }],
                shuffleOptions: false,
            },
            linear_scale: {
                min: 1,
                max: 5,
                step: 1,
                minLabel: "",
                maxLabel: "",
            },
            multiple_choice_grid: {
                rows: [{ id: Date.now(), text: "Row 1" }],
                columns: [{ id: Date.now() + 1, text: "Column 1" }],
                requireOnePerRow: false,
                shuffleRows: false,
            },
            checkbox_grid: {
                rows: [{ id: Date.now(), text: "Row 1" }],
                columns: [{ id: Date.now() + 1, text: "Column 1" }],
                shuffleRows: false,
            },
            date: {},
            time: {},
        };
        return defaults[type] || {};
    };

    // Get defaults for the question type
    const defaultMetadata = getDefaultMetadata(typeName);
    // Merge defaults with existing metadata, ensuring all required properties exist
    const metadata = {
        ...defaultMetadata,
        ...(question.metadata || {}),
    };

    const updateMetadata = (newMetadata) => {
        onUpdate({ ...question, metadata: newMetadata });
    };

    const updateOption = (optionId, newText, arrayKey = "options") => {
        const currentArray = metadata[arrayKey] || [];
        const updated = currentArray.map((opt) =>
            opt.id === optionId ? { ...opt, text: newText } : opt
        );
        updateMetadata({ ...metadata, [arrayKey]: updated });
    };

    const addOption = (arrayKey = "options", label = "Option") => {
        const currentArray = metadata[arrayKey] || [];
        const newItem = {
            id: Date.now(),
            text: `${label} ${currentArray.length + 1}`,
        };
        updateMetadata({
            ...metadata,
            [arrayKey]: [...currentArray, newItem],
        });
    };

    const duplicateOption = (optionId, arrayKey = "options") => {
        const currentArray = metadata[arrayKey] || [];
        const index = currentArray.findIndex((opt) => opt.id === optionId);
        const original = currentArray[index];
        const duplicate = { id: Date.now(), text: `${original.text} (copy)` };
        const updated = [...currentArray];
        updated.splice(index + 1, 0, duplicate);
        updateMetadata({ ...metadata, [arrayKey]: updated });
    };

    const removeOption = (optionId, arrayKey = "options") => {
        const currentArray = metadata[arrayKey] || [];
        const updated = currentArray.filter((opt) => opt.id !== optionId);
        updateMetadata({ ...metadata, [arrayKey]: updated });
    };

    const renderEditor = () => {
        switch (typeName) {
            case "short_answer":
            case "paragraph":
                return (
                    <div className="space-y-3">
                        {typeName === "short_answer" ? (
                            <input
                                type="text"
                                placeholder={
                                    metadata.placeholder || "Short answer text"
                                }
                                disabled
                                className="w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-sm custom-sec-txt italic"
                            />
                        ) : (
                            <textarea
                                placeholder={
                                    metadata.placeholder || "Long answer text"
                                }
                                disabled
                                rows={3}
                                className="w-full p-2 border-b-2 border-gray-300 dark:border-gray-600 bg-transparent text-sm custom-sec-txt italic resize-none"
                            />
                        )}
                        <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <label className="flex items-center gap-2 text-xs custom-primary-txt">
                                <span className="w-24">Placeholder:</span>
                                <input
                                    type="text"
                                    value={metadata.placeholder}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            placeholder: e.target.value,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs"
                                />
                            </label>
                        </div>
                    </div>
                );

            case "multiple_choice":
            case "checkboxes":
            case "dropdown":
                return (
                    <div className="space-y-3">
                        <div className="space-y-2">
                            {metadata.options?.map((option, index) => (
                                <div
                                    key={option.id}
                                    className="flex items-center gap-2"
                                >
                                    {typeName === "multiple_choice" ? (
                                        <div className="w-4 h-4 rounded-full border-2 border-gray-400 dark:border-gray-500 flex-shrink-0" />
                                    ) : typeName === "checkboxes" ? (
                                        <div className="w-4 h-4 rounded border-2 border-gray-400 dark:border-gray-500 flex-shrink-0" />
                                    ) : (
                                        <span className="text-xs text-gray-500 w-6">
                                            {index + 1}.
                                        </span>
                                    )}
                                    <input
                                        type="text"
                                        value={option.text}
                                        onChange={(e) =>
                                            updateOption(
                                                option.id,
                                                e.target.value
                                            )
                                        }
                                        placeholder={`Option ${index + 1}`}
                                        className="flex-1 dark:text-white px-2 py-1 border-b border-gray-300 dark:border-gray-600 bg-transparent text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                    <button
                                        onClick={() =>
                                            duplicateOption(option.id)
                                        }
                                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 p-1"
                                        title="Duplicate"
                                    >
                                        <Copy size={14} />
                                    </button>
                                    {metadata.options.length > 1 && (
                                        <button
                                            onClick={() =>
                                                removeOption(option.id)
                                            }
                                            className="text-red-500 hover:text-red-600 p-1"
                                            title="Delete"
                                        >
                                            <X size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                onClick={() => addOption("options", "Option")}
                                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 pl-6"
                            >
                                <Plus size={16} />
                                <span>Add option</span>
                            </button>
                        </div>
                        <div className="flex gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                            <label className="flex dark:text-white items-center gap-2 text-xs cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={metadata.shuffleOptions}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            shuffleOptions: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4"
                                />
                                <span>Shuffle options</span>
                            </label>
                        </div>
                    </div>
                );

            case "linear_scale":
                // Ensure we have valid default values
                const min = metadata.min ?? 1;
                const max = metadata.max ?? 5;
                const step = metadata.step ?? 1;
                const minLabel = metadata.minLabel ?? "";
                const maxLabel = metadata.maxLabel ?? "";

                return (
                    <div className="space-y-3 dark:text-white">
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center gap-2 text-xs">
                                <span className="w-16">Min:</span>
                                <input
                                    type="number"
                                    value={min}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            min: Number(e.target.value) || 1,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs"
                                />
                            </label>
                            <label className="flex items-center gap-2 text-xs">
                                <span className="w-16">Max:</span>
                                <input
                                    type="number"
                                    value={max}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            max: Number(e.target.value) || 5,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs"
                                />
                            </label>
                            <label className="flex items-center gap-2 text-xs">
                                <span className="w-16">Step:</span>
                                <input
                                    type="number"
                                    value={step}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            step: Number(e.target.value) || 1,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs"
                                />
                            </label>
                            <div></div>
                            <label className="flex items-center gap-2 text-xs">
                                <span className="w-16">Min label:</span>
                                <input
                                    type="text"
                                    value={minLabel}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            minLabel: e.target.value,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs"
                                />
                            </label>
                            <label className="flex items-center gap-2 text-xs">
                                <span className="w-16">Max label:</span>
                                <input
                                    type="text"
                                    value={maxLabel}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            maxLabel: e.target.value,
                                        })
                                    }
                                    className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-xs"
                                />
                            </label>
                        </div>
                    </div>
                );

            case "multiple_choice_grid":
            case "checkbox_grid":
                return (
                    <div className="space-y-3">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border border-gray-300 dark:border-gray-600">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800">
                                        <th className="p-2 border border-gray-300 dark:border-gray-600"></th>
                                        {metadata.columns?.map((col) => (
                                            <th
                                                key={col.id}
                                                className="p-2 border border-gray-300 dark:border-gray-600 min-w-[120px]"
                                            >
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="text"
                                                        value={col.text}
                                                        onChange={(e) =>
                                                            updateOption(
                                                                col.id,
                                                                e.target.value,
                                                                "columns"
                                                            )
                                                        }
                                                        placeholder="Column"
                                                        className="flex-1 dark:text-white font-normal px-2 py-1 text-xs text-center rounded border border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-900"
                                                    />
                                                    {metadata.columns.length >
                                                        1 && (
                                                        <button
                                                            onClick={() =>
                                                                removeOption(
                                                                    col.id,
                                                                    "columns"
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    )}
                                                </div>
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {metadata.rows?.map((row) => (
                                        <tr key={row.id}>
                                            <td className="p-2 border border-gray-300 dark:border-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={row.text}
                                                        onChange={(e) =>
                                                            updateOption(
                                                                row.id,
                                                                e.target.value,
                                                                "rows"
                                                            )
                                                        }
                                                        placeholder="Row"
                                                        className="flex-1 font-normal dark:text-white px-2 py-1 text-xs rounded border border-gray-400 dark:border-gray-500 bg-gray-50 dark:bg-gray-900"
                                                    />
                                                    {metadata.rows.length >
                                                        1 && (
                                                        <button
                                                            onClick={() =>
                                                                removeOption(
                                                                    row.id,
                                                                    "rows"
                                                                )
                                                            }
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            {metadata.columns?.map((col) => (
                                                <td
                                                    key={col.id}
                                                    className="text-center p-2 border border-gray-300 dark:border-gray-600"
                                                >
                                                    {typeName ===
                                                    "multiple_choice_grid" ? (
                                                        <div className="w-4 h-4 rounded-full border-2 border-gray-400 dark:border-gray-500 mx-auto" />
                                                    ) : (
                                                        <div className="w-4 h-4 rounded border-2 border-gray-400 dark:border-gray-500 mx-auto" />
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => addOption("rows", "Row")}
                                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <Plus size={14} />
                                Add row
                            </button>
                            <button
                                onClick={() => addOption("columns", "Column")}
                                className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                <Plus size={14} />
                                Add column
                            </button>
                        </div>
                        <div className="flex gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                            {typeName === "multiple_choice_grid" && (
                                <label className="flex dark:text-white items-center gap-2 text-xs cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={metadata.requireOnePerRow}
                                        onChange={(e) =>
                                            updateMetadata({
                                                ...metadata,
                                                requireOnePerRow:
                                                    e.target.checked,
                                            })
                                        }
                                        className="w-4 h-4"
                                    />
                                    <span>Require one per row</span>
                                </label>
                            )}
                            <label className="flex dark:text-white items-center gap-2 text-xs cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={metadata.shuffleRows}
                                    onChange={(e) =>
                                        updateMetadata({
                                            ...metadata,
                                            shuffleRows: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4"
                                />
                                <span>Shuffle rows</span>
                            </label>
                        </div>
                    </div>
                );

            case "date":
                return (
                    <div className="py-4">
                        <input
                            type="date"
                            disabled
                            className="px-3 dark:text-white py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-sm"
                        />
                        <p className="text-xs custom-sec-txt mt-2 italic">
                            Date picker - no additional configuration needed
                        </p>
                    </div>
                );

            case "time":
                return (
                    <div className="py-4">
                        <input
                            type="time"
                            disabled
                            className="px-3 dark:text-white py-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-sm"
                        />
                        <p className="text-xs custom-sec-txt mt-2 italic">
                            Time picker - no additional configuration needed
                        </p>
                    </div>
                );

            default:
                return (
                    <div className="text-sm custom-sec-txt italic py-4">
                        Select a question type to configure
                    </div>
                );
        }
    };

    return <div className="space-y-3">{renderEditor()}</div>;
};

export default QuestionEditor;
