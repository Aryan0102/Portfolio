import Window from "../components/Window";
import { IoCheckmarkCircle, IoEllipseOutline, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { MdCode, MdSchool, MdTravelExplore, MdFitnessCenter, MdBusiness } from "react-icons/md";
import { useState, useEffect } from "react";
import { getInformation } from "../getInfo"
import { MacOSLoader } from '../assets/loader';

const categories = [
  { name: "All", icon: <IoEllipseOutline />, color: "#3b82f6" },
  { name: "Career", icon: <MdBusiness />, color: "#10b981" },
  { name: "Education", icon: <MdSchool />, color: "#f59e0b" },
  { name: "Travel", icon: <MdTravelExplore />, color: "#8b5cf6" },
  { name: "Personal", icon: <MdFitnessCenter />, color: "#ef4444" },
  { name: "Projects", icon: <MdCode />, color: "#06b6d4" }
];

const Reminders = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedItems, setExpandedItems] = useState([]);
  const [bucketListItems, setBucketListItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getInformation("BucketList");
        setBucketListItems(data);
      } catch (error) {
        console.error("Error fetching bucket list data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleExpanded = (id) => {
    setExpandedItems((items) => {
      if (items.includes(id)) {
        return items.filter(item => item !== id);
      } else {
        return [...items, id];
      }
    });
  };

  // Filter items
  const filteredItems = selectedCategory === "All" ? bucketListItems : bucketListItems.filter(item => item.category === selectedCategory);

  return (
    <Window
      appName="Reminders"
      width={900}
      height={650}
      children={
        <div className="bg-gray-900 w-full h-full rounded-b-lg flex">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <MacOSLoader size={60} />
              <p className="mt-4 text-gray-400">Loading maps...</p>
            </div>
          ) : (
            <>
              {/* Left Sidebar */}
              <div className="w-[30%] h-full bg-gray-800 border-r border-gray-700 p-4">
                <p className="text-lg font-semibold text-white mb-4">Reminders</p>

                <div className="space-y-1">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors
                  ${selectedCategory === category.name ? "bg-blue-500/20 text-blue-400" : "hover:bg-gray-700 text-gray-300"}`}
                    >
                      <div className="flex items-center gap-2">
                        <p style={{ color: category.color }}>{category.icon}</p>
                        <p className="text-sm">{category.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 h-full overflow-auto p-6">
                <h3 className="text-sm font-medium text-gray-400 mb-4">
                  {selectedCategory} - {filteredItems.length}
                </h3>

                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            {item.completed == "TRUE" ? (<IoCheckmarkCircle className="w-5 h-5 text-green-500" />) : (<IoEllipseOutline className="w-5 h-5 text-gray-500" />)}
                          </div>

                          <div className="flex-1">
                            <p className={`text-white ${item.completed == "TRUE" ? "line-through opacity-50" : ""}`}>
                              {item.title}
                            </p>
                          </div>

                          <button onClick={() => toggleExpanded(item.id)} className="text-gray-400 hover:text-gray-300">
                            {expandedItems.includes(item.id) ? (<IoChevronUp className="w-5 h-5" />) : (<IoChevronDown className="w-5 h-5" />)}
                          </button>
                        </div>

                        {expandedItems.includes(item.id) && (
                          <div className="mt-3 ml-8">
                            <p className="text-sm text-gray-400">
                              {item.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      }
    />
  );
};

export default Reminders;