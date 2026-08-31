import { useState, useEffect, useContext } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";
import { IoIosBatteryFull } from "react-icons/io";
import { Context } from '../context';
import ControlCenter from './ControlCenter';
import AppleLogo from "../assets/optimized/applelogo.webp";

const MenuBar = () => {

    const [currentTime, setCurrentTime] = useState(new Date());

    const { activeWindow, spotlightOpen, toggleSpotlight } = useContext(Context);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="w-full h-10 flex backdrop-blur-sm bg-white/10 items-center justify-between px-4 shadow-md">
            <div className="text-white text-sm w-full flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3 lg:gap-6 min-w-0">
                    <img src={AppleLogo} alt="Apple Logo" className="w-4.5 h-4.5 cursor-pointer block flex-shrink-0" />
                    <p className="font-semibold truncate">{activeWindow || "Aryan Gupta"}</p>
                    <p className="font-semibold hidden md:block">File</p>
                    <p className="font-semibold hidden md:block">Edit</p>
                    <p className="font-semibold hidden lg:block">View</p>
                    <p className="font-semibold hidden lg:block">Go</p>
                    <p className="font-semibold hidden lg:block">Window</p>
                    <p className="font-semibold hidden lg:block">Help</p>
                </div>

                <div className="flex flex-row items-center gap-3 lg:gap-4 flex-shrink-0">
                    <IoIosBatteryFull className="text-white w-5 h-5 cursor-pointer hidden sm:block" />
                    <FaWifi className="text-white w-5 h-5 cursor-pointer hidden sm:block" />
                    <button onClick={toggleSpotlight} className={`p-1 -m-1 rounded ${spotlightOpen ? 'bg-white/25' : ''}`}>
                        <IoSearch className="text-white w-5 h-5 cursor-pointer" />
                    </button>
                    <ControlCenter />
                    <div className='flex flex-row gap-2'>
                        <p className="hidden md:block">{formatDate(currentTime)}</p>
                        <p className="font-medium">{formatTime(currentTime)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuBar
