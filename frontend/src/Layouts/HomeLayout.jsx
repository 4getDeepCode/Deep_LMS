import Footer from "@/Components/Footer";
import { logout } from "@/Redux/Slices/AuthSlice";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function HomeLayout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

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

  async function handleLogout(e) {
    e.preventDefault();

    const res = await dispatch(logout());
    if (res?.payload?.success) navigate("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white">
      <nav className="hidden lg:flex justify-between items-center px-10 py-4 border-b border-gray-800 sticky top-0 z-50 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-md">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
        >
          <img
            src={logo}
            className="h-10 w-auto object-contain"
            alt="DeepLMS-Logo"
          />
          {/* DeepLMS */}
        </Link>

        <div className="flex items-center gap-8">
          <Link className="hover:text-blue-500 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-blue-500 transition" to="/courses">
            Courses
          </Link>

          <Link className="hover:text-blue-500 transition" to="/contact">
            Contact
          </Link>

          <Link className="hover:text-blue-500 transition" to="/about">
            About
          </Link>

          {isLoggedIn && role === "ADMIN" && (
            <>
              <Link
                className="hover:text-blue-500 transition"
                to="/admin/dashboard"
              >
                Dashboard
              </Link>

              <Link
                className="hover:text-blue-500 transition"
                to="/course/create"
              >
                Create Course
              </Link>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="border border-blue-500 px-4 py-1 rounded-md hover:bg-blue-500/10"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 rounded-md"
              >
                Signup
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link
                to="/user/profile"
                className="border border-blue-500 px-4 py-1 rounded-md hover:bg-blue-500/10"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className="drawer lg:hidden absolute left-0 z-50 w-fit">
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
                <Link onClick={hideDrawer} to="/">
                  Home
                </Link>
              </li>

              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link onClick={hideDrawer} to="/admin/dashboard">
                    Admin Dashboard
                  </Link>
                </li>
              )}

              {isLoggedIn && role === "ADMIN" && (
                <li>
                  <Link onClick={hideDrawer} to="/course/create">
                    Create New Course
                  </Link>
                </li>
              )}

              <li>
                <Link onClick={hideDrawer} to="/courses">
                  All Courses
                </Link>
              </li>

              <li>
                <Link onClick={hideDrawer} to="/contact">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link onClick={hideDrawer} to="/about">
                  About Us
                </Link>
              </li>
            </div>

            {!isLoggedIn && (
              <div className="mt-auto pt-8 space-y-3">
                <Link
                  to="/login"
                  className="w-full text-center block border border-blue-500 py-2 rounded-md hover:bg-blue-500/10"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="w-full text-center block bg-gradient-to-r from-blue-600 to-cyan-500 py-2 rounded-md"
                >
                  Signup
                </Link>
              </div>
            )}

            {isLoggedIn && (
              <div className="mt-auto pt-8 space-y-3">
                <Link
                  to="/user/profile"
                  className="w-full text-center block border border-blue-500 py-2 rounded-md hover:bg-blue-500/10"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 py-2 rounded-md"
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </div>
      </div>

      {children}

      <Footer />
    </div>
  );
}

export default HomeLayout;
