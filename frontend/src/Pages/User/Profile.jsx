import HomeLayout from "@/Layouts/HomeLayout";
import { getUserData } from "@/Redux/Slices/AuthSlice";
import { cancelCourseBundle } from "@/Redux/Slices/RazorpaySlice";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.data);

  async function handleCancellation() {
    toast("Initiating cancellation");
    await dispatch(cancelCourseBundle());
    await dispatch(getUserData());
    toast.success("Cancellation completed!");
    navigate("/");
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-950 to-black">
        <div className="my-10 flex flex-col gap-4 rounded-xl p-6 text-white w-96  bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.8)]">
          <img
            src={userData?.avatar?.secure_url}
            className="w-40 h-40 object-cover m-auto rounded-full border-4 border-blue-500"
          />

          <h3 className="text-xl font-semibold text-center capitalize">
            {userData?.fullName}
          </h3>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <p className="text-blue-400">Email:</p>
            <p className="truncate">{userData?.email}</p>

            <p className="text-blue-400">Role:</p>
            <p>{userData?.role}</p>

            <p className="text-blue-400">Subscription:</p>
            <p>
              {userData?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 mt-2">
            <Link
              to="/changepassword"
              className="w-1/2 text-center py-2 rounded-md font-semibold border border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
            >
              Change Password
            </Link>

            <Link
              to="/user/editprofile"
              className="w-1/2 text-center py-2 rounded-md font-semibold bg-blue-600 hover:bg-blue-500 transition-all duration-300"
            >
              Edit Profile
            </Link>
          </div>

          {userData?.subscription?.status === "active" && (
            <button
              onClick={handleCancellation}
              className="w-full mt-2 py-2 rounded-md font-semibold bg-red-600 hover:bg-red-500 transition-all duration-300"
            >
              Cancel Subscription
            </button>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default Profile;
