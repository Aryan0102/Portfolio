import { useState, useEffect, useContext } from 'react';
import ControlCenter from "../assets/controlcenter.png";
import { IoSearch } from "react-icons/io5";
import { FaWifi } from "react-icons/fa";
import { IoIosBatteryFull } from "react-icons/io";
import { Context } from '../context';

const MenuBar = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    const { activeWindow } = useContext(Context);

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
                <div className="flex flex-row items-center gap-6">
                    <p className="font-bold text-2xl"></p>
                    <p className="font-semibold">{activeWindow || "Aryan Gupta"}</p>
                    <p className="font-semibold">File</p>
                    <p className="font-semibold">Edit</p>
                    <p className="font-semibold">View</p>
                    <p className="font-semibold">Go</p>
                    <p className="font-semibold">Window</p>
                    <p className="font-semibold">Help</p>
                </div>

                <div className="flex flex-row items-center gap-4">
                    <IoIosBatteryFull className="text-white w-5 h-5 cursor-pointer" />
                    <FaWifi className="text-white w-5 h-5 cursor-pointer" />
                    <IoSearch className="text-white w-5 h-5 cursor-pointer" />
                    <img src={ControlCenter} alt="Control Center" className="w-5 h-5 cursor-pointer" />
                    <div className='flex flex-row gap-2'>
                        <p>{formatDate(currentTime)}</p>
                        <p className="font-medium">{formatTime(currentTime)}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuBar