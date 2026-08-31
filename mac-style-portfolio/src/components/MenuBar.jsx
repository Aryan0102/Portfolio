import { useState, useEffect, useRef, useContext } from 'react';
import ControlCenter from "../assets/optimized/controlcenter.webp";
import { IoSearch, IoSunny, IoVolumeHigh, IoShareSocial, IoMoon, IoTv } from "react-icons/io5";
import { FaWifi, FaBluetoothB } from "react-icons/fa";
import { IoIosBatteryFull } from "react-icons/io";
import { Context } from '../context';
import AppleLogo from "../assets/optimized/applelogo.webp";

const MenuBar = () => {

    const [currentTime, setCurrentTime] = useState(new Date());
    const [controlOpen, setControlOpen] = useState(false);
    const [wifiOn, setWifiOn] = useState(true);
    const [bluetoothOn, setBluetoothOn] = useState(true);
    const [airdropOn, setAirdropOn] = useState(false);
    const [volume, setVolume] = useState(70);
    const controlRef = useRef(null);

    const { activeWindow, spotlightOpen, toggleSpotlight, brightness, setBrightness, focusMode, setFocusMode } = useContext(Context);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setControlOpen(false);
        };

        const handleMouseDown = (e) => {
            if (!controlRef.current?.contains(e.target)) setControlOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []);

    const slider = (icon, value, onChange, min) => {
        const percent = ((value - min) / (100 - min)) * 100;

        return (
            <div className="relative h-7 rounded-full bg-white/15 overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${percent}%` }} />
                <div className={`absolute inset-y-0 left-2 flex items-center ${percent > 14 ? 'text-black/60' : 'text-white/60'}`}>
                    {icon}
                </div>
                <input
                    type="range"
                    min={min}
                    max="100"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        );
    };

    const iconCircle = (icon, on) => (
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${on ? 'bg-[#0a84ff] text-white' : 'bg-white/15 text-white/70'}`}>
            {icon}
        </div>
    );

    const toggleRow = (icon, label, status, on, toggle) => (
        <button onClick={toggle} className="w-full flex items-center gap-2.5 text-left">
            {iconCircle(icon, on)}
            <div>
                <p className="text-xs font-medium text-white leading-tight">{label}</p>
                <p className="text-[10px] text-white/50 leading-tight">{status}</p>
            </div>
        </button>
    );

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
                    <div ref={controlRef} className="relative z-[2500]">
                        <button
                            onClick={() => setControlOpen(!controlOpen)}
                            className={`p-1 -m-1 rounded flex items-center ${controlOpen ? 'bg-white/25' : ''}`}
                        >
                            <img src={ControlCenter} alt="Control Center" className="w-5 h-5 cursor-pointer block" />
                        </button>

                        {controlOpen && (
                            <div className="w-control max-w-[92vw] absolute top-full right-0 mt-3 p-3 vibrancy border border-white/15 rounded-xl shadow-2xl">
                                <div className="flex gap-3">
                                    <div className="flex-1 rounded-xl bg-white/15 p-3 space-y-3">
                                        {toggleRow(<FaWifi className="w-3.5 h-3.5" />, "Wi-Fi", wifiOn ? "Aryan's Wi-Fi" : "Off", wifiOn, () => setWifiOn(!wifiOn))}
                                        {toggleRow(<FaBluetoothB className="w-3.5 h-3.5" />, "Bluetooth", bluetoothOn ? "On" : "Off", bluetoothOn, () => setBluetoothOn(!bluetoothOn))}
                                        {toggleRow(<IoShareSocial className="w-3.5 h-3.5" />, "AirDrop", airdropOn ? "Contacts Only" : "Off", airdropOn, () => setAirdropOn(!airdropOn))}
                                    </div>

                                    <div className="w-[38%] flex flex-col gap-3">
                                        <button
                                            onClick={() => setFocusMode(!focusMode)}
                                            className="flex-1 rounded-xl bg-white/15 p-3 flex flex-col items-start justify-center gap-1.5"
                                        >
                                            {iconCircle(<IoMoon className="w-3.5 h-3.5" />, focusMode)}
                                            <p className="text-[11px] text-white">Focus</p>
                                        </button>

                                        <div className="flex-1 rounded-xl bg-white/15 p-3 flex flex-col items-start justify-center gap-1.5">
                                            {iconCircle(<IoTv className="w-3.5 h-3.5" />, false)}
                                            <p className="text-[11px] text-white/50 leading-tight">Screen Mirroring</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 rounded-xl bg-white/15 p-3">
                                    <p className="text-[11px] text-white/60 mb-2">Display</p>
                                    {slider(<IoSunny className="w-4 h-4" />, brightness, setBrightness, 40)}
                                </div>

                                <div className="mt-3 rounded-xl bg-white/15 p-3">
                                    <p className="text-[11px] text-white/60 mb-2">Sound</p>
                                    {slider(<IoVolumeHigh className="w-4 h-4" />, volume, setVolume, 0)}
                                </div>
                            </div>
                        )}
                    </div>
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