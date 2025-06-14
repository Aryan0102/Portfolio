import Slider from 'react-infinite-logo-slider'
import { useEffect, useState } from 'react';
import { getInformation } from "../../data/getInfo"

export default function MySkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getInformation("Skills");
      setSkills(data);
    };
    fetchData();
  }, []);

  return (
    <section
      id="mySkills"
      className="px-[5%] py-20 text-center text-white"
    >
      <h1 className="text-4xl sm:text-6xl font-extrabold text-pink-600 mb-12">
        My Expertise
      </h1>

      <div className="max-w-8xl mx-auto">
        <Slider
          width="140px"
          duration={30}
          pauseOnHover={true}
          blurBorders={true}
          blurBorderColor="#17153b"
        >
          {skills.map((skill, index) => (
            <Slider.Slide key={index} className="flex items-center justify-center">
              <img
                src={skill.src}
                alt={skill.title}
                className="w-16 h-16 object-contain"
              />
            </Slider.Slide>
          ))}
        </Slider>
      </div>
    </section>
  );
}