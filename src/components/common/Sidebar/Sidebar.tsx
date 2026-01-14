import { NavLink } from "react-router";
import { sidebarLinks } from "./const";
import { FaArrowRight } from "react-icons/fa6";

import useLocalStorage from "@/hooks/useLocalStorage";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useLocalStorage("nav-bar-open-state");
  const isSmallScreenMedia = window.matchMedia("(max-width: 767px)").matches;

  return (
    <div
      className={`z-50 spacey-y-4 bg-primary-dark min-h-dvh md:min-h-[98dvh] text-white p-4 rounded-md rounded-tl-0  transition-all duration-300 sticky top-0
         ${
           isOpen
             ? "max-sm:fixed max-sm:translate-x-[5%] max-sm:h-dvh  max-sm:shadow-[0_0_0_100vw_rgba(0,0,0,0.5)] md:w-20 lg:w-56"
             : "max-sm:fixed max-sm:translate-x-[110%] w-20"
         } `}
      dir="rtl"
    >
      {/* Logo  */}
      <h1 className="text-3xl  mb-4 transition-all duration-300 text-center">
        <span className={isOpen ? "md:hidden lg:block" : "hidden"}>
          <b>FINE</b>bank.<b>IO</b>
        </span>
        <span className={isOpen ? "hidden md:block lg:hidden" : "block"}>
          F.B
        </span>
      </h1>

      {/* navigation links  */}
      <ul className="flex flex-col gap-3">
        {sidebarLinks.map((link, Idx) => (
          <li key={Idx}>
            <NavLink
              to={link.path}
              onClick={() => isSmallScreenMedia && setIsOpen(false)}
              className={({ isActive }) =>
                `flex gap-3 itmes-center px-3 py-2 text-lg ${
                  isActive ? "bg-primary" : "transform"
                } hover:bg-primary rounded-sm transition-all duration-300`
              }
            >
              {link.icon}
              <p
                hidden={!isOpen}
                className={`text-nowrap ${
                  isOpen ? "md:hidden lg:block" : "lg:block"
                }`}
              >
                {link.text}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className={`absolute bottom-0 left-0 md:rounded-tr-sm p-2 bg-primary cursor-pointer max-sm:rounded-tl-sm ${
          isOpen ? " max-sm:left-[-19%]" : " max-sm:left-[-50%] "
        }`}
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
      >
        <FaArrowRight
          size={25}
          className={`${isOpen ? "rotate-0" : "rotate-180"} transition-all`}
        />
      </button>
    </div>
  );
};
