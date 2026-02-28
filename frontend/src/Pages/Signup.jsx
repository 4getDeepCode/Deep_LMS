import { BsPersonCircle } from "react-icons/bs";
import HomeLayout from "@/Layouts/HomeLayout";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { isEmail, isValidPassword } from "@/Helpers/regexMatcher";
import { createAccount } from "@/Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details");
      return;
    }

    // checking name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }
    // checking valid email
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }
    // checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password should be 6 - 16 character long with atleast a number and special character",
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action

    const response = await dispatch(createAccount(formData));

    if (response?.payload?.success) {
      navigate("/");

      // Reset only after successful account creation
      setSignupData({
        fullName: "",
        email: "",
        password: "",
        avatar: "",
      });
      setPreviewImage("");
    }
  }

  return (
    

    <HomeLayout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black animate-[gradientMove_8s_ease_infinite]"></div>

 
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <form
          noValidate
          onSubmit={createNewAccount}
          className="relative z-10 flex flex-col gap-4 w-96 p-8 rounded-xl
                   bg-white/5 backdrop-blur-lg border border-white/10
                   shadow-[0_0_30px_rgba(0,0,0,0.6)] text-white"
        >
          <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Registration Page
          </h1>

          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img
                className="w-24 h-24 rounded-full m-auto object-cover border border-blue-500"
                src={previewImage}
              />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto text-blue-400" />
            )}
          </label>

          <input
            onChange={getImage}
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".jpg, .jpeg, .png,"
          />

     
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold text-gray-300">
              Name
            </label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter your name.."
              className="bg-transparent px-3 py-2 border border-blue-500/40 rounded-md
                       focus:outline-none focus:border-blue-500
                       transition-all duration-300"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-semibold text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter your email.."
              className="bg-transparent px-3 py-2 border border-blue-500/40 rounded-md
                       focus:outline-none focus:border-blue-500
                       transition-all duration-300"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

  
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter your password.."
              className="bg-transparent px-3 py-2 border border-blue-500/40 rounded-md
                       focus:outline-none focus:border-blue-500
                       transition-all duration-300"
              onChange={handleUserInput}
              value={signupData.password}
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
            Create Account
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-cyan-400 transition-colors duration-300"
            >
              Login
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

export default Signup;
