import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ResponsesByLocation from "./ResponsesByLocation";
import { useAuth } from "../../../../context/AuthContext";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const locationOptions = [
    { label: "With Responses", value: false },
    { label: "All Locations", value: true },
];

const LocationFilterDropdown = ({ selectedOption, setIncludeAll }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="custom-primary-txt text-sm z-20">
            <div
                className="relative dark:bg-base-100 bg-gray-100 border dark:border-gray-600 border-gray-300 w-fit px-4 py-2.5 rounded-md cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 transition-colors shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center gap-3">
                    <span className="font-medium min-w-[100px]">
                        {selectedOption.label}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    />
                </span>
                <div
                    className={`left-0 z-20 w-full top-full mt-2 absolute overflow-hidden transition-[max-height] duration-300 ease-in-out dark:bg-base-100 bg-white rounded-md shadow-lg ${
                        isOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                    {locationOptions.map((option, index) => {
                        const isSelected =
                            option.value === selectedOption.value;
                        return (
                            <p
                                onClick={() => {
                                    setIncludeAll(option.value);
                                    setIsOpen(false);
                                }}
                                key={index}
                                className={`px-4 py-2.5 hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-colors ${
                                    isSelected
                                        ? "dark:bg-gray-800 bg-gray-100 font-semibold"
                                        : ""
                                } ${index === 0 ? "rounded-t-lg" : ""} ${
                                    index === locationOptions.length - 1
                                        ? "rounded-b-lg"
                                        : ""
                                }`}
                            >
                                {option.label}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ResponsesByLocationContainer = () => {
    const { toastError } = useAuth();

    const [responsesByLocationData, setResponsesByLocationData] =
        useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);

    const [includeAll, setIncludeAll] = useState(false);

    const selectedOption = locationOptions.find(
        (opt) => opt.value === includeAll
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getResponsesByLocation(
                    includeAll
                );
                setResponsesByLocationData(res.data);
            } catch (error) {
                toastError("Failed to load responses by location data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch, includeAll]);

    if (isFetching) {
        return <div className="skeleton flex-1 py-40"></div>;
    }

    if (!responsesByLocationData) {
        return (
            <FailedToLoadComponent
                dataName="responses by location data"
                handleReloadComponent={() => setRefetch(refetch + 1)}
                heightAndWidth="flex-1 p-12"
            />
        );
    }

    return (
        <div className="custom-container relative flex-1 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <div className="absolute right-3 top-3">
                <LocationFilterDropdown
                    selectedOption={selectedOption}
                    setIncludeAll={setIncludeAll}
                />
            </div>
            <ResponsesByLocation dataset={responsesByLocationData} />
        </div>
    );
};

export default ResponsesByLocationContainer;
