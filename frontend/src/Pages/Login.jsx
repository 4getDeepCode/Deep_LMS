import HomeLayout from "@/Layouts/HomeLayout";
import { login } from "@/Redux/Slices/AuthSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  async function onLogin(event) {
    event.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the details");
      return;
    }

    // dispatch create account action
    const response = await dispatch(login(loginData));
    if (response?.payload?.success) navigate("/");

    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      {/* <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
                <form noValidate onSubmit={onLogin} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]'>
                    <h1 className="text-center text-2xl font-bold">Login Page</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'> Email </label>
                        <input 
                            type="email" 
                            required
                            name="email"
                            id="email"
                            placeholder="Enter your email.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.email}
                        />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleUserInput}
                            value={loginData.password}
                        />
                    </div>

                    <button type="submit" className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                       Login
                    </button>

                    <p className="text-center">
                        Donot hanve an account ? <Link to="/signup" className='link text-accent cursor-pointer'> Signup</Link>
                    </p>

                </form>
            </div> */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black animate-[gradientMove_8s_ease_infinite]"></div>

        {/* Glow Effects */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <form
          noValidate
          onSubmit={onLogin}
          className="relative z-10 w-96 p-8 rounded-xl
                   bg-white/5 backdrop-blur-lg border border-white/10
                   shadow-[0_0_40px_rgba(0,0,0,0.6)]
                   text-white flex flex-col gap-4"
        >
          <h1
            className="text-center text-3xl font-bold
                       bg-gradient-to-r from-blue-500 to-cyan-400
                       bg-clip-text text-transparent"
          >
            Login Page
          </h1>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-gray-300 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email.."
              className="bg-transparent px-3 py-2 rounded-md
                       border border-blue-500/40
                       focus:outline-none focus:border-blue-500
                       transition-all duration-300"
              onChange={handleUserInput}
              value={loginData.email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-300 font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password.."
              className="bg-transparent px-3 py-2 rounded-md
                       border border-blue-500/40
                       focus:outline-none focus:border-blue-500
                       transition-all duration-300"
              onChange={handleUserInput}
              value={loginData.password}
            />
          </div>

          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-blue-600 to-cyan-500
                     rounded-md py-2 font-semibold text-lg
                     transition-all duration-300 ease-in-out
                     hover:scale-105 hover:-translate-y-1
                     hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            Login
          </button>

          <p className="text-center text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Signup
            </Link>
          </p>
        </form>

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

export default Login;
