import { useEffect, useState } from "react";
import SurveyDetails from "./SurveyDetails";
import {
    locationsAPI,
    questionTypesAPI,
    serviceTypesAPI,
    surveyAPI,
} from "../../../../utils/api/models/survey";
import { useAuth } from "../../../../context/AuthContext";
import Questions from "./Questions/Questions";
import { uploadAPI } from "../../../../utils/api/upload";
import { useNavigate, useParams } from "react-router-dom";
import FailedToLoad from "../../../../components/reusable/FailedToLoad";

const CreateNewSurvey = () => {
    const { toastError, toastSuccess, user } = useAuth();
    const navigate = useNavigate();

    const [locations, setLocations] = useState([]);
    const [serviceTypes, setServiceTypes] = useState([]);
    const [questionTypes, setQuestionTypes] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [serviceType, setServiceType] = useState(0);
    const [location, setLocation] = useState(0);
    const [coverImage, setCoverImage] = useState(null);
    const [askName, setAskName] = useState(false);
    const [askEmail, setAskEmail] = useState(false);

    const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
    const [errorLoadingInitialData, setErrorLoadingInitialData] =
        useState(false);
    const [isSubmitting, setIsSubmitting] = useState(null); // null, 'draft', or 'published'

    const [questions, setQuestions] = useState([
        {
            id: Date.now(),
            type_id: 0,
            text: "",
            required: false,
            metadata: {},
        },
    ]);

    const { id } = useParams();

    const isEdit = Boolean(id);

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoadingInitialData(true);
            try {
                // Fetch dropdown data
                const locationRes = await locationsAPI.getLocations();
                const serviceTypeRes = await serviceTypesAPI.getServiceTypes();
                const questionTypesRes =
                    await questionTypesAPI.getQuestionTypes();
                setLocations(locationRes.data);
                setServiceTypes(serviceTypeRes.data);
                setQuestionTypes(questionTypesRes.data);

                // If editing, fetch survey data
                if (isEdit) {
                    const surveyRes = await surveyAPI.getSurveyToEdit(id);
                    const survey = surveyRes.data;

                    console.log(survey);

                    // Set survey details
                    setTitle(survey.title || "");
                    setDescription(survey.description || "");
                    setServiceType(survey.serviceTypeId || 0);
                    setLocation(survey.locationId || 0);
                    setAskName(survey.askName || false);
                    setAskEmail(survey.askEmail || false);

                    // Handle cover image - store URL as string if it exists
                    if (survey.coverImageUrl) {
                        setCoverImage(survey.coverImageUrl);
                    }

                    // Set questions
                    if (
                        survey.surveyQuestions &&
                        survey.surveyQuestions.length > 0
                    ) {
                        const formattedQuestions = survey.surveyQuestions.map(
                            (q, index) => ({
                                id: Date.now() + index, // Generate unique IDs
                                type_id: q.typeId,
                                text: q.text,
                                required: q.required,
                                metadata: q.metadata
                                    ? JSON.parse(q.metadata)
                                    : {},
                            })
                        );
                        setQuestions(formattedQuestions);
                    }
                }
                setErrorLoadingInitialData(false);
            } catch (error) {
                setErrorLoadingInitialData(true);
                toastError(error.message || "Failed to load initial data.");
            } finally {
                setIsLoadingInitialData(false);
            }
        };
        fetchInitialData();
    }, [id, isEdit]);

    // Warn user before leaving if there are unsaved changes
    useEffect(() => {
        const hasChanges = () => {
            return (
                title.trim() !== "" ||
                description.trim() !== "" ||
                serviceType !== 0 ||
                location !== 0 ||
                coverImage !== null ||
                askName !== false ||
                askEmail !== false ||
                questions.some((q) => q.type_id !== 0 || q.text.trim() !== "")
            );
        };

        const handleBeforeUnload = (e) => {
            if (hasChanges()) {
                e.preventDefault();
                e.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [
        title,
        description,
        serviceType,
        location,
        coverImage,
        askName,
        askEmail,
        questions,
    ]);

    const handleCreateSurvey = async (status = "draft") => {
        if (!validateSurvey()) {
            return;
        }

        setIsSubmitting(status);
        try {
            // upload image first and then get the url
            let imageUrl = null;
            if (coverImage) {
                // Check if coverImage is already a URL string (editing mode)
                if (typeof coverImage === "string") {
                    imageUrl = coverImage;
                } else {
                    // It's a File object, upload it
                    const imageUrlRes = await uploadAPI.uploadImage(coverImage);
                    imageUrl = imageUrlRes.data.fileUrl;
                }
            }

            // prepare payload
            const surveyPayload = {
                title: title,
                description: description,
                status: status,
                coverImageUrl: imageUrl,
                askName: askName,
                askEmail: askEmail,
                serviceTypeId: serviceType !== 0 ? serviceType : null,
                locationId: location !== 0 ? location : null,
                createdBy: user.id,
            };

            // loop through questions to format them
            const formattedQuestions = [];
            questions.forEach((question, i) => {
                formattedQuestions.push({
                    typeId: question.type_id,
                    text: question.text.trim(),
                    ordinal: i + 1,
                    required: question.required,
                    metadata: JSON.stringify(question.metadata),
                });
            });

            surveyPayload.surveyQuestions = formattedQuestions;

            console.log(surveyPayload)

            if (isEdit) {
                await surveyAPI.updateSurvey(id, surveyPayload);
            } else {
                await surveyAPI.createSurvey(surveyPayload);
            }

            toastSuccess(
                `Survey ${
                    status === "published" ? "published" : "saved as draft"
                } successfully`
            );
            navigate("/admin/surveys");
        } catch (error) {
            console.log(error)
            toastError(
                error.message ||
                    error.response?.data ||
                    "Failed to create survey"
            );
        } finally {
            setIsSubmitting(null);
        }
    };

    const validateSurvey = () => {
        // Validate title
        if (!title || title.trim() === "") {
            toastError("Survey title is required");
            return false;
        }

        // Validate questions
        if (questions.length === 0) {
            toastError("At least one question is required");
            return false;
        }

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];

            // Check if question type is selected
            if (question.type_id === 0) {
                toastError(`Question ${i + 1}: Please select a question type`);
                return false;
            }

            // Check if question text is not empty
            if (!question.text || question.text.trim() === "") {
                toastError(`Question ${i + 1}: Question text is required`);
                return false;
            }
        }

        return true;
    };

    if (isLoadingInitialData) {
        return (
            <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 gap-3 flex flex-col">
                <div className="skeleton h-96 w-full"></div>
                <div className="skeleton flex-1 w-full"></div>
            </div>
        );
    }

    if (errorLoadingInitialData) {
        return <FailedToLoad />;
    }

    return (
        <div className="p-0 sm:p-1 md:p-3 dark:bg-base-100 bg-gray-100/70 flex-1 gap-3 flex flex-col">
            <SurveyDetails
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                serviceType={serviceType}
                setServiceType={setServiceType}
                location={location}
                setLocation={setLocation}
                locations={locations}
                serviceTypes={serviceTypes}
                coverImage={coverImage}
                setCoverImage={setCoverImage}
                askName={askName}
                setAskName={setAskName}
                askEmail={askEmail}
                setAskEmail={setAskEmail}
                handleSaveDraft={() => handleCreateSurvey("draft")}
                handlePublishSurvey={() => handleCreateSurvey("published")}
                isSubmitting={isSubmitting}
            />
            <Questions
                questionTypes={questionTypes}
                questions={questions}
                setQuestions={setQuestions}
            />
        </div>
    );
};

export default CreateNewSurvey;
