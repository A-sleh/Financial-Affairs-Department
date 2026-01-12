import { NavLink } from "react-router";
import { sidebarLinks } from "./const";
import { FaArrowRight } from "react-icons/fa6";

import useLocalStorage from "@/hooks/useLocalStorage";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useLocalStorage("nav-bar-open-state");

  return (
    <div
      className={`spacey-y-4 bg-primary-dark min-h-[98dvh] text-white p-4 rounded-md overflow-hidden relative transition-all duration-300
         ${isOpen ? "w-56" : "w-20"}
        `}
      dir="rtl"
    >
      {/* Logo  */}
      <h1 className="text-3xl text-center mb-4 transition-all duration-300">
        {isOpen ? (
          <span>
            <b>FINE</b>bank.<b>IO</b>
          </span>
        ) : (
          "F.B"
        )}
      </h1>

      {/* navigation links  */}
      <ul className="flex flex-col gap-3">
        {sidebarLinks.map((link, Idx) => (
          <li key={Idx}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex gap-3 itmes-center px-3 py-2 text-lg ${
                  isActive ? "bg-primary" : "transform"
                } hover:bg-primary rounded-sm transition-all duration-300`
              }
            >
              {link.icon}
              {isOpen && link.text}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        className={`absolute bottom-0 left-0 rounded-tr-sm p-2 bg-primary cursor-pointer`}
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
