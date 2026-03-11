import HomeLayout from "@/Layouts/HomeLayout";
import { resetPassword } from "@/Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleReset(e) {
    e.preventDefault();

    if (!password) {
      toast.error("Please enter new password");
      return;
    }

    const response = await dispatch(
      resetPassword({
        token,
        password,
      }),
    );

    if (response?.payload?.success) {
      navigate("/login");
    }
  }

  return (
    <HomeLayout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black"></div>

        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <form
          onSubmit={handleReset}
          className="relative z-10 w-96 p-8 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)] text-white flex flex-col gap-4"
        >
          <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Reset Password
          </h1>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="bg-transparent px-3 py-2 rounded-md border border-blue-500/40 focus:outline-none focus:border-blue-500 transition-all duration-300 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-lg"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button
            type="submit"
            className="mt-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-md py-2 font-semibold text-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            Reset Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ResetPassword;
