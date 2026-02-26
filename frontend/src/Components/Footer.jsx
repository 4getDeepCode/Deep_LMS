
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-black via-gray-900 to-black text-white px-6 md:px-20 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-wide">
            <span className="text-blue-500">Deep</span>
            <span className="text-white">LMS</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-sm">
            Building the future of learning through mentorship and innovation.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © {year} DeepLMS. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <a
            href="#"
            className="p-3 rounded-full border border-gray-700 
                       hover:border-blue-500 hover:bg-blue-500/10
                       hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]
                       transition-all duration-300 hover:scale-110"
          >
            <BsFacebook />
          </a>

          <a
            href="#"
            className="p-3 rounded-full border border-gray-700 
                       hover:border-blue-500 hover:bg-blue-500/10
                       hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]
                       transition-all duration-300 hover:scale-110"
          >
            <BsInstagram />
          </a>

          <a
            href="#"
            className="p-3 rounded-full border border-gray-700 
                       hover:border-blue-500 hover:bg-blue-500/10
                       hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]
                       transition-all duration-300 hover:scale-110"
          >
            <BsLinkedin />
          </a>

          <a
            href="#"
            className="p-3 rounded-full border border-gray-700 
                       hover:border-blue-500 hover:bg-blue-500/10
                       hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]
                       transition-all duration-300 hover:scale-110"
          >
            <BsTwitter />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        Designed & Developed by Deep Chand 
      </div>
    </footer>
  );
}

export default Footer;
