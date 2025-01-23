import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  return (
    <div className="text-center flex  items-center bg-blue-100 top-1 h-14 fixed z-20 w-full drop-shadow-lg rounded-full">
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
      <a className=" text-2xl text-black font-bold font-sans flex-1">
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
          <li className="flex justify-between items-center hover:bg-white hover:text-black rounded-md">
            <NavLink
              onClick={toggleDashboard}
              className="border border-black border-1 font-bold w-full px-3 py-1 rounded-md"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="flex justify-between items-center hover:bg-white hover:text-black rounded-md">
            <NavLink
              onClick={toggleDashboard}
              className="border border-black  border-1 font-bold w-full px-3 py-1 rounded-md"
              to="/"
            >
              Monthly Fee
            </NavLink>
          </li>
          <li className="flex justify-between items-center hover:bg-white hover:text-black rounded-md">
            <NavLink onClick={toggleDashboard}
              className="border border-black  border-1 font-bold w-full px-3 py-1 rounded-md"
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
