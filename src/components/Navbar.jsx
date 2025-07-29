import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  return (
    <div className="fixed z-20 flex items-center w-full text-center bg-blue-100 rounded-full top-1 h-14 drop-shadow-lg">
      <div className="flex items-center ml-4">
        <button
          onClick={toggleDashboard}
          className="text-black hover:text-gray-500 focus:outline-none"
        >
          {isDashboardOpen ? (
            <FiX className="w-6 h-6 text-black" />
          ) : (
            <FiMenu className="w-6 h-6 text-black" />
          )}
        </button>
      </div>
      <a className="flex-1 font-sans text-2xl font-bold text-black ">
        Islampur Jame Masjid
      </a>

      {/* dashboard */}
      <div
        className={`
inset-shadow-sm z-50 bg-blue-100 text-black max-w-[180px] ease-in-out rounded-3xl transform fixed top-16 left-0  w-[250px]   transition-transform duration-300  ${
          isDashboardOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 space-y-4  max-w-[300px] z-auto  ">
          <li className="flex items-center justify-between rounded-md hover:bg-white hover:text-black">
            <NavLink
              onClick={toggleDashboard}
              className="w-full px-3 py-1 font-bold border border-black rounded-md border-1"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="flex items-center justify-between rounded-md hover:bg-white hover:text-black">
            <NavLink
              onClick={toggleDashboard}
              className="w-full px-3 py-1 font-bold border border-black rounded-md border-1"
              to="/"
            >
              Monthly Fee
            </NavLink>
          </li>
          <li className="flex items-center justify-between rounded-md hover:bg-white hover:text-black">
            <NavLink
              onClick={toggleDashboard}
              className="w-full px-3 py-1 font-bold border border-black rounded-md border-1"
              to="/fee"
            >
              চাঁদা
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
