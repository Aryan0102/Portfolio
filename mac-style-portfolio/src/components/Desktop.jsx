import { useContext } from "react";
import { Context } from "../context";
import background from "../assets/optimized/macbg.webp"
import MenuBar from "./MenuBar";
import Spotlight from "./Spotlight";
import Widgets from "../widgets/Widgets";
import Notifications from "../notifications/Notifications";
import { desktopItems } from "../desktopItems";

const Desktop = ({ children }) => {
    const { handleOpenWindow, brightness } = useContext(Context);

    const openIcon = (icon) => {
        if (icon.app) {
            handleOpenWindow(icon.app);
        } else {
            window.open(icon.link, "_blank");
        }
    };

    return (
    <div
        className="w-screen h-screen relative bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url(${background})` }}
    >
        <MenuBar />

        <Widgets />

        <Notifications />

        <div className="absolute top-20 right-10 space-y-4">
            {desktopItems.map((icon) => (
                <div key={icon.name} className="flex flex-col items-center gap-2" onClick={() => openIcon(icon)}>
                    <img style={{ width: icon.size * 4}} className={`aspect-square`} src={icon.image} alt={icon.name} />
                    <p className="text-white font-semibold">{icon.name}</p>
                </div>
            ))}
        </div>

        {children}

        <Spotlight />

        <div
            className="fixed inset-0 bg-black pointer-events-none z-[4000]"
            style={{ opacity: (100 - brightness) / 200 }}
        />
    </div>
    );
};

export default Desktop;