import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "@/Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/Layouts/HomeLayout";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword) {
      return;
    }

    const response = await dispatch(changePassword(formData));

    if (response?.payload?.success) {
      navigate("/");
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex justify-center items-center text-white bg-gradient-to-br from-black via-blue-950 to-black">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-6 p-8 rounded-xl bg-white/5 backdrop-blur-md border border-white/10  shadow-[0_0_25px_rgba(0,0,0,0.6)] w-96"
        >
          <h1 className="text-3xl font-bold text-center text-blue-400">
            Change Password
          </h1>

          <div className="relative">
            <input
              type={showOld ? "text" : "password"}
              name="oldPassword"
              placeholder="Enter Old Password"
              value={formData.oldPassword}
              onChange={handleInputChange}
              className="input input-bordered bg-black/40 border-white/20 focus:border-blue-400 w-full"
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-lg"
              onClick={() => setShowOld(!showOld)}
            >
              {showOld ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showNew ? "text" : "password"}
              name="newPassword"
              placeholder="Enter New Password"
              value={formData.newPassword}
              onChange={handleInputChange}
              className="input input-bordered bg-black/40 border-white/20 focus:border-blue-400 w-full"
            />

            <button
              type="button"
              className="absolute right-3 top-3 text-lg"
              onClick={() => setShowNew(!showNew)}
            >
              {showNew ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 transition py-2 rounded-lg font-semibold">
            Change Password
          </button>
        </form>
      </div>
    </HomeLayout>
  );
}

export default ChangePassword;
