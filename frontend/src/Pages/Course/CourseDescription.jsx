import HomeLayout from "@/Layouts/HomeLayout";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function CourseDescription() {
  const { state } = useLocation();

  const { role, data } = useSelector((state) => state.auth);

  return (
    <HomeLayout>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black animate-[gradientMove_8s_ease_infinite]"></div>

        {/* Glow Effects */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10 min-h-[90vh] pt-10 px-10 flex items-center justify-center text-white">
          <div className="grid md:grid-cols-2 gap-12 py-10 w-full max-w-6xl">
            {/* Left Section */}
            <div className="space-y-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <img
                className="w-full h-64 object-cover rounded-lg"
                alt="thumbnail"
                src={state?.thumbnail?.secure_url}
              />

              <div className="space-y-4 text-lg">
                <p className="font-semibold text-gray-300">
                  <span className="text-blue-400 font-bold">
                    Total lectures :
                  </span>{" "}
                  {state?.numberOfLectures}
                </p>

                <p className="font-semibold text-gray-300">
                  <span className="text-blue-400 font-bold">Instructor :</span>{" "}
                  {state?.createdBy}
                </p>

                {role === "ADMIN" || data?.subscription?.status === "active" ? (
                  <button
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-500
                             text-xl rounded-md font-bold px-5 py-3
                             transition-all duration-300 ease-in-out
                             hover:scale-105 hover:-translate-y-1
                             hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                  >
                    Watch Lectures
                  </button>
                ) : (
                  <button
                    className="mt-4 w-full bg-gradient-to-r from-blue-600 to-cyan-500
                             text-xl rounded-md font-bold px-5 py-3
                             transition-all duration-300 ease-in-out
                             hover:scale-105 hover:-translate-y-1
                             hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
              <h1
                className="text-4xl font-bold text-center
                           bg-gradient-to-r from-blue-500 to-cyan-400
                           bg-clip-text text-transparent"
              >
                {state?.title}
              </h1>

              <p className="text-blue-400 font-semibold text-lg">
                Course Description:
              </p>

              <p className="text-gray-300 leading-relaxed">
                {state?.description}
              </p>
            </div>
          </div>
        </div>

        <style>
          {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
        </style>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
