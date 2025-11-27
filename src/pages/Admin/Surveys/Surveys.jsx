import { Plus } from "lucide-react";
import CardsContainer from "./CardsContainer";
import { useAuth } from "../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { surveyAPI } from "../../../utils/api/survey";
import SurveysSkeleton from "./SurveysSkeleton";
import FailedToLoad from "../../../components/reusable/FailedToLoad";

// const cardsDummyData = [
//     {
//         uuid: 1,
//         title: "Customer Feedbackasfasfasfsddas fa sfas fasdf sf Annuala;;lasjf;lasdkj;lkadjsf;lasjf 2025 Survey Nigga",
//         description:
//             "Gather feedback from dfas;ldkfj;alskjf;ljsa;l about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         imageUrl:
//             "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=450&fit=crop",
//         status: "published",
//         qrCodeUrl:
//             "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=Fuck YOu lex erickson talanigga",
//         responsesCount: 1247,
//         questionsCount: 12,
//     },
//     {
//         uuid: 2,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         status: "draft",
//         updated_at: "2025-11-09T06:30:00Z", // Earlier today (about 18 hours ago assuming current time is midnight UTC)
//     },
//     {
//         uuid: 3,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         status: "archived",
//         qrCodeUrl:
//             "https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=Fuck YOu lex erickson talanigga",
//         responsesCount: 856,
//         questionsCount: 8,
//     },
//     {
//         uuid: 4,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feeddfsafasdfsafsafasdfasdfir experience with our products and services.",
//         status: "published",
//         qrCodeUrl: "https://example.com/qrcode/4",
//         responsesCount: 856,
//         questionsCount: 8,
//     },
//     {
//         uuid: 5,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         imageUrl:
//             "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop",
//         status: "draft",
//         updated_at: "2025-11-05T14:20:00Z", // 4 days ago
//     },
//     {
//         uuid: 6,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         imageUrl:
//             "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
//         status: "published",
//         responsesCount: 2341,
//         questionsCount: 15,
//     },
//     {
//         uuid: 2,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         status: "draft",
//         updated_at: "2025-10-15T09:30:00Z", // About 3 weeks ago
//     },
//     {
//         uuid: 2,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         status: "draft",
//         updated_at: "2025-11-08T16:45:00Z", // Yesterday
//     },
//     {
//         uuid: 6,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         imageUrl:
//             "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=450&fit=crop",
//         status: "published",
//         responsesCount: 2341,
//         questionsCount: 15,
//     },
//     {
//         uuid: 2,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         status: "draft",
//         updated_at: "2025-10-15T09:30:00Z", // About 3 weeks ago
//     },
//     {
//         uuid: 2,
//         title: "Customer Feedback SurNIGGAAAAAAAAAAal;skfj;salkdfjasl;kvey",
//         description:
//             "Gather feedback from df about theadfasfasfaasdffsfadsfsadfsafasdfsafsafasdfasdfir experience with our products and services.",
//         status: "draft",
//         updated_at: "2025-11-08T16:45:00Z", // Yesterday
//     },
// ];<|diff_marker|> PATCH A

//   {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "title": "string",
//     "description": "string",
//     "status": "string",
//     "qrCodeUrl": "string",
//     "coverImageUrl": "string",
//     "questionCount": 0,
//     "responseCount": 0,
//     "updatedAt": "2025-11-26T12:52:53.374Z"
//   }

const DropDown = ({ title, choices }) => {
    return (
        <div className="dropdown dropdown-bottom p-0">
            <div
                tabIndex={0}
                role="button"
                className="btn font-medium m-1 dark:bg-gray-800 bg-gray-200"
            >
                Choose {title}
            </div>
            <ul
                tabIndex="-1"
                className="dropdown-content menu p-0 bg-base-100 rounded-sm z-1 w-fit shadow-sm"
            >
                {choices.map((choice, index) => (
                    <li className="px-2 py-2 w-full h-full" key={index}>
                        <a>{choice}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Head = () => {
    const { hasPermission } = useAuth();

    return (
        <div className="dark:text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b dark:border-white border-black pb-3 mb-5">
            <div className="">
                <DropDown title="Status" choices={["Published", "Draft"]} />
            </div>
            {hasPermission("survey.create") && (
                <NavLink
                    to={"/admin/surveys/new"}
                    className="custom-primary-btn p-3 gap-1 text-xs    "
                >
                    <Plus size={18} />
                    <span>Create New Survey</span>
                </NavLink>
            )}
        </div>
    );
};

const Surveys = () => {
    const { toastError } = useAuth();

    const [surveys, setSurveys] = useState([]);
    const [surveysLoading, setSurveysLoading] = useState(false);
    const [errorLoadingSurveys, setErrorLoadingSurveys] = useState(false);

    useEffect(() => {
        const fetchSurveys = async () => {
            try {
                setSurveysLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const res = await surveyAPI.getSurveys();
                setSurveys(res.data);
                setErrorLoadingSurveys(false);
            } catch (error) {
                setErrorLoadingSurveys(true);
                toastError(error.message || "Failed to load surveys.");
            } finally {
                setSurveysLoading(false);
            }
        };
        fetchSurveys();
    }, []);

    if (surveysLoading) {
        return <SurveysSkeleton />;
    }

    if (errorLoadingSurveys) {
        return <FailedToLoad />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1">
            <div className="custom-container p-3 sm:p-4 lg:p-5 dark:bg-base-300 bg-white">
                <Head />
                <CardsContainer surveys={surveys} />
                <p className="mt-6 text-sm sm:text-base text-center sm:text-left">
                    View Archived Surveys -
                </p>
            </div>
        </div>
    );
};

export default Surveys;
