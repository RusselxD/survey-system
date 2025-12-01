import React, { useEffect, useState } from "react";
import { surveyPageAPI } from "../../../../../../utils/api/pages/surveyPage";
import ResponseContainer from "./ResponseContainer";

const Responses = ({ id }) => {
    const [responses, setResponses] = useState([]);

    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await surveyPageAPI.getResponses(id);
                setResponses(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchData();
    }, [id]);

    if (isFetching) {
        return <div>L</div>;
    }

    console.log(responses);

    return (
        <div className=" grid grid-cols-2 gap-4">
            {responses.map((response, i) => {
                return (
                    <ResponseContainer
                        key={i}
                        response={response}
                        responseNumber={i + 1}
                    />
                );
            })}
        </div>
    );
};

export default Responses;
