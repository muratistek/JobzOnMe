import React from 'react'
import links from "../utils/links";
import { NavLink } from "react-router-dom";

export default function NavLinks({ toggleSidebar }) {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { path, text, icon, id } = link

        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}

            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}
