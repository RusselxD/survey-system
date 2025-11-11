import React from "react";
import ModalXButton from "./ModalXButton";
import { AlertTriangle } from "lucide-react";

const ConfirmDeleteModal = ({ toBeDeleted, handleDelete, onClose }) => {
    return (
        <div className="modal modal-open" onClick={onClose}>
            <div
                className="modal-box dark:bg-gray-700 w-[30rem] max-h-[70vh] bg-white relative flex flex-col items-start px-4 sm:px-5"
                onClick={(e) => e.stopPropagation()}
            >
                <ModalXButton onClose={onClose} />

                <h1 className="custom-primary-txt text-center w-full font-medium">Confirm Delete</h1>
                <p className="custom-sec-txt text-sm text-center w-full mb-3 mt-2">
                    Are you sure you want to delete {toBeDeleted}?
                </p>

                
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
