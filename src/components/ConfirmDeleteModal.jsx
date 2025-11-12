import ModalXButton from "./ModalXButton";
import { Trash2 } from "lucide-react";

const ConfirmDeleteModal = ({ toBeDeleted, handleDelete, onClose }) => {

    return (
        <div className="modal modal-open" onClick={onClose}>
            <div
                className="modal-box dark:bg-gray-700 w-[80vw] md:w-96 bg-white relative flex flex-col items-start px-5 py-6"
                onClick={(e) => e.stopPropagation()}
            >
                <ModalXButton onClose={onClose} />

                <div className="w-full flex items-center justify-center ">
                    <div className="rounded-full h-12 w-12 bg-red-100 dark:bg-red-300 dark:text-red-700 text-red-500 flex items-center justify-center">
                        <Trash2 />
                    </div>
                </div>

                <h1 className="custom-primary-txt text-center w-full font-bold mt-2">
                    Delete Confirmation
                </h1>

                <p className="custom-sec-txt text-sm text-center w-full mb-3 mt-2">
                    Are you sure you want to delete {toBeDeleted}?
                </p>

                <div className="flex items-center justify-center w-full gap-4 text-sm">
                    <button
                        onClick={() => onClose()}
                        className="transition-colors w-full border px-3 py-2 rounded-md border-gray-400 text-gray-700 dark:text-white dark:hover:text-gray-900 hover:text-white hover:bg-gray-400 dark:hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            handleDelete();
                            onClose();
                        }}
                        className="transition-colors w-full px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
