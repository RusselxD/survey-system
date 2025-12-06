import { X } from "lucide-react";

interface ModalXButtonProps {
    onClose: () => void;
}

const ModalXButton = ({ onClose }: ModalXButtonProps) => {
    return (
        <button
            onClick={onClose}
            className="absolute right-3 top-3 sm:right-4 sm:top-4 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
            <X size={20} className="sm:w-6 sm:h-6" />
        </button>
    );
};

export default ModalXButton;
