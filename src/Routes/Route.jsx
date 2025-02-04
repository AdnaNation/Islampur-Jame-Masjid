import { createBrowserRouter } from "react-router-dom";
import Profile from "../components/Profile";
import Main from "../Layout/Main";
import FeePage from "../pages/FeePage";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import AdminSignIn from "../pages/AdminSignIn";
import AddUser from "../pages/AddUser";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/fee',
                element: <FeePage></FeePage>
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/signin',
                element: <SignIn />
            },
            {
                path: '/adminSignin',
                element: <AdminSignIn />
            },
            {
                path: '/addUser',
                element: <AddUser />
            }
        ]
    }
])
export default router;