import { useContext } from "react";
import { Context } from "../context";
import background from "../assets/macbg.jpg"
import MenuBar from "./MenuBar";
import Spotlight from "./Spotlight";
import DocumentIcon from "../assets/documenticon.png"
import GitHubIcon from "../assets/github.png";
import Linkedin from "../assets/linkedin.png";
import ReturnIcon from "../assets/returnicon.png";

const desktopIcons = [
    { name: 'Resume.pdf', image: DocumentIcon, app: "Preview", size: 13 },
    { name: 'GitHub', image: GitHubIcon, link: "https://github.com/Aryan0102", size: 13 },
    { name: 'LinkedIn', image: Linkedin, link: "https://www.linkedin.com/in/aryangupta0102/", size: 12 },
    { name: 'Return', image: ReturnIcon, link: "https://classic.aryan-sgupta.com", size: 12 },
];

const Desktop = ({ children }) => {
    const { handleOpenWindow } = useContext(Context);

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

        <div className="absolute top-20 right-10 space-y-4">
            {desktopIcons.map((icon) => (
                <div key={icon.name} className="flex flex-col items-center gap-2" onClick={() => openIcon(icon)}>
                    <img style={{ width: icon.size * 4}} className={`aspect-square`} src={icon.image} alt={icon.name} />
                    <p className="text-white font-semibold">{icon.name}</p>
                </div>
            ))}
        </div>

        {children}

        <Spotlight />
    </div>
    );
};

export default Desktop;