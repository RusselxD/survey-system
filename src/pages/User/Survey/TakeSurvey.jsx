import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { respondentsAPI } from "../../../utils/api/respondents";

const TakeSurvey = () => {
    const { id } = useParams();

    const [isFetching, setIsFetching] = useState(true);
    const [survey, setSurvey] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                setIsFetching(true);
                const res = await respondentsAPI.getSurveyQuestions(id);

                if (res.data.status === "archived") {
                    navigate("/survey/archived", {
                        state: {
                            title: res.data?.title || "Archived Survey",
                            coverImageUrl: res.data?.coverImageUrl,
                        },
                    });
                    return;
                }

                // Check if THIS specific survey has been viewed
                if (!respondentsAPI.hasSurveyBeenViewed(res.data.id)) {
                    console.log(
                        "Survey not viewed yet, redirecting to preview..."
                    );
                    navigate(`/s/${res.data.id}`);
                    return;
                }

                setSurvey(res.data);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    navigate("/not-found");
                    return;
                }
                console.log(error);
            } finally {
                setIsFetching(false);
            }
        };
        fetchSurveyData();
    }, [id]);

    if (isFetching) {
        return (
            <div className="min-h-screen dark:bg-base-100 bg-gray-100/70 p-2 sm:p-5 flex justify-center">
                <div className="w-full md:w-[60%] lg:w-[50%] gap-3 sm:gap-4 flex flex-col items-start ">
                    <div className="skeleton w-full h-20 md:h-24 lg:h-32"></div>
                    <div className="skeleton h-10 sm:h-12 w-[80%]"></div>
                    <div className="skeleton h-5 sm:h-7 w-full"></div>
                    <div className="skeleton h-5 sm:h-7 w-full"></div>
                    <div className="skeleton h-5 sm:h-7 w-full"></div>
                    <div className="skeleton h-5 sm:h-7 w-full"></div>
                    <div className="skeleton h-5 sm:h-7 w-full"></div>
                    <div className="skeleton h-5 sm:h-7 w-full"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="dark:bg-base-100 min-h-screen bg-gray-100/70 p-4 sm:p-8 flex justify-center"></div>
    );
};

export default TakeSurvey;
