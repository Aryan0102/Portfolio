import { useState, useEffect } from "react";
import { getInformation } from "../../data/getInfo"

export default function MainSection() {
    const [about, setAbout] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInformation("AboutMe");
            setAbout(data[0]);
        };
        fetchData();
    }, []);

    return (
        <div id="aboutMe" className="px-[5%] py-15 text-center md:text-left flex items-center flex-col md:flex-row">

            <div className="w-full md:w-1/2 mr-0 md:mr-[5%] -z-10 border-wrap">
                <img src={about.image} alt="Northeastern" />
            </div>

            <div className="w-full md:w-1/2 pt-10 md:pt-0">
                <h1 className="text-7xl font-extrabold text-pink-600">
                    About Me
                </h1>

                <p className="text-xl md:text-2xl text-white py-5">
                    {about.paragraph1}
                </p>

                <p className="text-xl md:text-2xl text-white">
                    {about.paragraph2}
                </p>
            </div>
        </div>
    );
}