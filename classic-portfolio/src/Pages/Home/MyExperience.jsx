import { useState, useEffect } from "react";
import { getInformation } from "../../data/getInfo";

export default function MyExperience() {
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInformation("Experience");
            setExperience(data);
        };
        fetchData();
    }, []);

    return (
        <div id="myExperience" className="px-[5%] py-15 text-center md:text-left">
            <h1 className="text-7xl font-extrabold text-pink-600">
                My Experience
            </h1>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
                {experience.map((item, index) => (
                    <div key={index} className="bg-white">
                        <div className="w-full">
                            <img className="w-full h-full" src={item.src} alt="project images" />
                        </div>
                        <p className="pt-5 px-5 text-left text-pink-600 text-2xl font-bold">{item.title}</p>
                        <div className="pt-5 px-5 text-left flex flex-wrap gap-2">
                            {item.tech?.split(',').map((tech, index) => (
                                <p
                                    key={index}
                                    className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm"
                                >
                                    {tech}
                                </p>
                            ))}
                        </div>
                        <p className="py-5 px-5 text-left">{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}