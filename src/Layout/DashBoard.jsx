import { NavLink, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavNew";
import { useState } from "react";
import { MdDoubleArrow } from "react-icons/md";
import { ImCross } from "react-icons/im";

const DashBoard = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const handleToggle = () => {
    setIsDashboardOpen(!isDashboardOpen);
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex">
        <div>
          <div className="hidden min-h-screen border-r-2 shadow-sm md:block bg-zinc-100 md:min-w-56">
            <div className="flex flex-col gap-3">
              <NavLink to="/dashboard/home">Admin Home</NavLink>
              <NavLink to="/dashboard/addUser">Add User</NavLink>
            </div>
          </div>
          <div
            className={`fixed left-0 min-h-screen transition-transform duration-300 ease-in-out transform border-r-2 shadow-sm top-16 md:hidden bg-zinc-100 min-w-48 ${
              isDashboardOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {" "}
            {isDashboardOpen ? (
              <div className="text-right">
                <button onClick={handleToggle}>
                  <ImCross />
                </button>
              </div>
            ) : (
              <div className="-mr-5 text-right">
                <button onClick={handleToggle}>
                  <MdDoubleArrow />
                </button>
              </div>
            )}
            <div className="flex flex-col gap-3">
              <NavLink onClick={handleToggle} to="/dashboard/home">
                Admin Home
              </NavLink>
              <NavLink onClick={handleToggle} to="/dashboard/addUser">
                Add User
              </NavLink>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-orange-50">
          <Outlet></Outlet>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashBoard;
