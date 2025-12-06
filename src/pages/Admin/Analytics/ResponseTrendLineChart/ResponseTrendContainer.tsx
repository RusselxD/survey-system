import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import ResponseTrend from "./ResponseTrend";
import {
    analyticsAPI,
    ResponseTrends,
} from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

interface TimeRange {
    label: string;
    days: number;
    granularity: string;
}

// Define the available time ranges and their properties
const timeRanges: TimeRange[] = [
    { label: "7 Days", days: 7, granularity: "Day" },
    { label: "10 Days", days: 10, granularity: "Day" },
    { label: "30 Days", days: 30, granularity: "Day" },
    { label: "6 Months", days: 183, granularity: "Month" }, // ~183 days for 6 months
    { label: "1 Year", days: 365, granularity: "Month" }, // 365 days
];

interface TimeRangeDropdownProps {
    timeRanges: TimeRange[];
    selectedRange: TimeRange;
    setSelectedRange: (range: TimeRange) => void;
}

const TimeRangeDropdown = ({
    timeRanges,
    selectedRange,
    setSelectedRange,
}: TimeRangeDropdownProps): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="custom-primary-txt text-xs z-20">
            <div
                className="relative dark:bg-base-100 bg-gray-100 border dark:border-gray-600 border-gray-300 w-fit px-2 py-2.5 rounded-md cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 transition-colors shadow-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center gap-3">
                    <span className="font-medium min-w-[80px]">
                        {selectedRange.label}
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
                    {timeRanges.map((range, index) => {
                        const isSelected = range.label === selectedRange.label;
                        return (
                            <p
                                onClick={() => {
                                    setSelectedRange(range);
                                    setIsOpen(false);
                                }}
                                key={index}
                                className={`px-4 py-2.5 hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-colors ${
                                    isSelected
                                        ? "dark:bg-gray-800 bg-gray-100 font-semibold"
                                        : ""
                                } ${index === 0 ? "rounded-t-lg" : ""} ${
                                    index === timeRanges.length - 1
                                        ? "rounded-b-lg"
                                        : ""
                                }`}
                            >
                                {range.label}
                            </p>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ResponseTrendContainer = (): React.JSX.Element => {
    const [responseTrendData, setResponseTrendData] =
        useState<ResponseTrends | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [refetch, setRefetch] = useState<number>(0);
    const { toastError } = useAuth();

    const [selectedRange, setSelectedRange] = useState<TimeRange>(
        timeRanges[0]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getResponseTrends(
                    selectedRange.days,
                    selectedRange.granularity
                );
                setResponseTrendData(res.data);
            } catch (error) {
                toastError("Failed to fetch response trends.");
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [selectedRange, refetch]);

    if (isFetching) {
        return <div className="skeleton h-[27rem] w-full"></div>;
    }

    if (!responseTrendData) {
        return (
            <FailedToLoadComponent
                dataName="Response Trend Data"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
                heightAndWidth="h-[27rem] w-full"
            />
        );
    }

    return (
        <div className="custom-container h-[30rem] relative w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <div className="absolute right-3 top-3">
                <TimeRangeDropdown
                    timeRanges={timeRanges}
                    selectedRange={selectedRange}
                    setSelectedRange={setSelectedRange}
                />
            </div>
            <ResponseTrend
                dataset={responseTrendData}
                duration={selectedRange.label}
                xAxisLabel={selectedRange.granularity + "s"}
            />
        </div>
    );
};

export default ResponseTrendContainer;
