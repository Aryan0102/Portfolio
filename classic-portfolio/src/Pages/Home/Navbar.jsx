import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";

export default function Navbar() {
  const [navActive, setNavActive] = useState(false);

  const toggleNav = () => setNavActive(!navActive);
  const closeMenu = () => setNavActive(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        closeMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth <= 1200) {
      closeMenu();
    }
  }, []);

  const sections = [
    { to: "mainSection", label: "Home"},
    { to: "mySkills", label: "My Expertise"},
    { to: "aboutMe", label: "About Me"},
    { to: "myPortfolio", label: "Portfolio"},
    { to: "myExperience", label: "Experience"},
    { to: "research", label: "Research"},
  ]

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <img src="logo.svg" alt="Aryan Gupta" className="h-10 w-10 object-contain" />
      </div>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col gap-[5px] z-50"
        onClick={toggleNav}
        aria-label="Toggle menu"
      >
        <span className="w-6 h-0.5 bg-black transition-all" />
        <span className="w-6 h-0.5 bg-black transition-all" />
        <span className="w-6 h-0.5 bg-black transition-all" />
      </button>

      {/* Nav Items */}
      <div
        className={`${
          navActive ? "flex" : "hidden"
        } absolute top-full left-0 w-full flex-col items-center bg-white md:flex md:flex-row md:static md:w-auto md:space-x-8 transition-all`}
      >
        <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-sm md:text-base py-6 md:py-0">
          {sections.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                spy={true}
                smooth={true}
                duration={500}
                onClick={closeMenu}
                activeClass="text-pink-600"
                className="cursor-pointer hover:text-pink-600 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Button */}
      <Link
        to="contact"
        spy={true}
        smooth={true}
        duration={500}
        onClick={closeMenu}
        className="hidden md:inline-block border border-pink-600 text-pink-600 px-4 py-2 rounded hover:bg-pink-700 hover:text-white transition-all duration-500 text-sm"
      >
        Contact Me
      </Link>
    </nav>
  );
}