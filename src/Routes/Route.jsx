import { createBrowserRouter } from "react-router-dom";
import Profile from "../components/Profile";
import Main from "../Layout/Main";
import FeePage from "../pages/FeePage";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import AdminSignIn from "../pages/AdminSignIn";
import AddUser from "../pages/AddUser";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/AdminDashboard";
import PaymentHistory from "../pages/PaymentHistory";
import DashBoard from "../Layout/DashBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/fee",
        element: <FeePage></FeePage>,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/adminSignin",
        element: <AdminSignIn />,
      },
      {
        path: "/payment",
        element: <PaymentHistory />,
      },
      {
        path: "/addUser",
        element: (
          <AdminRoute>
            <AddUser />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "/adminDashboard",
        element: (
          <AdminRoute>
            <AdminDashboard />{" "}
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashBoard></DashBoard>,
    children: [
      {
        path: "ad",
        element: <AdminDashboard></AdminDashboard>,
      },
    ],
  },
]);
export default router;
