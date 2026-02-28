import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeLayout from "@/Layouts/HomeLayout";

const NotFound = () => {
  return (
    <HomeLayout>
      <div className="relative min-h-screen hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black animate-[gradientMove_8s_ease_infinite]"></div>

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content text-center relative z-10"
        >
          <div className="max-w-2xl">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
            >
              404
            </motion.h1>

            <h2 className="mt-6 text-3xl md:text-4xl font-bold text-white">
              Oops! Page Not Found
            </h2>

            <p className="py-6 text-gray-400">
              The page you're trying to access doesn’t exist or has been moved.
              Let’s guide you back to your learning journey.
            </p>

            <div className="flex justify-center mb-8">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="404 Illustration"
                className="w-40 opacity-80 hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/*          
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="btn bg-gradient-to-r from-blue-600 to-cyan-500 border-none text-white hover:scale-105 transition-transform"
              >
                Go Home
              </Link>

              <Link
                to="/courses"
                className="btn btn-outline border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white"
              >
                Explore Courses
              </Link>
            </div> */}

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/"
                className="btn bg-gradient-to-r from-blue-600 to-cyan-500 border-none text-white 
               transition-all duration-300 ease-in-out 
               hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] 
               hover:-translate-y-1"
              >
                Go Home
              </Link>

              <Link
                to="/courses"
                className="btn btn-outline border-blue-500 text-blue-400 
               transition-all duration-300 ease-in-out 
               hover:bg-blue-600 hover:text-white 
               hover:scale-105 hover:-translate-y-1 
               hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        </motion.div>
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
    </HomeLayout>
  );
};

export default NotFound;
