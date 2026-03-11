import HomeLayout from "@/Layouts/HomeLayout";
import HomePageImage from "../assets/HomePage.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <HomeLayout>
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 px-6 sm:px-10 lg:px-20 py-12 min-h-[90vh]">
        <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-semibold leading-tight">
            Upgrade Your Skills{" "}
            <span className="text-blue-500 font-bold">with Top Courses</span>
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl">
            Access a wide range of expert-led courses designed to help you grow
            your skills at an affordable price.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
            <Link to="/courses">
              <button className="bg-blue-600 px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                Start Learning
              </button>
            </Link>

            <Link to="/contact">
              <button className="border border-blue-500 px-6 py-3 rounded-md font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300">
                Talk to Us
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src={HomePageImage}
            alt="homepage"
            className="w-[80%] sm:w-[60%] lg:w-[90%] max-w-md"
          />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
