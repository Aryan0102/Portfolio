import Window from "../components/Window";
import { IoPlayOutline, IoStopOutline, IoFolderOpenOutline, IoDocumentOutline, IoCaretDownOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { getInformation } from "../getInfo"
import { MacOSLoader } from "../assets/loader";

const Matlab = () => {
    const [researchInfo, setResearchInfo] = useState({})
    const [loading, setLoading] = useState([])
    const [descriptionArray, setDescriptionArray] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getInformation("Research2");
                if (data && data.length > 0) {
                    setResearchInfo(data[0])
                }
            } catch (error) {
                console.error("Error fetching research data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const splitIntoLines = (description) => {
        if (!description) return [];
        
        const words = description.split(' ');
        const lines = [];
        let currentLine = '';
        const maxLineLength = 70;

        words.forEach((word) => {
            if (currentLine === '') {
                currentLine = word;
            } else if ((currentLine + ' ' + word).length <= maxLineLength) {
                currentLine += ' ' + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        });

        if (currentLine) {
            lines.push(currentLine);
        }

        return lines
    }

    const lineNumbers = [];
    for (let i = 0; i < 20; i++) {
        lineNumbers.push(<div key={i}>{i + 1}</div>);
    }

    const descriptionLines = splitIntoLines(researchInfo.description);

    return (
        <Window
            appName="Matlab"
            width={1250}
            height={600}
            children={
                <div className="bg-white w-full h-full flex flex-col">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <MacOSLoader size={60} />
                            <p className="mt-4 text-gray-400">Loading research data...</p>
                        </div>
                    ) : (
                        <>
                            {/* MATLAB Toolbar */}
                            <div className="bg-gray-100 border-b border-gray-300">
                                {/* Main toolbar */}
                                <div className="flex items-center px-2 py-1 border-b border-gray-200">
                                    <div className="flex gap-4">
                                        <button className="px-4 py-1 text-xs font-medium text-gray-700 rounded">HOME</button>
                                        <button className="px-4 py-1 text-xs font-medium text-gray-700 rounded">PLOTS</button>
                                        <button className="px-4 py-1 text-xs font-medium text-gray-700 rounded">APPS</button>
                                        <button className="px-4 py-1 text-xs font-medium text-white bg-blue-600 rounded">EDITOR</button>
                                        <button className="px-4 py-1 text-xs font-medium text-gray-700 rounded">PUBLISH</button>
                                        <button className="px-4 py-1 text-xs font-medium text-gray-700 rounded">VIEW</button>
                                    </div>
                                </div>
                            </div>

                            {/* Main content area */}
                            <div className="flex">
                                {/* Left sidebar - Current Folder */}
                                <div className="w-[20%] bg-gray-50 border-r border-gray-300 flex flex-col">
                                    <div className="p-2 border-b border-gray-200">
                                        <p className="text-xs font-semibold text-gray-700">Current Folder</p>
                                    </div>
                                    <div className="overflow-auto p-2">
                                        <div className="text-xs">
                                            <div className="flex items-center gap-1 py-1">
                                                <IoCaretDownOutline className="w-3 h-3" />
                                                <IoFolderOpenOutline className="w-4 h-4 text-yellow-500" />
                                                <p className="text-gray-700">Aryan's Research</p>
                                            </div>

                                            <div className="ml-4">
                                                <div className="flex items-center gap-1 py-1">
                                                    <IoCaretDownOutline className="w-3 h-3" />
                                                    <IoFolderOpenOutline className="w-4 h-4 text-yellow-500" />
                                                    <p className="text-gray-700">Photonics Lab</p>
                                                </div>

                                                <div className="ml-4">
                                                    <div className="flex items-center gap-1 py-1 hover:bg-gray-200 rounded cursor-pointer bg-blue-100">
                                                        <IoDocumentOutline className="w-4 h-4 text-blue-600" />
                                                        <p className="text-gray-700">research_overview.m</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 py-1 rounded ">
                                                        <IoDocumentOutline className="w-4 h-4 text-gray-600" />
                                                        <p className="text-gray-700">algorithms.py</p>
                                                    </div>
                                                    <div className="flex items-center gap-1 py-1 rounded">
                                                        <IoDocumentOutline className="w-4 h-4 text-gray-600" />
                                                        <p className="text-gray-700">data-analysis.py</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center - Editor */}
                                <div className="flex flex-col">
                                    {/* Tab bar */}
                                    <div className="bg-gray-100 border-b border-gray-300 flex">
                                        <div className="flex items-center gap-1 px-3 py-1 bg-white border-r border-gray-300">
                                            <p className="text-xs text-gray-700">research_overview.m</p>
                                            <p className="ml-2 text-gray-500 ">×</p>
                                        </div>
                                    </div>

                                    {/* Code editor */}
                                    <div className="flex-1 bg-white overflow-auto">
                                        <div className="flex">
                                            {/* Line numbers */}
                                            <div className="bg-gray-50 text-right pr-2 pl-4 py-4 text-xs text-gray-500">
                                                {lineNumbers}
                                            </div>

                                            {/* "Code" */}
                                            <div className="flex-1 p-4 font-mono text-sm">
                                                <p className="text-green-700">% Research Overview - Aryan Gupta</p>
                                                <p className="text-green-700 mb-2">% {researchInfo.lab}</p>

                                                <p className="text-green-700">% Research Description</p>
                                                <p>research_description = </p>
                                                {descriptionLines.map((line, index) => (
                                                    <p key={index} className="ml-4 text-purple-600">
                                                        '{line}'{index < descriptionLines.length - 1 ? ' ...' : ''};
                                                    </p>
                                                ))}
                                                <p className="mb-2"></p>

                                                <div>
                                                    <span className="text-blue-500">disp</span>
                                                    <span>(</span>
                                                    <span>research_description</span>
                                                    <span>);</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right sidebar - Workspace */}
                                <div className="bg-gray-50 border-l border-gray-300 flex flex-col w-[20%]">
                                    <div className="p-2 border-b border-gray-200">
                                        <p className="text-xs font-semibold text-gray-700">Workspace</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-xs">
                                            {/* Header */}
                                            <div className="flex border-b border-gray-200 p-2 font-medium text-gray-700">
                                                <div className="flex-1">Name</div>
                                                <div className="flex-1">Value</div>
                                            </div>

                                            {/* Rows */}
                                            <div className="flex hover:bg-gray-100 p-2">
                                                <div className="flex-1 text-gray-700">research_areas</div>
                                                <div className="flex-1 text-gray-600">{researchInfo.areas}</div>
                                            </div>

                                            <div className="flex hover:bg-gray-100 p-2">
                                                <div className="flex-1 text-gray-700">publications</div>
                                                <div className="flex-1 text-gray-600">{researchInfo.publications}</div>
                                            </div>

                                            <div className="flex hover:bg-gray-100 p-2">
                                                <div className="flex-1 text-gray-700">current_project</div>
                                                <div className="flex-1 text-gray-600">{researchInfo.current_project}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Command Window */}
                            <div className="h-full bg-white border-t border-gray-300">
                                <div className="bg-blue-700 text-white text-xs px-2 py-1 font-semibold">Command Window</div>
                                <div className="p-2 bg-gray-900 h-full overflow-auto font-mono text-xs rounded-b-lg">
                                    <div className="text-gray-300">&gt;&gt; run research_overview</div>
                                    <div className="text-gray-100 mt-1">
                                        <div>
                                            <p>{researchInfo.description}</p>
                                        </div>
                                    </div>
                                    <div className="text-gray-300 mt-2">&gt;&gt; |</div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            }
        />
    );
};

export default Matlab;