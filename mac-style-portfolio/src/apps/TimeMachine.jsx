import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { createPortal } from 'react-dom';
import { Context } from '../context';
import background from "../assets/optimized/macbg.webp";
import { IoChevronUp, IoChevronDown, IoClose } from "react-icons/io5";
import { getInformation } from "../getInfo"
import { useLaunchTarget } from '../useLaunchTarget';
import { MacOSLoader } from '../assets/loader';

const TimeMachine = () => {
    const { handleCloseWindow } = useContext(Context);
    const [experiences, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);
    const [browseIndex, setBrowseIndex] = useState(0);
    const [visible, setVisible] = useState(false);
    const exitTimeout = useRef(null);

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

    useLaunchTarget('Time Machine', experiences.length > 0, (title) => {
        const index = experiences.findIndex((experience) => experience.company === title);
        if (index >= 0) setBrowseIndex(index);
    });

    useEffect(() => {
        const frame = requestAnimationFrame(() => setVisible(true));
        return () => {
            cancelAnimationFrame(frame);
            clearTimeout(exitTimeout.current);
        };
    }, []);

    const exitTimeMachine = useCallback(() => {
        setVisible(false);
        exitTimeout.current = setTimeout(() => handleCloseWindow("Time Machine"), 400);
    }, [handleCloseWindow]);

    const goBackInTime = () => setBrowseIndex((index) => Math.min(experiences.length - 1, index + 1));
    const goForwardInTime = () => setBrowseIndex((index) => Math.max(0, index - 1));

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') exitTimeMachine();
            if (e.key === 'ArrowUp') setBrowseIndex((index) => Math.min(experiences.length - 1, index + 1));
            if (e.key === 'ArrowDown') setBrowseIndex((index) => Math.max(0, index - 1));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [experiences.length, exitTimeMachine]);

    const snapshotCard = (experience, depth) => (
        <div
            className="absolute left-1/2 top-1/2 w-[620px] rounded-xl border border-gray-700 bg-gray-900 shadow-2xl overflow-hidden transition-all duration-500"
            style={{
                transform: `translate(-50%, -50%) translateY(${-depth * 34}px) scale(${1 - depth * 0.07})`,
                filter: depth === 0 ? 'none' : `brightness(${Math.max(0.2, 0.55 - (depth - 1) * 0.12)})`,
                zIndex: 100 - depth
            }}
        >
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <p className="flex-1 text-center text-sm text-gray-300">{experience.date}</p>
            </div>

            <img src={experience.image} alt={experience.company} className="w-full h-40 object-cover" />

            <div className="p-5">
                <p className="text-2xl font-bold text-white">{experience.company}</p>
                <p className="text-lg text-gray-300 mt-0.5">{experience.role}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                    {(experience.tech || '').split(", ").map((item, i) => (
                        <div key={i} className={`px-3 py-1.5 ${experience.color} bg-opacity-50 text-gray-200 rounded-lg text-sm`}>
                            {item}
                        </div>
                    ))}
                </div>

                <p className="text-gray-300 mt-4 leading-relaxed">{experience.description}</p>
            </div>
        </div>
    );

    return createPortal(
        <div
            className={`fixed inset-0 z-[2000] overflow-hidden select-none transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${visible ? 'blur-2xl scale-110' : 'blur-none scale-100'}`}
                style={{ backgroundImage: `url(${background})` }}
            />
            <div className="absolute inset-0 bg-black/65" />

            <button
                onClick={exitTimeMachine}
                className="absolute top-6 left-6 w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors z-[200]"
            >
                <IoClose className="w-5 h-5" />
            </button>

            {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <MacOSLoader size={60} />
                    <p className="mt-4 text-gray-400">Loading experiences...</p>
                </div>
            ) : experiences.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-white">No snapshots available.</p>
                </div>
            ) : (
                <>
                    <div className={`absolute inset-0 transition-transform duration-500 ${visible ? 'scale-100' : 'scale-110'}`}>
                        {experiences.slice(browseIndex, browseIndex + 5).map((experience, depth) => (
                            <div key={browseIndex + depth}>
                                {snapshotCard(experience, depth)}
                            </div>
                        ))}
                    </div>

                    <div className="absolute top-1/2 left-1/2 ml-[330px] -translate-y-1/2 flex flex-col items-center gap-2 z-[200]">
                        <button
                            onClick={goBackInTime}
                            disabled={browseIndex === experiences.length - 1}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 transition-colors"
                        >
                            <IoChevronUp />
                        </button>
                        <button
                            onClick={goForwardInTime}
                            disabled={browseIndex === 0}
                            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-white hover:bg-gray-700 disabled:opacity-30 transition-colors"
                        >
                            <IoChevronDown />
                        </button>
                    </div>

                    <div className="absolute right-0 top-0 bottom-0 w-56 flex flex-col justify-center gap-1 pr-3 z-[200]">
                        {experiences.map((experience, index) => (
                            <div key={index}>
                                <button
                                    onClick={() => setBrowseIndex(index)}
                                    className="w-full flex items-center justify-end gap-3 group"
                                >
                                    <p className={`text-sm transition-colors ${index === browseIndex ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                        {experience.date}
                                    </p>
                                    <div className={`h-px transition-all ${index === browseIndex ? 'w-10 bg-white' : 'w-5 bg-gray-500 group-hover:bg-gray-300'}`} />
                                </button>

                                {index < experiences.length - 1 && (
                                    <div className="flex flex-col items-end gap-1 py-1">
                                        {[0, 1, 2].map((tick) => (
                                            <div key={tick} className="w-2.5 h-px bg-gray-600" />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 z-[200]">
                        Use the arrows or press ↑ / ↓ to travel, Esc to leave
                    </p>
                </>
            )}
        </div>,
        document.body
    );
};

export default TimeMachine;
