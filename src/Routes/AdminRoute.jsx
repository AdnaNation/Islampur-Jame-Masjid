/* eslint-disable react/prop-types */
import { TbFidgetSpinner } from "react-icons/tb";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
    const [isAdmin, isAdminLoading] = useAdmin();
    const number = localStorage.getItem('Number');
   const location = useLocation();
   console.log(location);
  if ( isAdminLoading) {
    return (
      <div>
        <TbFidgetSpinner className="text-4xl mx-auto text-center animate-spin" />
      </div>
    );
  }

  if (number && isAdmin) {
    return children;
  }
  return <Navigate to="/adminSignin" state={{ from: location.pathname }} />;
};

export default AdminRoute;