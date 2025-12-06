import React, { useEffect, useState } from "react";
import { settingsAPI } from "../../../utils/api/pages/settingsPage";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

interface LocationOrServiceType {
    id: number | string;
    name: string;
}

interface SettingsContainerProps {
    title: string;
    contents: LocationOrServiceType[];
    setContents: React.Dispatch<React.SetStateAction<LocationOrServiceType[]>>;
    originalContents: LocationOrServiceType[];
    handleCancelSubmit: () => void;
    handleSubmit: () => void;
    addItemsToBeDeleted: (id: number | string) => void;
    addItemsToBeAdded: (name: string) => void;
    addItemsToBeEdited: (id: number | string, newName: string) => void;
}

const SettingsContainer = ({
    title,
    contents,
    setContents,
    originalContents,
    handleCancelSubmit,
    handleSubmit,
    addItemsToBeDeleted,
    addItemsToBeAdded,
    addItemsToBeEdited,
}: SettingsContainerProps): React.JSX.Element => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingItemId, setEditingItemId] = useState<number | string | null>(
        null
    );
    const [editingValue, setEditingValue] = useState<string>("");
    const [newItemValue, setNewItemValue] = useState<string>("");

    const handleEditClick = (item: LocationOrServiceType) => {
        setEditingItemId(item.id);
        setEditingValue(item.name);
    };

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditingValue("");
    };

    const handleConfirmEdit = (id: number | string) => {
        // Update the displayed contents temporarily
        setContents((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, name: editingValue } : item
            )
        );
        // Add to edit list
        addItemsToBeEdited(id, editingValue);
        setEditingItemId(null);
        setEditingValue("");
    };

    const handleDeleteClick = (id: number | string) => {
        // Remove from displayed contents temporarily
        setContents((prev) => prev.filter((item) => item.id !== id));
        // Add to delete list
        addItemsToBeDeleted(id);
    };

    const handleCancel = () => {
        // Revert all changes
        setContents(originalContents);
        setIsEditing(false);
        setEditingItemId(null);
        setEditingValue("");
        setNewItemValue("");
        handleCancelSubmit();
    };

    const handleSubmitClick = () => {
        setIsEditing(false);
        setEditingItemId(null);
        setEditingValue("");
        setNewItemValue("");
        handleSubmit();
    };

    const handleAddItem = () => {
        if (newItemValue.trim()) {
            // Add to the displayed contents temporarily with a temporary ID
            const tempId = `temp_${Date.now()}`;
            setContents((prev) => [
                ...prev,
                { id: tempId, name: newItemValue },
            ]);
            // Add to the add list
            addItemsToBeAdded(newItemValue);
            setNewItemValue("");
        }
    };

    return (
        <div className="custom-container w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <h1 className="text-lg font-semibold custom-primary-txt mb-3">
                {title}
            </h1>
            <div className="grid grid-cols-4 gap-4">
                {contents.map((item) => {
                    const isEditingThisItem = editingItemId === item.id;

                    return (
                        <div
                            className="custom-primary-txt dark:bg-base-100 bg-gray-100 rounded-md px-4 py-3 flex items-center justify-between gap-2"
                            key={item.id}
                        >
                            {isEditingThisItem ? (
                                <input
                                    type="text"
                                    value={editingValue}
                                    onChange={(e) =>
                                        setEditingValue(e.target.value)
                                    }
                                    className="flex-1 bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 text-sm"
                                    autoFocus
                                />
                            ) : (
                                <span className="text-sm">{item.name}</span>
                            )}

                            {isEditing && (
                                <div className="flex items-center gap-1">
                                    {isEditingThisItem ? (
                                        <>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleConfirmEdit(item.id)
                                                }
                                                className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleEditClick(item)
                                                }
                                                className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(item.id)
                                                }
                                                className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Add new item input - only show in editing mode */}
                {isEditing && (
                    <div className="custom-primary-txt dark:bg-base-100 bg-gray-100 rounded-md px-4 py-3 flex items-center justify-between gap-2">
                        <input
                            type="text"
                            value={newItemValue}
                            onChange={(e) => setNewItemValue(e.target.value)}
                            placeholder="Add new item..."
                            className="flex-1 bg-transparent border-b border-gray-400 focus:outline-none focus:border-blue-500 text-sm"
                            onKeyPress={(
                                e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                                if (e.key === "Enter") {
                                    handleAddItem();
                                }
                            }}
                        />
                        <button
                            onClick={handleAddItem}
                            className="p-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
                            disabled={!newItemValue.trim()}
                        >
                            <Check className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
            <div className="flex justify-end gap-2 mt-2">
                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-6 text-sm rounded-md transition-colors"
                    >
                        Edit
                    </button>
                ) : (
                    <>
                        <button
                            onClick={handleCancel}
                            className="text-sm bg-gray-600 hover:bg-gray-700 text-white py-2 px-5 rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmitClick}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded-md transition-colors"
                        >
                            Submit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

interface LocationOrServiceTypeItem {
    id: number | string;
    name: string;
}

interface EditItem {
    id: number;
    name: string;
}

const LocationAndServiceTypeSettings = (): React.JSX.Element => {
    const { toastSuccess, toastError } = useAuth();

    const [locations, setLocations] = useState<LocationOrServiceTypeItem[]>([]);
    const [serviceTypes, setServiceTypes] = useState<
        LocationOrServiceTypeItem[]
    >([]);
    const [originalLocations, setOriginalLocations] = useState<
        LocationOrServiceTypeItem[]
    >([]);
    const [originalServiceTypes, setOriginalServiceTypes] = useState<
        LocationOrServiceTypeItem[]
    >([]);

    const [isFetching, setIsFetching] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const locationRes = await settingsAPI.getLocations();
                setLocations(locationRes.data);
                setOriginalLocations(locationRes.data);

                const serviceTypeRes = await settingsAPI.getServiceTypes();
                setServiceTypes(serviceTypeRes.data);
                setOriginalServiceTypes(serviceTypeRes.data);
            } catch (error: any) {
                console.error(
                    "Failed to fetch locations/service types:",
                    error
                );
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, []);

    const [locationsToDelete, setLocationsToDelete] = useState<number[]>([]);
    const [locationsToAdd, setLocationsToAdd] = useState<string[]>([]);
    const [locationsToEdit, setLocationsToEdit] = useState<EditItem[]>([]);

    const [serviceTypesToDelete, setServiceTypesToDelete] = useState<number[]>(
        []
    );
    const [serviceTypesToAdd, setServiceTypesToAdd] = useState<string[]>([]);
    const [serviceTypesToEdit, setServiceTypesToEdit] = useState<EditItem[]>(
        []
    );

    const handleCancelSubmit = (type: "Locations" | "Service Types") => {
        if (type === "Locations") {
            setLocationsToDelete([]);
            setLocationsToAdd([]);
            setLocationsToEdit([]);
        } else if (type === "Service Types") {
            setServiceTypesToDelete([]);
            setServiceTypesToAdd([]);
            setServiceTypesToEdit([]);
        }
    };

    const handleSubmit = async (type: "Locations" | "Service Types") => {
        if (type === "Locations") {
            const locationPayload = {
                toDelete: locationsToDelete,
                toAdd: locationsToAdd,
                toEdit: locationsToEdit,
            };

            try {
                const res = await settingsAPI.batchUpdateLocations(
                    locationPayload
                );
                // Update state with the returned data
                setLocations(res.data);
                setOriginalLocations(res.data);
                // Clear pending arrays
                setLocationsToDelete([]);
                setLocationsToAdd([]);
                setLocationsToEdit([]);
                toastSuccess("Locations updated successfully");
            } catch (error: any) {
                console.error("Failed to update locations:", error);
                toastError("Failed to update locations");
            }
        } else if (type === "Service Types") {
            const serviceTypePayload = {
                toDelete: serviceTypesToDelete,
                toAdd: serviceTypesToAdd,
                toEdit: serviceTypesToEdit,
            };

            try {
                const res = await settingsAPI.batchUpdateServiceTypes(
                    serviceTypePayload
                );
                // Update state with the returned data
                setServiceTypes(res.data);
                setOriginalServiceTypes(res.data);
                // Clear pending arrays
                setServiceTypesToDelete([]);
                setServiceTypesToAdd([]);
                setServiceTypesToEdit([]);
                toastSuccess("Service types updated successfully");
            } catch (error: any) {
                console.error("Failed to update service types:", error);
                toastError("Failed to update service types");
            }
        }
    };

    const addItemsToBeDeleted = (
        type: "Locations" | "Service Types",
        id: number | string
    ) => {
        // Only add numeric IDs to delete list (temporary string IDs are handled differently)
        if (typeof id === "number") {
            if (type === "Locations") {
                setLocationsToDelete((prev) => [...prev, id]);
            } else if (type === "Service Types") {
                setServiceTypesToDelete((prev) => [...prev, id]);
            }
        }
    };

    const addItemsToBeAdded = (
        type: "Locations" | "Service Types",
        name: string
    ) => {
        if (type === "Locations") {
            setLocationsToAdd((prev) => [...prev, name]);
        } else if (type === "Service Types") {
            setServiceTypesToAdd((prev) => [...prev, name]);
        }
    };

    const addItemsToBeEdited = (
        type: "Locations" | "Service Types",
        id: number | string,
        newName: string
    ) => {
        // Only edit numeric IDs (temporary string IDs are handled differently)
        if (typeof id === "number") {
            if (type === "Locations") {
                setLocationsToEdit((prev) => {
                    // Remove existing edit for this id if any
                    const filtered = prev.filter((item) => item.id !== id);
                    return [...filtered, { id, name: newName }];
                });
            } else if (type === "Service Types") {
                setServiceTypesToEdit((prev) => {
                    const filtered = prev.filter((item) => item.id !== id);
                    return [...filtered, { id, name: newName }];
                });
            }
        }
    };

    if (isFetching) {
        return (
            <div className="space-y-3">
                <div className="skeleton w-full h-24"></div>
                <div className="skeleton w-full h-24"></div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <SettingsContainer
                title="Locations"
                contents={locations}
                setContents={setLocations}
                originalContents={originalLocations}
                handleCancelSubmit={() => handleCancelSubmit("Locations")}
                handleSubmit={() => handleSubmit("Locations")}
                addItemsToBeDeleted={(id) =>
                    addItemsToBeDeleted("Locations", id)
                }
                addItemsToBeAdded={(name) =>
                    addItemsToBeAdded("Locations", name)
                }
                addItemsToBeEdited={(id, newName) =>
                    addItemsToBeEdited("Locations", id, newName)
                }
            />
            <SettingsContainer
                title="Service Types"
                contents={serviceTypes}
                setContents={setServiceTypes}
                originalContents={originalServiceTypes}
                handleCancelSubmit={() => handleCancelSubmit("Service Types")}
                handleSubmit={() => handleSubmit("Service Types")}
                addItemsToBeDeleted={(id) =>
                    addItemsToBeDeleted("Service Types", id)
                }
                addItemsToBeAdded={(name) =>
                    addItemsToBeAdded("Service Types", name)
                }
                addItemsToBeEdited={(id, newName) =>
                    addItemsToBeEdited("Service Types", id, newName)
                }
            />
        </div>
    );
};

export default LocationAndServiceTypeSettings;
