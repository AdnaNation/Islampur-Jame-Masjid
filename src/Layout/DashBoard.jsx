import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavNew";

const DashBoard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex">
        <div className="min-h-screen border-r-2 shadow-sm bg-zinc-100 md:min-w-56">
          <div className="flex flex-col gap-3">
            <Link to="/dashboard/home">Admin Home</Link>
            <Link to="/dashboard/addUser">Add User</Link>
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
