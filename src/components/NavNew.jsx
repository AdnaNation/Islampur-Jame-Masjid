import { NavLink } from "react-router-dom";
import profileSvg from "/Icons/profile.svg";
import { ImHome } from "react-icons/im";
import { TbCoinTakaFilled } from "react-icons/tb";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { MdDashboard, MdGroupAdd } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";
import { FaHistory } from "react-icons/fa";
const Navbar = () => {
  const userNumber = localStorage.getItem("Number");
  const [isAdmin] = useAdmin();
  return (
    <div className="top-0 navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-1"
          >
            <NavLink to="/" className="text-xl md:text-2xl">
              <ImHome />
            </NavLink>
            <NavLink to="/fee" className="text-xl md:text-2xl">
              <TbCoinTakaFilled />{" "}
            </NavLink>
            <NavLink to="/payment" className="text-xl md:text-2xl">
              <FaHistory />{" "}
            </NavLink>
            {isAdmin && (
              <NavLink to="/dashboard/home" className="text-xl md:text-2xl">
                <MdDashboard />{" "}
              </NavLink>
            )}
            {userNumber ? (
              <button
                onClick={() => localStorage.removeItem("Number")}
                className="text-xl md:text-2xl"
              >
                <IoLogOut />
              </button>
            ) : (
              <NavLink to="/signin" className="text-xl md:text-2xl">
                <IoLogIn />
              </NavLink>
            )}
          </ul>
        </div>
        <a href="/" className="text-xl btn">
          Islampur Jame Masjid
        </a>
      </div>
      <div className="hidden navbar-center lg:flex">
        <ul className="px-1 menu menu-horizontal">
          <NavLink className="mr-3 text-2xl" to="/">
            <ImHome />
          </NavLink>
          <NavLink className="mr-3 text-2xl" to="/fee">
            <TbCoinTakaFilled />
          </NavLink>
          <NavLink className="mr-3 text-2xl" to="/payment">
            <FaHistory />
          </NavLink>
          {isAdmin && (
            <NavLink to="/dashboard/home" className="mr-1 text-2xl">
              <MdDashboard />{" "}
            </NavLink>
          )}
        </ul>
      </div>
      <div className="navbar-end">
        <a
          href="/"
          className="flex items-center px-4 py-2 space-x-2 text-white transition duration-300 rounded-md hover:bg-gray-700"
        >
          <img
            src={profileSvg}
            alt="Profile"
            className="w-6 h-6 border-2 border-white rounded-full"
          />
          {/* <span className="hidden font-medium sm:block">Profile</span> */}
        </a>
      </div>
    </div>
  );
};

export default Navbar;
