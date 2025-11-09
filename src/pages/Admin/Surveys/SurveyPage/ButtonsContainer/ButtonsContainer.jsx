import {
    ExternalLink,
    Download,
    Archive,
    ScanQrCode,
    ChevronUp,
    ChevronDown,
    FileText,
    Sheet,
} from "lucide-react";
import { useState } from "react";

const DownloadButton = () => {
    const [showDownloadOptions, setShowDownloadOptions] = useState(false);

    return (
        <div className="relative text-white">
            <button
                onClick={() => setShowDownloadOptions(!showDownloadOptions)}
                className="w-full h-full p-3 bg-violet-600 hover:bg-violet-700 rounded-md flex items-center gap-2 justify-center text-white"
            >
                <Download />
                <span>Download Analysis</span>
                <ChevronUp
                    className={` ${
                        showDownloadOptions ? "rotate-180" : ""
                    } transition-transform duration-150 ease-in-out`}
                />
            </button>

            <div
                className={`${
                    showDownloadOptions ? "h-28" : "h-0"
                } absolute transition-[height] duration-150 ease-in-out overflow-hidden flex flex-col justify-end bottom-full w-[25%] right-0 mb-2 space-y-2 z-10`}
            >
                <button className="w-full p-3 bg-rose-500 hover:bg-rose-600 rounded-md flex items-center gap-2 justify-center transition-colors">
                    <FileText size={18} />
                    <span>PDF</span>
                </button>
                <button className="w-full p-3 bg-emerald-600 hover:bg-emerald-700 rounded-md flex items-center gap-2 justify-center transition-colors">
                    <Sheet size={18} />
                    <span>Excel</span>
                </button>
            </div>
        </div>
    );
};

const ButtonsContainer = ({ survey }) => {
    return (
        <div className="mt-5 custom-primary-txt text-sm grid grid-cols-2 gap-3">
            <button className="text-white w-full h-full p-3 custom-primary-btn rounded-md flex items-center gap-2 justify-center">
                <ExternalLink />
                <span>View Responses</span>
            </button>
            <DownloadButton />
            <button className="text-white w-full h-full p-3 bg-amber-500 hover:bg-amber-600 rounded-md flex items-center gap-2 justify-center">
                <Archive />
                <span>Archive Survey</span>
            </button>
            <button className="text-white w-full h-full p-3 bg-green-600 hover:bg-green-700 rounded-md flex items-center gap-2 justify-center">
                <ScanQrCode />
                <span>View QR Code</span>
            </button>
        </div>
    );
};

export default ButtonsContainer;
