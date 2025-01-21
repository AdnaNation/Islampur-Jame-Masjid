import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";


const Navbar = () => {

  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const toggleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
    return (
      <div className="text-center flex  items-center bg-gray-600 h-16 fixed w-full">

<div className="flex  items-center ml-4">
              <button
                onClick={toggleDashboard}
                className="text-black hover:text-gray-500 focus:outline-none"
              >
                {isDashboardOpen ? (
                  <FiX className="w-6 h-6 text-white" />
                ) : (
                  <FiMenu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
      <a className="btn btn-ghost text-xl text-white font-bold font-sans flex-1">Islampur Jame Masjid</a>
    </div>
    );
};

export default Navbar;