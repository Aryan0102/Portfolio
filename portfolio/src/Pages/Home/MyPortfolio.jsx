import { useState, useEffect } from "react";
import { getInformation } from "../../data/getInfo"

export default function MyPortfolio() {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInformation("Portfolio");
            setPortfolio(data);
        };
        fetchData();
    }, []);

    return (
        <div id="myPortfolio" className="px-[5%] py-15 text-center md:text-left">
            <h1 className="text-7xl font-extrabold text-pink-600">
                My Portfolio
            </h1>

            <div className="grid md:grid-cols-3 gap-6 mt-10">
                {portfolio.map((item, index) => (
                    <div key={index} className="bg-white">
                        <div className="w-full">
                            <img className="w-full h-full" src={item.src} alt="project images" />
                        </div>
                        <p className="pt-5 px-5 text-left text-pink-600 text-2xl font-bold">{item.title}</p>
                        <div className="pt-5 px-5 text-left flex flex-wrap gap-2">
                            {item.tech.split(',').map((tech, index) => (
                                <p
                                    key={index}
                                    className="bg-pink-600 hover:bg-pink-700 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-sm"
                                >
                                    {tech}
                                </p>
                            ))}
                        </div>
                        <p className="pt-5 px-5 text-left">{item.description}</p>

                        <div className="p-5">
                            <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-black font-bold hover:text-pink-700 group"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-black group-hover:text-pink-700 transition-colors duration-500"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.96.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.11-3.2.69-3.87-1.54-3.87-1.54-.53-1.36-1.3-1.72-1.3-1.72-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.22 1.8 1.22 1.04 1.79 2.73 1.27 3.4.97.1-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.45.11-3.01 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 2.87-.39c.97 0 1.94.13 2.87.39 2.19-1.49 3.15-1.18 3.15-1.18.63 1.56.24 2.72.12 3.01.74.81 1.18 1.85 1.18 3.11 0 4.44-2.69 5.42-5.25 5.7.42.36.8 1.08.8 2.18 0 1.57-.02 2.84-.02 3.23 0 .31.21.68.8.56A10.5 10.5 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5Z" />
                                </svg>
                                <span className="underline decoration-pink-600 decoration-2 underline-offset-8 duration-500">
                                    View on Github
                                </span>
                            </a>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}