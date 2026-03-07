import axiosInstance from "@/Helpers/axiosInstance";
import { isEmail } from "@/Helpers/regexMatcher";
import HomeLayout from "@/Layouts/HomeLayout";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }

    try {
      const response = axiosInstance.post("/contact", userInput);
      toast.promise(response, {
        loading: "Submitting your message...",
        success: "Form submitted successfully",
        error: "Failed to submit the form",
      });
      const contactResponse = await response;
      console.log(contactResponse);
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      }
    } catch (err) {
      toast.error("operation failed....");
    }
  }

  return (
    <HomeLayout>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black animate-[gradientMove_8s_ease_infinite]"></div>

        {/* Glow Effects */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <form
          noValidate
          onSubmit={onFormSubmit}
          className="relative z-10 flex flex-col items-center gap-4
               w-[24rem] p-8 rounded-xl
               bg-white/5 backdrop-blur-lg border border-white/10
               shadow-[0_0_40px_rgba(0,0,0,0.6)]
               text-white"
        >
          <h1
            className="text-3xl font-bold
                   bg-gradient-to-r from-blue-500 to-cyan-400
                   bg-clip-text text-transparent"
          >
            Contact Form
          </h1>

          {/* Name */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-gray-300 font-semibold">
              Name
            </label>
            <input
              className="bg-transparent px-3 py-2 rounded-md
                   border border-blue-500/40
                   focus:outline-none focus:border-blue-500
                   transition-all duration-300"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleInputChange}
              value={userInput.name}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-gray-300 font-semibold">
              Email
            </label>
            <input
              className="bg-transparent px-3 py-2 rounded-md
                   border border-blue-500/40
                   focus:outline-none focus:border-blue-500
                   transition-all duration-300"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={userInput.email}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-gray-300 font-semibold">
              Message
            </label>
            <textarea
              className="bg-transparent px-3 py-2 rounded-md resize-none h-40
                   border border-blue-500/40
                   focus:outline-none focus:border-blue-500
                   transition-all duration-300"
              id="message"
              name="message"
              placeholder="Enter your message"
              onChange={handleInputChange}
              value={userInput.message}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-3 bg-gradient-to-r from-blue-600 to-cyan-500
                 rounded-md py-2 font-semibold text-lg
                 transition-all duration-300 ease-in-out
                 hover:scale-105 hover:-translate-y-1
                 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
          >
            Submit
          </button>
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

export default Contact;
