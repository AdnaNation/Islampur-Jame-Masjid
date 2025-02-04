import { NavLink } from "react-router-dom";
import profileSvg from "/Icons/profile.svg";
import { ImHome } from "react-icons/im";
import { TbCoinTakaFilled } from "react-icons/tb";
import { IoLogIn } from "react-icons/io5";
import { MdGroupAdd } from "react-icons/md";
const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            <NavLink to="/" className='md:text-2xl text-xl'><ImHome /></NavLink>
            <NavLink to="/fee" className='md:text-2xl text-xl'><TbCoinTakaFilled /> </NavLink>
            <NavLink to="/addUser" className='md:text-2xl text-xl'><MdGroupAdd /> </NavLink>
            <NavLink to="/signin" className='md:text-2xl text-xl'><IoLogIn /></NavLink>
          </ul>
        </div>
        <a href="/profile" className="btn btn-ghost text-xl">
          Islampur Jame Masjid
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLink className="mr-1 text-2xl" to="/">
          <ImHome />
          </NavLink>
          <NavLink className="mr-1 text-2xl" to="/fee">
          <TbCoinTakaFilled />
          </NavLink>
          <NavLink className="mr-1 text-2xl" to="/addUser">
          <MdGroupAdd />
          </NavLink>
        </ul>
      </div>
      <div className="navbar-end">
        <a
          href="/profile"
          className="flex items-center space-x-2 px-4 py-2 text-white rounded-md hover:bg-gray-700 transition duration-300"
        >
          <img
            src={profileSvg}
            alt="Profile"
            className="w-6 h-6 rounded-full border-2 border-white"
          />
          {/* <span className="hidden sm:block font-medium">Profile</span> */}
        </a>
      </div>
    </div>
  );
};

export default Navbar;
