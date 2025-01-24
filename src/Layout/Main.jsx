
import { Outlet } from 'react-router-dom';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Navbar from '../components/NavNew';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <Navbar></Navbar> */}
            <div className='min-h-screen'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main; 