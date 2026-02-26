import HomeLayout from "@/Layouts/HomeLayout";
import HomePageImage from "../assets/HomePage.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <HomeLayout>
      <div className="pt-10 flex items-center justify-center gap-10 mx-16 h-screen">
        <div className="w-1/2 space-y-6">
          <h1 className="text-5xl font-semibold">
            Upgrade Your Skills{" "}
            <span className="text-blue-500 font-bold">with Top Courses</span>
          </h1>

          <p className="text-xl text-gray-300">
            Access a wide range of expert-led courses designed to help you grow
            your skills at an affordable price.
          </p>

          <div className="space-x-6">
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
        <div className="w-1/2 flex items-center justify-center">
          <img alt="homepage image" src={HomePageImage} />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;
