import { useState, useEffect } from 'react';
import Window from "../components/Window";
import { getInformation } from "../getInfo"
import { useLaunchTarget } from '../useLaunchTarget';
import { MacOSLoader } from '../assets/loader';
import { IoSearch, IoCompass, IoCheckmarkCircle, IoDownload } from "react-icons/io5";

const SkillIcon = ({ src, alt, size }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`${size} rounded-xl bg-gray-800 flex-shrink-0 flex items-center justify-center overflow-hidden`}>
      {!failed && (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className="w-full h-full object-contain p-2"
        />
      )}
    </div>
  );
};

const AppStore = () => {
  const [activeTab, setActiveTab] = useState('discover');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

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

  useLaunchTarget('App Store', !loading, (title) => setQuery(title));

  const mastered = skills.filter(skill => skill.learned === 'TRUE');
  const learning = skills.filter(skill => skill.learned === "FALSE");
  const featuredSkill = skills[0];

  const navItems = [
    { id: 'discover', label: 'Discover', icon: <IoCompass className="w-4 h-4 text-blue-500" /> },
    { id: 'mastered', label: 'Mastered', icon: <IoCheckmarkCircle className="w-4 h-4 text-green-500" /> },
    { id: 'learning', label: 'Learning', icon: <IoDownload className="w-4 h-4 text-purple-500" /> }
  ];

  const search = query.trim().toLowerCase();
  const isSearching = search.length > 0;
  const results = isSearching
    ? skills.filter(skill => (skill.title || '').toLowerCase().includes(search) || (skill.description || '').toLowerCase().includes(search))
    : [];

  const toColumns = (items, rows = 3) => {
    const columns = [];
    for (let i = 0; i < items.length; i += rows) {
      columns.push(items.slice(i, i + rows));
    }
    return columns.slice(0, 3);
  };

  const skillRow = (skill, index) => (
    <div key={index} className="flex items-center gap-3 py-3">
      <SkillIcon src={skill.icon} alt={skill.title} size="w-14 h-14" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{skill.title}</p>
        <p className="text-xs text-gray-400 truncate">{skill.description}</p>
      </div>
      <button className="px-4 py-1 rounded-full bg-gray-700 text-blue-400 text-xs font-bold hover:bg-gray-600 transition-colors flex-shrink-0">
        {skill.learned === 'TRUE' ? 'OPEN' : 'GET'}
      </button>
    </div>
  );

  const shelf = (title, items, seeAllTab) => (
    <div className="border-t border-gray-800 pt-5">
      <div className="flex items-end justify-between mb-1">
        <p className="text-2xl font-bold text-white">{title}</p>
        <button onClick={() => setActiveTab(seeAllTab)} className="text-sm text-blue-400 hover:underline">
          See All
        </button>
      </div>
      <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-x-8">
        {toColumns(items).map((column, index) => (
          <div key={index} className="divide-y divide-gray-800">
            {column.map((skill, i) => skillRow(skill, i))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Window
      appName="App Store"
      width={1200}
      height={700}
      minWidth={620}
      minHeight={460}
      children={
        <div className="bg-gray-900 w-full h-full flex">
          <div className="w-56 flex-shrink-0 bg-gray-950 border-r border-gray-800 hidden @2xl:flex flex-col p-3">
            <div className="flex items-center gap-2 h-7 px-2 rounded-md bg-gray-800 mb-4">
              <IoSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 cursor-text focus:outline-none"
              />
            </div>

            <div className="space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setQuery(''); }}
                  className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors ${
                    activeTab === item.id && !isSearching
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  <p>{item.label}</p>
                </button>
              ))}
            </div>

            <div className="mt-auto flex items-center gap-2 px-2 py-2 border-t border-gray-800">
              <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">AG</div>
              <p className="text-sm text-gray-300">Aryan Gupta</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto noscrollbar">
            <div className="@2xl:hidden sticky top-0 z-10 flex items-center gap-2 p-3 bg-gray-900 border-b border-gray-800">
              <div className="flex items-center gap-2 h-7 px-2 rounded-md bg-gray-800 flex-1">
                <IoSearch className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  className="flex-1 min-w-0 bg-transparent text-sm text-white placeholder-gray-400 cursor-text focus:outline-none"
                />
              </div>

              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setQuery(''); }}
                  title={item.label}
                  className={`w-7 h-7 flex items-center justify-center rounded-md flex-shrink-0 ${
                    activeTab === item.id && !isSearching ? 'bg-gray-800' : 'hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <MacOSLoader size={60} />
                <p className="mt-4 text-gray-400">Loading skills...</p>
              </div>
            ) : isSearching ? (
              /* Search results */
              <div className="p-6">
                <p className="text-2xl font-bold text-white mb-2">Results for “{query}”</p>
                {results.length === 0 ? (
                  <p className="text-sm text-gray-400">No skills found.</p>
                ) : (
                  <div className="divide-y divide-gray-800">
                    {results.map((skill, index) => skillRow(skill, index))}
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                {activeTab === 'discover' && (
                  <div className="space-y-6">
                    {featuredSkill && (
                      <div className="rounded-2xl bg-gray-800 border border-gray-700 overflow-hidden">
                        <div className="p-6">
                          <p className="text-xs font-bold text-blue-400 tracking-wide mb-1">FEATURED</p>
                          <p className="text-3xl font-bold text-white">{featuredSkill.title}</p>
                          <p className="text-gray-300 mt-1 max-w-xl">{featuredSkill.description}</p>
                        </div>
                        <div className="flex items-center gap-3 px-6 py-4 bg-gray-900 border-t border-gray-700">
                          <SkillIcon src={featuredSkill.icon} alt={featuredSkill.title} size="w-12 h-12" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{featuredSkill.title}</p>
                            <p className="text-xs text-gray-400">
                              {featuredSkill.learned === 'TRUE' ? 'Mastered' : 'Currently learning'}
                            </p>
                          </div>
                          <button className="px-4 py-1 rounded-full bg-gray-700 text-blue-400 text-xs font-bold hover:bg-gray-600 transition-colors">
                            {featuredSkill.learned === 'TRUE' ? 'OPEN' : 'GET'}
                          </button>
                        </div>
                      </div>
                    )}

                    {shelf('Skills I Use Every Day', mastered, 'mastered')}
                    {shelf('Currently Learning', learning, 'learning')}
                  </div>
                )}

                {activeTab === 'mastered' && (
                  <div>
                    <p className="text-2xl font-bold text-white mb-2">Mastered</p>
                    <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 gap-x-8">
                      {toColumns(mastered, Math.ceil(mastered.length / 3)).map((column, index) => (
                        <div key={index} className="divide-y divide-gray-800">
                          {column.map((skill, i) => skillRow(skill, i))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'learning' && (
                  <div>
                    <p className="text-2xl font-bold text-white mb-2">Currently Learning</p>
                    <div className="divide-y divide-gray-800">
                      {learning.map((skill, index) => (
                        <div key={index} className="flex items-center gap-4 py-4">
                          <SkillIcon src={skill.icon} alt={skill.title} size="w-16 h-16" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-white">{skill.title}</p>
                            <p className="text-sm text-gray-400">{skill.description}</p>
                          </div>
                          <button className="px-4 py-1 rounded-full bg-gray-700 text-blue-400 text-xs font-bold hover:bg-gray-600 transition-colors flex-shrink-0">
                            GET
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
