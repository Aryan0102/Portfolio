import { useState, useEffect } from 'react';
import Window from "../components/Window";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { getInformation } from "../getInfo"
import { MacOSLoader } from '../assets/loader';

const TimeMachine = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [experiences, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getInformation("Experience");
                setExperience(data);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <Window
            appName="Time Machine"
            width={900}
            height={650}
            children={
                <div className="bg-gray-900 w-full h-full flex flex-col">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <MacOSLoader size={60} />
                            <p className="mt-4 text-gray-400">Loading experiences...</p>
                        </div>
                    ) : (
                        <>
                            {/* Navigation */}
                            <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between">
                                <h1 className="text-xl font-semibold text-white">Work Experience</h1>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                                        className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        disabled={activeIndex === 0}
                                    >
                                        <IoChevronBack />
                                    </button>
                                    <button
                                        onClick={() => setActiveIndex(Math.min(experiences.length - 1, activeIndex + 1))}
                                        className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        disabled={activeIndex === experiences.length - 1}
                                    >
                                        <IoChevronForward />
                                    </button>
                                </div>
                            </div>

                            {/* Timeline dots */}
                            <div className="px-4 mt-3 mb-1 flex justify-center gap-2 bg-gray-900">
                                {experiences.map((dot, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? experiences[index].color : 'bg-gray-700'}`}
                                    />
                                ))}
                            </div>

                            {/* Content */}
                            <div className="p-6 bg-gray-900">
                                <div className="bg-gray-800/50 backdrop-blur rounded-xl overflow-hidden h-full shadow-2xl">
                                    <img
                                        src={experiences[activeIndex].image}
                                        alt={experiences[activeIndex].company}
                                        className="w-full h-70 object-cover"
                                    />
                                    <div className="p-6">
                                        <div className="mb-2">
                                            <p className="text-white mb-1 flex items-center justify-between gap-2">
                                                <p className='text-2xl font-bold'>{experiences[activeIndex].company}</p>
                                                <div className={`text-sm text-white py-1 px-2 ${experiences[activeIndex].color} bg-opacity-50 rounded-lg`}>
                                                    {experiences[activeIndex].date}
                                                </div>
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <p className="text-lg text-gray-300">
                                                    {experiences[activeIndex].role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {experiences[activeIndex].tech.split(", ").map((item, i) => (
                                                <div key={i} className={`px-3 py-1.5 ${experiences[activeIndex].color} bg-opacity-50 text-gray-200 rounded-lg text-sm backdrop-blur`}>
                                                    {item}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-gray-900/50 rounded-lg p-4">
                                            <p className="text-gray-300">
                                                {experiences[activeIndex].description}
                                            </p>
                                        </div>
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

export default TimeMachine;