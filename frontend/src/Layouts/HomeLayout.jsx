import Footer from "@/Components/Footer";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

function HomeLayout({ children }) {
  function changeWidth() {
    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "auto";
  }

  function hideDrawer() {
    const element = document.getElementsByClassName("drawer-toggle");
    element[0].checked = false;

    const drawerSide = document.getElementsByClassName("drawer-side");
    drawerSide[0].style.width = "0";
  }

  return (
    <div className="min-h-[90vh] bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <div className="drawer absolute left-0 z-50 w-fit">
        <input className="drawer-toggle" id="my-drawer" type="checkbox" />

        <div className="drawer-content">
          <label htmlFor="my-drawer" className="cursor-pointer relative">
            <FiMenu
              onClick={changeWidth}
              size={"32px"}
              className="m-4 text-white hover:text-blue-500 transition-all duration-300"
            />
          </label>
        </div>

        <div className="drawer-side w-0">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>

          <ul className="menu p-6 w-64 min-h-full bg-black text-white border-r border-gray-800 flex flex-col">
            <li className="w-fit self-end">
              <button onClick={hideDrawer}>
                <AiFillCloseCircle
                  size={24}
                  className="hover:text-blue-500 transition-all duration-300"
                />
              </button>
            </li>

            <div className="mt-6 space-y-2">
              <li>
                <Link
                  className="hover:text-blue-500 transition-all duration-300"
                  to="/"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-blue-500 transition-all duration-300"
                  to="/admin/dashboard"
                >
                  Admin Dashboard
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-blue-500 transition-all duration-300"
                  to="/course/create"
                >
                  Create New Course
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-blue-500 transition-all duration-300"
                  to="/courses"
                >
                  All Courses
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-blue-500 transition-all duration-300"
                  to="/contact"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  className="hover:text-blue-500 transition-all duration-300"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
            </div>

            {/* Buttons */}
            <div className="mt-auto pt-8 space-y-3">
              <button
                className="w-full border border-blue-500 text-white py-2 rounded-md 
                           hover:bg-blue-500/10 transition-all duration-300"
              >
                <Link to="/login">Login</Link>
              </button>

              <button
                className="w-full bg-blue-600 text-white py-2 rounded-md 
                           hover:bg-blue-700 transition-all duration-300"
              >
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
