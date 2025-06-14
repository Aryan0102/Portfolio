import Window from "../components/Window";
import { IoSearch, IoMail, IoMap, IoGlobeOutline, IoCall } from "react-icons/io5";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { Context } from "../context";
import { useContext } from "react";

const Contacts = () => {
  const { handleOpenWindow } = useContext(Context);

  return (
    <Window
      appName="Contacts"
      width={900}
      height={650}
      children={
        <div className="bg-gray-900 w-full h-full rounded-b-lg flex">
          {/* Left Side */}
          <div className="w-[35%] h-full bg-gray-800 border-r">
            <div className="p-3">
              <div className="px-2 py-2 bg-gray-700 rounded flex items-center gap-2 mb-4">
                <IoSearch className="text-gray-400 w-4 h-4" />
                <p className="text-gray-400 text-xs">Search</p>
              </div>

              <p className="text-xs text-gray-500 mb-2 px-2">ALL CONTACTS</p>
              <div className="bg-blue-500/20 rounded p-3 flex items-center gap-3 cursor-pointer border border-blue-500/30">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  AG
                </div>
                <div>
                  <p className="text-sm text-white">Aryan Gupta</p>
                  <p className="text-xs text-gray-400">Northeastern University</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-[65%] h-full flex flex-col">
            {/* Profile Section */}
            <div className="bg-gray-800 px-8 py-6 text-center border-b border-gray-700">
              <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-3xl font-bold text-white mx-auto mb-4">
                AG
              </div>
              <p className="text-2xl font-bold text-white mb-1">Aryan Gupta</p>
              <div className="flex items-center justify-center gap-2">
                <HiOutlineAcademicCap className="text-gray-400 w-4 h-4" />
                <p className="text-sm text-gray-400">Computer Science Student at Northeastern University</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="px-8 py-6 flex-1 overflow-auto">

              {/* Bio Section */}
              <div className="mb-6">
                <p className="text-xs text-gray-500 mb-2">ABOUT</p>
                <div className="bg-gray-800 rounded-lg px-4 py-3">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Passionate computer science student with a focus on software engineering and web development.
                    Currently pursuing my degree at Northeastern University while working on various projects
                    that combine creativity with technical innovation. Always eager to learn new technologies
                    and collaborate on interesting challenges.
                  </p>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                {/* Phone */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">PHONE</p>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
                    <IoCall className="text-blue-400 w-5 h-5" />
                    <div>
                      <p className="text-sm text-white">+1 (570) 236-4213</p>
                      <p className="text-xs text-gray-500">Mobile</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">EMAIL</p>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center gap-3 mb-2">
                    <IoMail className="text-blue-400 w-5 h-5" />
                    <div>
                      <p className="text-sm text-white">aryansumit0102@gmail.com</p>
                      <p className="text-xs text-gray-500">Personal</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
                    <IoMail className="text-blue-400 w-5 h-5" />
                    <div>
                      <p className="text-sm text-white">gupta.aryans@northeastern.edu</p>
                      <p className="text-xs text-gray-500">Student</p>
                    </div>
                  </div>
                </div>

                {/* Locations */}
                <div>
                  <p className="text-xs text-gray-500 mb-1">LOCATIONS</p>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center gap-3 mb-2">
                    <IoMap className="text-blue-400 w-5 h-5" />
                    <div>
                      <p className="text-sm text-white">Boston, MA</p>
                      <p className="text-xs text-gray-500">School</p>
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg px-4 py-3 flex items-center gap-3">
                    <IoMap className="text-blue-400 w-5 h-5" />
                    <div>
                      <p className="text-sm text-white">Easton, PA</p>
                      <p className="text-xs text-gray-500">Home</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Buttons */}
              <div className="flex gap-4 pt-3">
                <button
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-sm"
                  onClick={() => handleOpenWindow("Mail")}
                >
                  <IoMail className="w-4 h-4" />
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default Contacts