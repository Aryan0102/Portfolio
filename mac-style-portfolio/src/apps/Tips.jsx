import React, { useState, useEffect, useContext } from 'react';
import Window from "../components/Window";
import { Context } from '../context';
import TipsIcon from "../assets/tipsicon.png"
import VSCodeIcon from '../assets/vscodeicon.png';
import ContactsIcon from '../assets/contactsicon.png';
import MailIcon from '../assets/mailicon.png';
import SafariIcon from '../assets/safari.png';
import TimeMachineIcon from '../assets/timemachine.png';
import AppStoreIcon from '../assets/appstore.png';
import MapsIcon from "../assets/mapsicon.png";
import RemindersIcon from "../assets/remindersicon.png"
import MatlabIcon from "../assets/matlabicon.png"
import PreviewIcon from "../assets/previewicon.png"
import { getInformation } from "../getInfo"
import { useLaunchTarget } from '../useLaunchTarget';
import { MacOSLoader } from '../assets/loader';
import { IoSearch, IoApps, IoMove, IoDocumentText, IoArrowUndo } from "react-icons/io5";

const Tips = () => {
    const { handleOpenWindow } = useContext(Context);
    const [appGuides, setAppGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');

    const portfolioTips = [
        {
            icon: <IoApps />,
            title: 'Click on dock icons to open apps',
            description: 'Each icon in the dock opens a different application showcasing various aspects of my work and skills.'
        },
        {
            icon: <IoSearch />,
            title: 'Search with Spotlight',
            description: 'Press ⌘K, or click the magnifier in the menu bar, to search every app and everything inside them.'
        },
        {
            icon: <IoMove />,
            title: 'Drag windows around',
            description: 'Click and hold on any title bar to drag windows around the screen, just like in macOS.'
        },
        {
            icon: <IoDocumentText />,
            title: 'Desktop Shortcuts',
            description: 'Resume, LinkedIn, and GitHub are available on the desktop for quick access.'
        },
        {
            icon: <IoArrowUndo />,
            title: 'Prefer the classic site?',
            description: 'Click the return icon on the desktop to go to the traditional website.'
        },
    ];

    const getIconByName = (iconName) => {
        const iconMap = {
            'MailIcon': MailIcon,
            "VSCodeIcon": VSCodeIcon,
            "ContactsIcon": ContactsIcon,
            'SafariIcon': SafariIcon,
            'TimeMachineIcon': TimeMachineIcon,
            'AppStoreIcon': AppStoreIcon,
            'MapsIcon': MapsIcon,
            'RemindersIcon': RemindersIcon,
            'MatlabIcon': MatlabIcon,
            'PreviewIcon': PreviewIcon
        };

        return iconMap[iconName] || TipsIcon;
    };

    const getWindowByName = (iconName) => {
        const windowMap = {
            'MailIcon': 'Mail',
            "VSCodeIcon": 'Visual Studio Code',
            "ContactsIcon": 'Contacts',
            'SafariIcon': 'Safari',
            'TimeMachineIcon': 'Time Machine',
            'AppStoreIcon': 'App Store',
            'MapsIcon': 'Maps',
            'RemindersIcon': 'Reminders',
            'MatlabIcon': 'Matlab',
            'PreviewIcon': 'Preview'
        };

        return windowMap[iconName] || 'Tips';
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getInformation("Tips");
                setAppGuides(data);
            } catch (error) {
                console.error("Error fetching tips:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useLaunchTarget('Tips', !loading, (title) => setQuery(title));

    const search = query.trim().toLowerCase();
    const isSearching = search.length > 0;

    const matches = (title, description) => (
        (title || '').toLowerCase().includes(search) || (description || '').toLowerCase().includes(search)
    );

    const tipResults = isSearching ? portfolioTips.filter((tip) => matches(tip.title, tip.description)) : [];
    const appResults = isSearching ? appGuides.filter((app) => matches(app.title, app.description)) : [];
    const resultCount = tipResults.length + appResults.length;

    return (
        <Window
            appName="Tips"
            width={900}
            height={620}
            children={
                <div className="bg-gray-900 w-full h-full flex flex-col text-white">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <MacOSLoader size={60} />
                            <p className="mt-4 text-gray-400">Loading tips...</p>
                        </div>
                    ) : (
                        <div className="flex-1 overflow-auto noscrollbar">
                            <div className="pt-8 pb-10 px-8">
                                <p className="text-3xl font-semibold text-center">Need help? Find answers here.</p>
                                <div className="mt-5 mx-auto w-[72%] max-w-[600px] flex items-center gap-2 h-9 px-4 rounded-full border border-gray-700 bg-gray-800">
                                    <IoSearch className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder="Search the tips"
                                        className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 cursor-text focus:outline-none"
                                    />
                                </div>
                            </div>

                            {isSearching ? (
                                /* Search results */
                                <div className="px-8 pb-8">
                                    {resultCount === 0 ? (
                                        <div className="text-center py-12">
                                            <p className="text-xl font-semibold">No Results</p>
                                            <p className="text-sm text-gray-400 mt-1">for “{query}”</p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-400 mb-2">
                                                {resultCount} {resultCount === 1 ? 'result' : 'results'} for “{query}”
                                            </p>
                                            <div>
                                                {tipResults.map((tip, index) => (
                                                    <div key={`tip-${index}`} className={`flex items-start gap-4 py-4 px-2 rounded-lg hover:bg-gray-800 ${index > 0 ? 'border-t border-gray-700' : ''}`}>
                                                        <div className="w-8 flex justify-center text-2xl text-blue-400 flex-shrink-0">{tip.icon}</div>
                                                        <div>
                                                            <p className="text-sm font-semibold">{tip.title}</p>
                                                            <p className="text-sm text-gray-400 mt-0.5">{tip.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {appResults.map((app, index) => (
                                                    <div
                                                        key={`app-${index}`}
                                                        onClick={() => handleOpenWindow(getWindowByName(app.icon))}
                                                        className="flex items-start gap-4 py-4 px-2 rounded-lg cursor-pointer hover:bg-gray-800 border-t border-gray-700"
                                                    >
                                                        <img src={getIconByName(app.icon)} alt={app.title} className="w-8 h-8 flex-shrink-0" />
                                                        <div>
                                                            <p className="text-sm font-semibold">{app.title}</p>
                                                            <p className="text-sm text-gray-400 mt-0.5">{app.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div className="px-8">
                                        <div className="max-w-2xl mx-auto">
                                            {portfolioTips.map((tip, index) => (
                                                <div key={index} className={`flex items-start gap-4 py-4 ${index > 0 ? 'border-t border-gray-700' : ''}`}>
                                                    <div className="w-8 flex justify-center text-2xl text-blue-400 flex-shrink-0">{tip.icon}</div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{tip.title}</p>
                                                        <p className="text-sm text-gray-400 mt-0.5">{tip.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-8 pt-12">
                                        <p className="text-xl font-semibold mb-4">Explore My Apps</p>
                                        <div className="grid grid-cols-3 gap-x-5 gap-y-6">
                                            {appGuides.map((app, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleOpenWindow(getWindowByName(app.icon))}
                                                    className="cursor-pointer group"
                                                >
                                                    <div className="rounded-xl bg-gray-800 border border-gray-700 aspect-[2/1] flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                                                        <img src={getIconByName(app.icon)} alt={app.title} className="w-12 h-12" />
                                                    </div>
                                                    <p className="mt-2.5 text-sm font-semibold">{app.title}</p>
                                                    <p className="text-sm text-gray-400 leading-snug">{app.description}</p>
                                                    <p className="text-sm text-gray-400 mt-0.5">In the Dock</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="px-8 pt-12 pb-10">
                                        <p className="text-xl font-semibold mb-4">Get in Touch</p>
                                        <div className="rounded-xl bg-gray-800 border border-gray-700 p-5 flex items-center gap-4">
                                            <div className="flex gap-2 flex-shrink-0">
                                                <img
                                                    src={MailIcon}
                                                    alt="Mail"
                                                    onClick={() => handleOpenWindow('Mail')}
                                                    className="w-12 h-12 cursor-pointer hover:scale-105 transition-transform"
                                                />
                                                <img
                                                    src={ContactsIcon}
                                                    alt="Contacts"
                                                    onClick={() => handleOpenWindow('Contacts')}
                                                    className="w-12 h-12 cursor-pointer hover:scale-105 transition-transform"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold">Feel free to explore, and don't hesitate to reach out!</p>
                                                <p className="text-sm text-gray-400 mt-0.5">Open Mail to send me a message, or Contacts for the rest of my details.</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            }
        />
    );
};

export default Tips;
