const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto flex flex-col items-center">
        {/* Developed By Section */}
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold text-gray-300">
            Developed by
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10 space-y-8 md:space-y-0">
          {/* First Profile Card */}
          <div className="flex  items-center bg-gray-800 rounded-lg p-6 shadow-md">
            <img
              src="https://avatars.githubusercontent.com/u/108600250?v=4"
              alt="Profile 1"
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="flex flex-col space-x-5">
              <h3 className="text-lg font-semibold mb-2 ml-5">Muhammed Mehedi Hasan</h3>
              <div className="flex space-x-4 mb-2">
                <a href="#" className="text-blue-500 hover:text-blue-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-400">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <p className="text-sm">muhammedmehedih@gmail.com</p>
            </div>
          </div>

          {/* Vertical Line */}
          <div className="hidden md:block w-px bg-gray-700 h-32"></div>

          {/* Second Profile Card */}
          <div className="flex  items-center bg-gray-800 rounded-lg p-6 shadow-md">
            <img
              src="https://avatars.githubusercontent.com/u/145375204?v=4"
              alt="Profile 2"
              className="w-24 h-24 rounded-full mb-4"
            />
            <div className="flex flex-col space-x-5">
              <h3 className="text-lg font-semibold mb-2 ml-5">Azizul Islam Adnan</h3>
              <div className="flex space-x-4 mb-2">
                <a href="#" className="text-blue-500 hover:text-blue-400">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-pink-500 hover:text-pink-400">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <p className="text-sm">azizulislamadnan@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;