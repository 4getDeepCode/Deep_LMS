import HomeLayout from "@/Layouts/HomeLayout";
import { forgotPassword } from "@/Redux/Slices/AuthSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function ForgotPassword() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    await dispatch(forgotPassword(email));

    setEmail("");
  }

  return (
    <HomeLayout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black"></div>

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 w-96 p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] text-white flex flex-col gap-4"
        >
          <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Forgot Password
          </h1>

          <p className="text-sm text-gray-400 text-center">
            Enter your registered email and we will send you a reset link.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="bg-transparent px-3 py-2 rounded-md border border-blue-500/40 focus:outline-none focus:border-blue-500 transition-all duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md py-2 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            Send Reset Link
          </button>

          <p className="text-center text-gray-400">
            Remember password?{" "}
            <Link to="/login" className="text-blue-400 hover:text-cyan-400">
              Login
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ForgotPassword;
