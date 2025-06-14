import React, { useState, useEffect } from 'react';
import Window from "../components/Window";
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
import { getInformation } from "../getInfo"
import { MacOSLoader } from '../assets/loader';

const Tips = () => {
    const [appGuides, setAppGuides] = useState([]);
    const [loading, setLoading] = useState(true);

    const portfolioTips = [
        {
            title: 'Click on dock icons to open apps',
            description: 'Each icon in the dock opens a different application showcasing various aspects of my work and skills.'
        },
        {
            title: 'Drag windows around',
            description: 'Click and hold on any title bar to drag windows around the screen, just like in macOS.'
        },
        {
            title: 'Desktop Shortcuts',
            description: 'Resume, LinkedIn, and GitHub are available on the desktop for quick access.'
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
            'MatlabIcon': MatlabIcon
        };

        return iconMap[iconName] || TipsIcon;
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

    return (
        <Window
            appName="Tips"
            width={800}
            height={600}
            children={
                <div className="bg-gray-900 w-full h-full flex flex-col text-white">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <MacOSLoader size={60} />
                            <p className="mt-4 text-gray-400">Loading tips...</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-8 bg-gray-900">
                                {/* Portfolio Card */}
                                <div className="flex items-center justify-center mb-12">
                                    <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl w-[80%] flex flex-col items-center">
                                        <p className="text-3xl font-semibold text-white mb-2 pt-10">Welcome to My Portfolio!</p>
                                        <p className="text-white mb-5">Learn how to navigate my work.</p>
                                        {/* Traditional Website Disclaimer */}
                                        <p className='max-w-sm text-center pb-10'>Not a fan? Click the return icon on the desktop to go to the traditional website</p>
                                    </div>
                                </div>

                                {/* Navigation Tips */}
                                <div className="max-w-3xl mx-auto mb-12">
                                    <div className="space-y-4">
                                        {portfolioTips.map((tip, index) => (
                                            <div key={index} className="flex p-4 hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                                                <div>
                                                    <p className="font-semibold mb-1">{tip.title}</p>
                                                    <p className="text-gray-400 text-sm">{tip.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* App Features */}
                                <div className="max-w-3xl mx-auto">
                                    <p className="text-3xl font-semibold mb-8">Explore My Apps</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {appGuides.map((app, index) => (
                                            <div key={index} className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-700 cursor-pointer transition-colors flex flex-col items-center text-center">
                                                <img src={getIconByName(app.icon)} alt={app.title} className="w-16 h-16 mb-4" />
                                                <h3 className="font-semibold mb-2">{app.title}</h3>
                                                <p className="text-white text-xs">{app.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* End section */}
                                <div className="max-w-3xl mx-auto mt-12 text-center pb-8">
                                    <div className="bg-gray-800 rounded-2xl p-8">
                                        <p className="font-semibold text-xl text-white">
                                            Feel free to explore and don't hesitate to reach out!
                                        </p>
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

export default Tips;