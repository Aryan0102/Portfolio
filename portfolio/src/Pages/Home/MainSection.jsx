import profileImage from "../../../public/img/Headshot Photo.jpg"

export default function MainSection() {
  return (
    <div id="mainSection" className="w-full bg-[#2e236c] text-white pt-30 pb-20">
      <div className="flex flex-col md:flex-row items-center justify-between px-[5%]">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left">
          <p className="text-3xl font-bold text-white">Hey, I'm Aryan Gupta</p>
          <h1 className="text-7xl font-extrabold text-pink-600 py-5">
            Software Developer
          </h1>
          <p className="text-2xl text-white max-w-lg">
            I’m driven by curiosity, building with code, and finding creative ways to make a difference in the world.
          </p>
          <a href="mailto:aryansumit0102@gmail.com">
            <button className="mt-10 px-6 py-3 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-all duration-500">
              Get In Touch
            </button>
          </a>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="ml-0 lg:ml-40 rounded-full border-[6px] border-pink-600 overflow-hidden w-80 h-80 lg:w-110 lg:h-110 aspect-square">
            <img
              src={profileImage}
              alt="Aryan Headshot"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
