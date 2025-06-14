import { useState, useEffect } from 'react';
import Window from "../components/Window";
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscSettingsGear, VscAccount, VscGithubInverted } from "react-icons/vsc";
import { getInformation } from "../getInfo"
import { MacOSLoader } from '../assets/loader';

const VsCode = () => {
  const [activeFile, setActiveFile] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getInformation("Projects");
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const currentProject = projects[activeFile];

  return (
    <Window
      appName="Visual Studio Code"
      width={1200}
      height={700}
      children={
        <div className="bg-stone-900 w-full h-full flex">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <MacOSLoader size={60} />
              <p className="mt-4 text-gray-400">Loading projects...</p>
            </div>
          ) : (
            <>
              {/* Activity Bar */}
              <div className="w-12 bg-neutral-800 flex flex-col items-center py-2 border-r">
                <div className="p-2 text-white bg-stone-900 rounded">
                  <VscFiles className="w-5 h-5" />
                </div>
                <div className="p-2 text-gray-500 hover:text-white">
                  <VscSearch className="w-5 h-5" />
                </div>
                <div className="p-2 text-gray-500 hover:text-white">
                  <VscSourceControl className="w-5 h-5" />
                </div>
                <div className="p-2 text-gray-500 hover:text-white">
                  <VscDebugAlt className="w-5 h-5" />
                </div>
                <div className="p-2 text-gray-500 hover:text-white">
                  <VscExtensions className="w-5 h-5" />
                </div>
                <div className="mt-auto p-2 text-gray-500 hover:text-white">
                  <VscAccount className="w-5 h-5" />
                </div>
                <div className="p-2 text-gray-500 hover:text-white">
                  <VscSettingsGear className="w-5 h-5" />
                </div>
              </div>

              {/* Side Bar - File Explorer */}
              <div className="w-64 bg-neutral-800 border-r border-b">
                <div className="p-3 text-xs text-white">PROJECTS</div>
                <div className="text-gray-200">
                  {projects.map((project, index) => (
                    <div
                      key={project.title}
                      className={`flex items-center gap-2 py-1.5 px-4 hover:bg-gray-700 cursor-pointer ${activeFile === index ? 'bg-gray-700' : ''}`}
                      onClick={() => setActiveFile(index)}
                    >
                      <VscFiles className="w-4 h-4 text-gray-400" />
                      <p className="text-sm">{project.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Editor */}
              <div className="flex flex-col">
                {/* Tabs */}
                <div className="bg-neutral-800 flex border-b">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#1e1e1e] border-r">
                    <VscFiles className="text-gray-300 w-4 h-4" />
                    <p className="text-sm text-gray-300">{currentProject.title}</p>
                  </div>
                </div>

                {/* Project Display */}
                <div className="flex-1 overflow-auto bg-[#1e1e1e] p-8">
                  <div className="max-w-4xl mx-auto">
                    {/* Project Title */}
                    <p className="text-4xl font-bold text-white mb-6">{currentProject.title}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {currentProject?.tech.split(", ").map((tech) => {
                        return (
                          <div key={tech} className="flex items-center bg-blue-500 px-4 py-2 rounded-lg">
                            <p className="text-sm font-medium text-white">{tech}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Image */}
                    <img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="w-full h-full object-cover mb-8 rounded-lg"
                    />

                    {/* Description */}
                    <div className="bg-neutral-800 rounded-lg p-6 mb-8">
                      <p className="text-white text-base">
                        {currentProject.description}
                      </p>
                    </div>

                    {/* GitHub Link */}
                    {currentProject.github ? (
                      <a
                        href={currentProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
                      >
                        <VscGithubInverted className="w-5 h-5" />
                        <p className="font-medium">View on GitHub</p>
                      </a>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-neutral-800 text-gray-400 px-6 py-3 rounded-lg">
                        <VscGithubInverted className="w-5 h-5" />
                        <p className="font-medium">Code available on request</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Bar */}
                <div className="bg-blue-500 h-6 flex items-center justify-between px-4 text-xs text-white">
                  <div className="flex items-center gap-4">
                    <p>Markdown</p>
                    <p>UTF-8</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      }
    />
  );
};

export default VsCode;