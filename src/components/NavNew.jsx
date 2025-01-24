import { NavLink } from "react-router-dom";
import profileSvg from "/Icons/profile.svg";
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
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a href="/">Home</a></li>
                        <li>
                            <a href="/">চাঁদা</a>
                            {/* <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul> */}
                        </li>
                        <li><a>চাঁদা</a></li>
                        <NavLink to="/fee">চাঁদা </NavLink>
                    </ul>
                </div>
                <a href="/profile" className="btn btn-ghost text-xl">Islampur Jame Masjid</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a href="/">Home</a></li>
                    <li>
                        <a href="/">Home</a>
                        {/* <details>
                            <summary>Parent</summary>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </details> */}
                    </li>
                    <li><a>চাঁদা</a></li>
                    
                    <NavLink to="/fee">চাঁদা </NavLink>
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
