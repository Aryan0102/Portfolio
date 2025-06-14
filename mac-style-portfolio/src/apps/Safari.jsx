import { useState, useEffect } from "react";
import Window from "../components/Window";
import { IoSearch, IoChevronBackOutline, IoChevronForwardOutline, IoShareOutline, IoAdd, IoCopyOutline } from "react-icons/io5";
import { IoIosRefresh } from "react-icons/io";
import { getInformation } from "../getInfo"
import { MacOSLoader } from '../assets/loader';

const Safari = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getInformation("Safari");
        setPages(data);
      } catch (error) {
        console.error("Error fetching webpages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Window
      appName="Safari"
      width={1200}
      height={700}
      children={
        <div className=" bg-[#3e4241] w-full h-full flex flex-col">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <MacOSLoader size={60} />
              <p className="mt-4 text-gray-400">Loading projects...</p>
            </div>
          ) : (
            <>
              {/* Search Bar && Tabs */}
              <div className="w-full h-[8%] flex flex-col bg-black/20">

                {/* Search Bar and buttons */}
                <div className="w-full h-[60%] justify-center items-center flex">

                  {/* Back/Forward/Refresh Buttons */}
                  <div className="w-[20%] h-[60%] text-white px-4 rounded-sm outline-none flex items-center justify-start">
                    <IoChevronBackOutline className="text-white w-4 h-4 mr-2" />
                    <IoChevronForwardOutline className="text-white w-4 h-4 mr-2" />
                    <IoIosRefresh className="text-white w-3 h-3 mr-2" />
                  </div>

                  {/* Search Bar */}
                  <div className="w-[50%] h-[60%] bg-black/20 text-white px-4 rounded-sm outline-none flex items-center justify-center">
                    <IoSearch className="text-white w-3 h-3 mr-2" />
                    <p className="text-xs">Search or enter address</p>
                  </div>

                  {/* Right Side Buttons */}
                  <div className="w-[20%] h-[60%] text-white px-4 rounded-sm outline-none flex items-center justify-end">
                    <IoShareOutline className="text-white w-4 h-4 mr-2" />
                    <IoAdd className="text-white w-4 h-4 mr-2" />
                    <IoCopyOutline className="text-white w-3 h-3 mr-2" />
                  </div>

                </div>

                {/* Tabs */}
                <div className="w-full h-[40%]">
                  <div className="flex h-full">
                    {pages.map((page, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        style={{ width: `${100 / pages.length}%` }}
                        className={`text-xs transition-all ${activeTab === index
                          ? "bg-[#3e4241] text-white"
                          : "bg-black/30 text-gray-400 hover:bg-black/40"
                          }`}
                      >
                        {page.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Iframe Content */}
              <div className="w-full h-full">
                <iframe
                  src={pages[activeTab].url}
                  className="w-full h-full border-0"
                  title={pages[activeTab].title}
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </>
          )}
        </div>
      }
    />
  )
}

export default Safari