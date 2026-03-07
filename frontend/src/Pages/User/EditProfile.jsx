import HomeLayout from "@/Layouts/HomeLayout";
import { getUserData, updateProfile } from "@/Redux/Slices/AuthSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    previewImage: "",
    fullName: "",
    avatar: undefined,
    userId: useSelector((state) => state?.auth?.data?._id),
  });

  function handleImageUpload(e) {
    e.preventDefault();
    const uploadedImage = e.target.files[0];
    if (uploadedImage) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setData({
          ...data,
          previewImage: this.result,
          avatar: uploadedImage,
        });
      });
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    console.log(data);
    if (!data.fullName || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }
    if (data.fullName.length < 5) {
      toast.error("Name cannot be of less than 5 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);
    console.log(formData.entries().next());
    console.log(formData.entries().next());
    await dispatch(updateProfile([data.userId, formData]));

    await dispatch(getUserData());

    navigate("/user/profile");
  }

  return (
    <HomeLayout>
      <div className="min-h-screen flex items-center justify-center  bg-gradient-to-br from-black via-blue-950 to-black">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-6 rounded-xl p-8 text-white w-[420px] bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)]"
        >
          <h1 className="text-center text-2xl font-semibold">Edit Profile</h1>

          <label className="cursor-pointer" htmlFor="image_uploads">
            {data.previewImage ? (
              <img
                className="w-40 h-40 object-cover rounded-full m-auto border-4 border-blue-500"
                src={data.previewImage}
              />
            ) : (
              <BsPersonCircle className="w-40 h-40 rounded-full m-auto text-blue-400" />
            )}
          </label>

          <input
            onChange={handleImageUpload}
            className="hidden"
            type="file"
            id="image_uploads"
            name="image_uploads"
            accept=".jpg, .png, .svg, .jpeg"
          />

          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-blue-400"
            >
              Full Name
            </label>

            <input
              required
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Enter your name"
              className="bg-transparent px-3 py-2 border border-blue-500/40 
          rounded-md focus:outline-none focus:border-blue-500"
              value={data.fullName}
              onChange={handleInputChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold text-lg 
        bg-blue-600 hover:bg-blue-500 transition-all duration-300"
          >
            Update Profile
          </button>

          <Link to="/user/profile">
            <p className="flex items-center justify-center gap-2 text-blue-400 hover:text-blue-300 transition">
              <AiOutlineArrowLeft /> Go back to profile
            </p>
          </Link>
        </form>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
