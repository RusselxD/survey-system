import { useEffect, useState } from "react";
import QuestionTypeLollipop from "./QuestionTypeLollipop";
import { useAuth } from "../../../../context/AuthContext";
import { analyticsAPI } from "../../../../utils/api/pages/analytics";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";

const QuestionTypeDistributionContainer = () => {
    const { toastError } = useAuth();

    const [questionDistributionData, setQuestionDistributionData] =
        useState(null);
    const [isFetching, setIsFetching] = useState(true);
    const [refetch, setRefetch] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getQuestionTypeDistribution();
                setQuestionDistributionData(res.data);
            } catch (error) {
                toastError("Failed to fetch question type distribution data.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton w-full h-96"></div>;
    }

    if (!questionDistributionData) {
        return (
            <FailedToLoadComponent
                handleReloadComponent={() => setRefetch(refetch + 1)}
                dataName="question type distribution data"
                heightAndWidth="w-full h-96"
            />
        );
    }

    return (
        <div className="custom-container overflow-hidden w-full sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
            <QuestionTypeLollipop dataset={questionDistributionData} />
        </div>
    );
};

export default QuestionTypeDistributionContainer;
