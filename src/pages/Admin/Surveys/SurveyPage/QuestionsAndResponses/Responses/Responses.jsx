import React, { useEffect, useState, useRef } from "react";
import { surveyPageAPI } from "../../../../../../utils/api/pages/surveyPage";
import ResponseContainer from "./ResponseContainer";

const Responses = ({ id }) => {
    const [responses, setResponses] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetching, setIsFetching] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const observerTarget = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Use different loading state for initial vs pagination
                if (page === 1) {
                    setIsFetching(true);
                } else {
                    setIsLoadingMore(true);
                }

                const res = await surveyPageAPI.getResponses(id, page, 10);
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
    }, [id, page]);

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
    if (isFetching && page === 1) {
        return (
            <div className="space-y-2">
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
            {responses.map((response, i) => (
                <ResponseContainer
                    key={response.id || i} // Use unique ID if available
                    response={response}
                    responseNumber={i + 1}
                />
            ))}

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
