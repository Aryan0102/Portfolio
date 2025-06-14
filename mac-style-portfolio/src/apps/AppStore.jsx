import { useState, useEffect } from 'react';
import Window from "../components/Window";
import { getInformation } from "../getInfo"
import { MacOSLoader } from '../assets/loader';
import { IoSearch, IoCheckmarkCircle, IoBookOutline, IoApps, IoCodeSlash, IoBrush, IoBuild, IoChatbubbleOutline } from "react-icons/io5";

const AppStore = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all-skills');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getInformation("Skills");
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const mastered = skills.filter(skill => skill.learned === 'TRUE');
  const learning = skills.filter(skill => skill.learned === "FALSE");

  const navItems = [
    { id: 'discover', label: 'Discover', icon: <IoSearch className="w-5 h-5" /> },
    { id: 'mastered', label: 'Mastered', icon: <IoCheckmarkCircle className="w-5 h-5" /> },
    { id: 'learning', label: 'Learning', icon: <IoBookOutline className="w-5 h-5" /> }
  ];

  const categories = [
    { id: 'all-skills', label: 'All Skills', icon: <IoApps className="w-4 h-4" /> },
    { id: 'development', label: 'Development', icon: <IoCodeSlash className="w-4 h-4" /> },
    { id: 'design', label: 'Design', icon: <IoBrush className="w-4 h-4" /> },
    { id: 'tools', label: 'Tools', icon: <IoBuild className="w-4 h-4" /> },
    { id: 'languages', label: 'Languages', icon: <IoChatbubbleOutline className="w-4 h-4" /> }
  ];

  const featuredSkill = skills[0];

  return (
    <Window
      appName="App Store"
      width={1200}
      height={700}
      children={
        <div className="bg-gray-900 w-full h-full flex">
          {/* Sidebar */}
          <div className="w-64 bg-neutral-850 border-r p-4">
            <div className="space-y-6">
              {/* Main Navigation */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-3">BROWSE</p>
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === item.id 
                          ? 'bg-gray-800 text-white' 
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {item.icon}
                      <p>{item.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-3">CATEGORIES</p>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      {category.icon}
                      <p>{category.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-gray-850">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <MacOSLoader size={60} />
                <p className="mt-4 text-gray-400">Loading skills...</p>
              </div>
            ) : (
              <div className="p-6">
                {/* Discover Tab */}
                {activeTab === 'discover' && (
                  <div className="space-y-8">
                    {/* Featured Section */}
                    {featuredSkill && (
                      <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8">
                        <p className="text-sm font-medium text-gray-300 mb-2">FEATURED</p>
                        <p className="text-4xl font-bold text-white mb-3">{featuredSkill.title}</p>
                        <p className="text-lg text-gray-300 mb-6 max-w-2xl">{featuredSkill.description}</p>
                        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                          {featuredSkill.learned === 'TRUE' ? 'View' : 'Start Learning'}
                        </button>
                      </div>
                    )}

                    {/* All Skills Grid */}
                    <div>
                      <p className="text-2xl font-bold text-white mb-4">All Skills</p>
                      <div className="grid grid-cols-3 gap-6">
                        {skills.map((skill, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-800 rounded-xl shadow-sm cursor-pointer overflow-hidden"
                          >
                            <div className="aspect-video bg-gray-700 flex items-center justify-center">
                              <img src={skill.icon} alt={skill.name} className="w-20 h-20" />
                            </div>
                            <div className="p-4">
                              <p className="font-semibold text-white mb-1">{skill.title}</p>
                              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{skill.description}</p>
                              <div className="flex items-center justify-between">
                                <p className="text-xs text-gray-500">
                                  {skill.learned === 'TRUE' ? 'Mastered' : 'In Progress'}
                                </p>
                                <button className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                  skill.learned === 'TRUE'
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
                                  {skill.learned === 'TRUE' ? 'OPEN' : 'GET'}
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mastered Tab */}
                {activeTab === 'mastered' && (
                  <div>
                    <p className="text-2xl font-bold text-white mb-6">Mastered Skills</p>
                    <div className="grid grid-cols-4 gap-4">
                      {mastered.map((skill, index) => (
                        <div key={index} className="text-center">
                          <div className="bg-gray-800 rounded-2xl p-4 shadow-sm cursor-pointer mb-2">
                            <img src={skill.icon} alt={skill.name} className="w-16 h-16 mx-auto" />
                          </div>
                          <p className="text-sm font-medium text-white">{skill.title}</p>
                          <p className="text-xs text-gray-500">Mastered</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning Tab */}
                {activeTab === 'learning' && (
                  <div>
                    <p className="text-2xl font-bold text-white mb-6">Currently Learning</p>
                    <div className="space-y-4">
                      {learning.map((skill, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-800 rounded-xl p-6 shadow-sm flex items-center gap-6"
                        >
                          <img src={skill.icon} alt={skill.name} className="w-16 h-16" />
                          <div className="flex-1">
                            <p className="font-semibold text-white mb-1">{skill.title}</p>
                            <p className="text-sm text-gray-400">{skill.description}</p>
                            <div className="mt-3 bg-gray-700 rounded-full h-2 w-48">
                              <div className="bg-blue-600 h-full rounded-full" style={{ width: '45%' }}></div>
                            </div>
                          </div>
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
                            Continue
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      }
    />
  );
};

export default AppStore;