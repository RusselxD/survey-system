import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { surveyPageAPI } from "../../../../../../utils/api/pages/surveyPage";
import ResponseContainer from "./ResponseContainer";

interface ResponseData {
    id: string;
    submittedAt: string;
    respondentName?: string;
    respondentEmail?: string;
    completionTime: string;
}

interface ResponsesProps {
    id: string;
    responseCount: number;
    onMount?: () => void;
}

const Responses = ({
    id,
    responseCount,
    onMount,
}: ResponsesProps): React.JSX.Element => {
    const [responses, setResponses] = useState<ResponseData[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const observerTarget = useRef<HTMLDivElement | null>(null);

    // Call onMount when component mounts
    useEffect(() => {
        if (onMount) {
            onMount();
        }
    }, []);

    // Reset pagination when sort order changes
    useEffect(() => {
        setResponses([]);
        setPage(1);
        setHasMore(true);
    }, [sortOrder]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use different loading state for initial vs pagination
                if (page === 1) {
                    setIsFetching(true);
                } else {
                    setIsLoadingMore(true);
                }

                const res = await surveyPageAPI.getResponses(
                    id,
                    page,
                    10,
                    sortOrder
                );
                setResponses((prev) => [...prev, ...res.data.data]);

                setHasMore(res.data.hasMore);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetching(false);
                setIsLoadingMore(false);
            }
        };

        if (hasMore) {
            // Only fetch if there's more data
            fetchData();
        }
    }, [id, page, sortOrder]);

    // Infinite scroll observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasMore &&
                    !isLoadingMore &&
                    !isFetching
                ) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [hasMore, isLoadingMore, isFetching]);

    // Initial loading skeleton
    if (isFetching) {
        return (
            <div className="space-y-2">
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
                <div className="skeleton w-full h-20"></div>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {/* Sort order selector */}
            <div className="flex justify-end items-center gap-2">
                <label className="text-sm font-medium custom-sec-txt">
                    Sort by:
                </label>
                <div className="custom-primary-txt text-xs z-20">
                    <div
                        className="relative dark:bg-base-100 bg-gray-100 border dark:border-gray-600 border-gray-300 w-fit px-2 py-2.5 rounded-md cursor-pointer hover:dark:bg-gray-800 hover:bg-gray-200 transition-colors shadow-sm"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="flex items-center gap-3">
                            <span className="font-medium min-w-[100px]">
                                {sortOrder === "desc"
                                    ? "Newest First"
                                    : "Oldest First"}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${
                                    isDropdownOpen ? "rotate-180" : ""
                                }`}
                            />
                        </span>
                        <div
                            className={`left-0 z-20 w-full top-full mt-2 absolute overflow-hidden transition-[max-height] duration-300 ease-in-out dark:bg-base-100 bg-white rounded-md shadow-lg ${
                                isDropdownOpen ? "max-h-96" : "max-h-0"
                            }`}
                        >
                            <p
                                onClick={() => {
                                    setSortOrder("desc");
                                    setIsDropdownOpen(false);
                                }}
                                className={`px-4 py-2.5 hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-colors rounded-t-lg ${
                                    sortOrder === "desc"
                                        ? "dark:bg-gray-800 bg-gray-100 font-semibold"
                                        : ""
                                }`}
                            >
                                Newest First
                            </p>
                            <p
                                onClick={() => {
                                    setSortOrder("asc");
                                    setIsDropdownOpen(false);
                                }}
                                className={`px-4 py-2.5 hover:dark:bg-gray-800 hover:bg-gray-100 cursor-pointer whitespace-nowrap transition-colors rounded-b-lg ${
                                    sortOrder === "asc"
                                        ? "dark:bg-gray-800 bg-gray-100 font-semibold"
                                        : ""
                                }`}
                            >
                                Oldest First
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {responses.map((response: ResponseData, i: number) => {
                const responseNumber =
                    sortOrder === "desc"
                        ? responseCount - i // Newest first: count down from total
                        : i + 1; // Oldest first: count up from 1

                return (
                    <ResponseContainer
                        key={response.id || i}
                        response={response}
                        responseNumber={responseNumber}
                    />
                );
            })}

            {/* Loading indicator for pagination */}
            {isLoadingMore && <div className="skeleton w-full h-20"></div>}

            {/* Invisible element to trigger loading - placed before the end message */}
            {hasMore && <div ref={observerTarget} className="h-4" />}

            {!hasMore && responses.length > 0 && (
                <p className="text-center text-gray-500 py-4">
                    No more responses
                </p>
            )}

            {responses.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                    No responses yet
                </p>
            )}
        </div>
    );
};

export default Responses;
