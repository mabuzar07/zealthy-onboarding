import React from "react";
import { NavLink } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="font-bold text-xl">
            Zealthy
          </NavLink>
          <div className="space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }
            >
              Admin
            </NavLink>
            <NavLink
              to="/data"
              className={({ isActive }) =>
                isActive
                  ? "text-white font-bold"
                  : "text-gray-300 hover:text-white"
              }
            >
              Data
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
