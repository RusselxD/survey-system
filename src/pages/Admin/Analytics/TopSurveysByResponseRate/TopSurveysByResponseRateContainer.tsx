import { useEffect, useState } from "react";
import TopSurveysByResponse from "./TopSurveysByResponse";
import {
    analyticsAPI,
    TopSurveysByResponseRate,
} from "../../../../utils/api/pages/analytics";
import { useAuth } from "../../../../context/AuthContext";
import FailedToLoadComponent from "../../../../components/reusable/FailedToLoadComponent";
import DownloadExcelButton from "../../../../components/reusable/DownloadExcelButton";

const TopSurveysByResponseRateContainer = (): React.JSX.Element => {
    const { toastError } = useAuth();
    const [topSurveyByResponsesData, setTopSurveyByResponsesData] =
        useState<TopSurveysByResponseRate | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [refetch, setRefetch] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsFetching(true);
                const res = await analyticsAPI.getTopSurveysByResponseRate();
                setTopSurveyByResponsesData(res.data);
            } catch (error) {
                toastError("Failed to fetch top surveys by response rate.");
            } finally {
                setIsFetching(false);
            }
        };
        fetchData();
    }, [refetch]);

    if (isFetching) {
        return <div className="skeleton w-[60%]"></div>;
    }

    if (!topSurveyByResponsesData) {
        return (
            <FailedToLoadComponent
                dataName="Top Surveys By Response Rate Data"
                handleReloadComponent={() => setRefetch((prev) => prev + 1)}
                heightAndWidth="w-[60%]"
            />
        );
    }

    return (
        <div className="custom-container w-[60%] sm:p-4 lg:p-5 dark:bg-base-300 bg-white relative">
            <div className="absolute left-3 top-3 z-10">
                <DownloadExcelButton
                    data={topSurveyByResponsesData.surveys.map(
                        (surveyName, index) => ({
                            "Survey Name": surveyName,
                            "Response Count":
                                topSurveyByResponsesData.responseCounts[index],
                            "Response Rate": `${topSurveyByResponsesData.responseRates[index]}%`,
                        })
                    )}
                    fileName="Top-Surveys-By-Response-Rate"
                    sheetName="Response Rates"
                />
            </div>
            <TopSurveysByResponse dataset={topSurveyByResponsesData} />
        </div>
    );
};

export default TopSurveysByResponseRateContainer;
