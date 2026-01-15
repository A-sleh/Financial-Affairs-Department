import type React from "react";
import { NavLink } from "react-router";

interface SubNavigationHeaderProps {
  links: {
    path: string;
    title: string;
  }[];
}

export const SubNavigationHeader: React.FC<SubNavigationHeaderProps> = ({
  links,
}) => {
  return (
    <header className="flex gap-3 border-b border-primary">
      {links.map((link, Idx) => (
        <NavLink
          to={link.path}
          key={Idx + link.path}
          end
          className={({ isActive }) =>
            `${
              isActive ? "border-b-3 text-primary translate-y-2px" : "bg-white"
            } font-semibold hover:bg-primary hover:border-b-3 hover:text-white rounded-tl-sm rounded-tr-sm px-4 py-1 transition-all `
          }
        >
          {link.title}
        </NavLink>
      ))}
    </header>
  );
};
