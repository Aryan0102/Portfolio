import { useState, useEffect } from "react";
import { getInformation } from "../../data/getInfo"

export default function Research() {
    const [research, setResearch] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getInformation("Research");
            setResearch(data[0]);
        };
        fetchData();
    }, []);

    return (
        <div id="research" className="px-[5%] py-15 text-center md:text-left flex items-center flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <h1 className="text-7xl font-extrabold text-pink-600">
                    My Research
                </h1>

                <p className="text-xl md:text-2xl text-white py-5">
                    {research.paragraph1}
                </p>

                <p className="text-xl md:text-2xl text-white">
                    {research.paragraph2}
                </p>
            </div>

            <div className="w-full md:w-1/2 ml-0 md:ml-[5%] border-wrap -z-10 mt-10 md:mt-0">
                <img src={research.image} alt="Optical Neural Networks" />
            </div>
        </div>
    );
}