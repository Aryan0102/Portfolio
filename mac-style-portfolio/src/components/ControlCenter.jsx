import { useState, useEffect, useRef, useContext } from 'react';
import { IoSunny, IoVolumeHigh, IoShareSocial, IoMoon, IoTv } from "react-icons/io5";
import { FaWifi, FaBluetoothB } from "react-icons/fa";
import { Context } from '../context';
import { useViewport } from '../useViewport';
import controlCenterIcon from "../assets/optimized/controlcenter.webp";

const connections = [
    { key: 'wifi', icon: FaWifi, label: "Wi-Fi", activeStatus: "Aryan's Wi-Fi" },
    { key: 'bluetooth', icon: FaBluetoothB, label: "Bluetooth", activeStatus: "On" },
    { key: 'airdrop', icon: IoShareSocial, label: "AirDrop", activeStatus: "Contacts Only" }
];

const layoutFor = (compact) => {
    const pad = compact ? 'p-2' : 'p-3';

    return {
        panel: compact ? 'w-64' : 'w-82',
        pad,
        gap: compact ? 'gap-2' : 'gap-3',
        stack: compact ? 'mt-2' : 'mt-3',
        rows: compact ? 'space-y-2' : 'space-y-3',
        circle: compact ? 'w-6 h-6' : 'w-7 h-7',
        track: compact ? 'h-6' : 'h-7',
        box: `rounded-xl bg-white/15 ${pad}`,
        tile: `rounded-xl bg-white/15 ${pad} flex-1 flex flex-col items-start justify-center ${compact ? 'gap-1' : 'gap-1.5'}`
    };
};

const IconCircle = ({ icon, on, layout }) => {
    const Icon = icon;

    return (
        <div className={`${layout.circle} flex-shrink-0 rounded-full flex items-center justify-center ${on ? 'bg-[#0a84ff] text-white' : 'bg-white/15 text-white/70'}`}>
            <Icon className="w-3.5 h-3.5" />
        </div>
    );
};

const ToggleRow = ({ icon, label, status, on, onToggle, layout }) => (
    <button onClick={onToggle} className="w-full flex items-center gap-2.5 text-left">
        <IconCircle icon={icon} on={on} layout={layout} />
        <div className="min-w-0">
            <p className="text-xs font-medium text-white leading-tight truncate">{label}</p>
            <p className="text-[10px] text-white/50 leading-tight truncate">{status}</p>
        </div>
    </button>
);

const Slider = ({ icon, label, showLabel, value, min, onChange, layout }) => {
    const Icon = icon;
    const percent = ((value - min) / (100 - min)) * 100;
    const fillReachesIcon = percent > 14;

    return (
        <div className={`${layout.stack} ${layout.box}`}>
            {showLabel && <p className="text-[11px] text-white/60 mb-2">{label}</p>}
            <div className={`relative ${layout.track} rounded-full bg-white/15 overflow-hidden`}>
                <div className="absolute inset-y-0 left-0 bg-white" style={{ width: `${percent}%` }} />
                <div className={`absolute inset-y-0 left-2 flex items-center ${fillReachesIcon ? 'text-black/60' : 'text-white/60'}`}>
                    <Icon className="w-4 h-4" />
                </div>
                <input
                    type="range"
                    aria-label={label}
                    min={min}
                    max="100"
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>
        </div>
    );
};

const ControlCenter = () => {

    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState({ wifi: true, bluetooth: true, airdrop: false });
    const [volume, setVolume] = useState(70);
    const containerRef = useRef(null);
    const viewport = useViewport();

    const { brightness, setBrightness, focusMode, setFocusMode } = useContext(Context);

    const compact = viewport.width < 1100 || viewport.height < 480;
    const showSliderLabels = viewport.height >= 480;
    const layout = layoutFor(compact);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };

        const handleMouseDown = (e) => {
            if (!containerRef.current?.contains(e.target)) setOpen(false);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, [open]);

    const toggleConnection = (key) => setEnabled((current) => ({ ...current, [key]: !current[key] }));

    return (
        <div ref={containerRef} className="relative z-[2500]">
            <button
                onClick={() => setOpen(!open)}
                className={`p-1 -m-1 rounded flex items-center ${open ? 'bg-white/25' : ''}`}
            >
                <img src={controlCenterIcon} alt="Control Center" className="w-5 h-5 cursor-pointer block" />
            </button>

            {open && (
                <div className={`${layout.panel} max-w-[92vw] max-h-[calc(100vh-6.5rem)] overflow-y-auto noscrollbar absolute top-full right-0 ${layout.stack} ${layout.pad} vibrancy border border-white/15 rounded-xl shadow-2xl`}>
                    <div className={`flex ${layout.gap}`}>
                        <div className={`${layout.box} ${layout.rows} flex-1 min-w-0`}>
                            {connections.map(({ key, icon, label, activeStatus }) => (
                                <ToggleRow
                                    key={key}
                                    icon={icon}
                                    label={label}
                                    status={enabled[key] ? activeStatus : "Off"}
                                    on={enabled[key]}
                                    onToggle={() => toggleConnection(key)}
                                    layout={layout}
                                />
                            ))}
                        </div>

                        <div className={`w-[38%] flex-shrink-0 flex flex-col ${layout.gap}`}>
                            <button onClick={() => setFocusMode(!focusMode)} className={layout.tile}>
                                <IconCircle icon={IoMoon} on={focusMode} layout={layout} />
                                <p className="text-[11px] text-white leading-tight">Focus</p>
                            </button>

                            <div className={layout.tile}>
                                <IconCircle icon={IoTv} on={false} layout={layout} />
                                <p className="text-[11px] text-white/50 leading-tight">Screen Mirroring</p>
                            </div>
                        </div>
                    </div>

                    <Slider
                        icon={IoSunny}
                        label="Display"
                        showLabel={showSliderLabels}
                        value={brightness}
                        min={40}
                        onChange={setBrightness}
                        layout={layout}
                    />

                    <Slider
                        icon={IoVolumeHigh}
                        label="Sound"
                        showLabel={showSliderLabels}
                        value={volume}
                        min={0}
                        onChange={setVolume}
                        layout={layout}
                    />
                </div>
            )}
        </div>
    )
}

export default ControlCenter
