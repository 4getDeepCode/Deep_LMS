import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HomeLayout from "@/Layouts/HomeLayout";

const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

const StatCard = ({ number, suffix, label }) => {
  const count = useCountUp(number);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-black border border-gray-800 rounded-xl p-8 text-center
                 hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
                 transition-all duration-300"
    >
      <h2 className="text-4xl font-bold text-blue-500">
        {count}
        {suffix}
      </h2>
      <p className="text-gray-400 mt-2">{label}</p>
    </motion.div>
  );
};

const testimonials = [
  {
    name: "Rahul Sharma",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    text: "DeepLMS completely transformed my learning experience.",
  },
  {
    name: "Priya Singh",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "Secure payments and structured learning. Amazing platform!",
  },
  {
    name: "Aman Verma",
    image:
      "https://media.istockphoto.com/id/177383755/photo/indian-businessman.jpg?s=1024x1024&w=is&k=20&c=4tsW0e_QWRQ6qTxEznMMADuhmLmUQ9_sAFY_GJKgLxk=",
    text: "Modern, scalable and beautifully designed LMS.",
  },
];

const AboutUs = () => {
  return (
    <HomeLayout>
      <div className="relative overflow-hidden min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white py-20 px-6">
        <div className="absolute inset-0 bg-blue-600/10 blur-3xl opacity-30"></div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-bold mb-6">
                Building The Future of{" "}
                <span className="text-blue-500">Digital Learning</span>
              </h1>
              <p className="text-gray-400 text-lg">
                DeepLMS is a scalable and secure learning management platform
                built with modern technologies and premium UI.
              </p>
            </motion.div>

            <motion.img
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Learning Platform"
              className="rounded-2xl shadow-2xl border border-gray-800"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <StatCard number={100} suffix="+" label="Active Students" />
            <StatCard number={20} suffix="+" label="Premium Courses" />
            <StatCard number={10} suffix="+" label="Expert Mentors" />
            <StatCard number={95} suffix="%" label="Success Rate" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              alt="Project Journey"
              className="rounded-2xl shadow-xl border border-gray-800"
            />

            <ul className="space-y-6">
              <li className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-500">Idea </h3>
                <p className="text-gray-400">DeepLMS Planning & Research</p>
              </li>
              <li className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-500">Backend </h3>
                <p className="text-gray-400">Authentication, APIs & Payments</p>
              </li>
              <li className="border-l-2 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-500">Frontend </h3>
                <p className="text-gray-400">Dashboard & UI Development</p>
              </li>
            </ul>
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">
              What Our Users Say
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <div
                  key={index}
                  className="bg-black border border-gray-800 rounded-xl p-6 text-center
                             hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]
                             transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border border-gray-700">
                    <img src={t.image} alt={t.name} />
                  </div>
                  <p className="italic text-gray-400">"{t.text}"</p>
                  <h3 className="mt-4 font-semibold text-blue-500">{t.name}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Founder */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
            <motion.img
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              src="https://images.unsplash.com/photo-1556157382-97eda2d62296"
              alt="Founder"
              className="rounded-2xl shadow-2xl border border-gray-800"
            />

            <div>
              <h2 className="text-3xl font-bold text-blue-500 mb-4">
                Founder’s Message
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                DeepLMS was created to build a powerful digital learning
                ecosystem. Our goal is to provide secure, scalable, and
                beautifully designed education platforms for the future.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Upgrade Your Skills?
            </h2>

            <Link to="/courses">
              <button
                className="bg-blue-600 px-8 py-3 rounded-md font-semibold
                                 hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]
                                 transition-all duration-300"
              >
                Explore Courses
              </button>
            </Link>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default AboutUs;
