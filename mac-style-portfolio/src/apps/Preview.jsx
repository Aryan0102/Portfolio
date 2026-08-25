import Window from "../components/Window";
import { IoOpenOutline } from "react-icons/io5";
import RemoteFrame from "../components/RemoteFrame";

const resumeFileId = "1J1yFZATeR6sxBMH143N0Vv1WXLmYM8aI";

const Preview = () => (
    <Window
        appName="Preview"
        width={780}
        height={720}
        children={
            <div className="bg-gray-900 w-full h-full flex flex-col">
                <div className="flex items-center justify-between px-3 py-2 bg-gray-800 border-b border-gray-700">
                    <p className="text-sm text-white">Resume.pdf</p>
                    <button
                        onClick={() => window.open(`https://drive.google.com/file/d/${resumeFileId}/view`, "_blank")}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-700 text-white text-xs hover:bg-gray-600 transition-colors"
                    >
                        <IoOpenOutline className="w-3.5 h-3.5" />
                        <p>Open in Drive</p>
                    </button>
                </div>

                <RemoteFrame
                    src={`https://drive.google.com/file/d/${resumeFileId}/preview`}
                    title="Resume.pdf"
                    wrapperClassName="flex-1 w-full bg-gray-800"
                    className="w-full h-full border-0"
                />
            </div>
        }
    />
);

export default Preview;
