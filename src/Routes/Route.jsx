import { createBrowserRouter } from "react-router-dom";
import Profile from "../components/Profile";
import Main from "../Layout/Main";
import FeePage from "../pages/FeePage";
import Home from "../pages/Home";

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
            }
        ]
    }
])
export default router;