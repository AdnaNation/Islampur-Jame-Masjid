import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/NavNew";

const DashBoard = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashBoard;
