import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ResponseActivityHeatMap from "./ResponseActivityHeatMap";
import { useAuth } from "../../../../context/AuthContext";
import {
    analyticsAPI,
    ResponseActivity,
} from "../../../../utils/api/pages/analytics";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";
import DownloadExcelButton from "../../../../components/reusable/DownloadExcelButton";

const viewOptions = [
    { label: "Hourly", value: "hourly" as const },
    { label: "Daily", value: "daily" as const },
];

interface ViewDropdownProps {
    selectedView: "hourly" | "daily";
    setSelectedView: (view: "hourly" | "daily") => void;
}

const ViewDropdown = ({
    selectedView,
    setSelectedView,
}: ViewDropdownProps): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="custom-primary-txt text-xs z-20">
            <div
                className="relative dark:bg-base-100 bg-gray-100 border dark:border-gray-600 border-gray-300 w-fit px-2 py-2.5 rounded-md cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 transition-colors shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center gap-3">
                    <span className="font-medium min-w-[60px]">
                        {
                            viewOptions.find(
                                (opt) => opt.value === selectedView
                            )?.label
                        }
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
                    {viewOptions.map((option, index) => {
                        const isSelected = option.value === selectedView;
                        return (
                            <p
                                onClick={() => {
                                    setSelectedView(option.value);
                                    setIsOpen(false);
                                }}
                                key={index}
                                className={`px-4 py-2.5 hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-colors ${
                                    isSelected
                                        ? "dark:bg-gray-800 bg-gray-100 font-semibold"
                                        : ""
                                } ${index === 0 ? "rounded-t-lg" : ""} ${
                                    index === viewOptions.length - 1
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

const ResponseActivityHeatMapContainer = () => {
    const [viewType, setViewType] = useState<"hourly" | "daily">("hourly"); // "hourly" or "daily"

    const { toastError } = useAuth();

    const [dataset, setDataset] = useState<ResponseActivity | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [refetch, setRefetch] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getResponseActivityData(
                    viewType
                );
                setDataset(res.data);
            } catch (error) {
                console.log(error);
                toastError("Failed to fetch response activity data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch, viewType]);

    if (isFetching) {
        return <div className="skeleton w-full h-96 rounded-lg"></div>;
    }

    if (!dataset) {
        return (
            <FailedToLoadComponent
                dataName="response activity data"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
                heightAndWidth="w-full h-96"
            />
        );
    }

    return (
        <div className="custom-container w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white relative">
            <div className="absolute left-3 top-3 z-30">
                <DownloadExcelButton
                    data={dataset.labels.map((label, index) => ({
                        [viewType === "hourly" ? "Hour" : "Day"]: label,
                        "Response Count": dataset.responseCounts[index],
                    }))}
                    fileName={`Response-Activity-${
                        viewType === "hourly" ? "Hourly" : "Daily"
                    }`}
                    sheetName="Activity"
                />
            </div>
            <div className="absolute right-3 top-3 z-30">
                <ViewDropdown
                    selectedView={viewType}
                    setSelectedView={setViewType}
                />
            </div>

            <ResponseActivityHeatMap dataset={dataset} view={viewType} />
        </div>
    );
};

export default ResponseActivityHeatMapContainer;
