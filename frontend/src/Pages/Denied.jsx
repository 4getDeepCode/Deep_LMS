import { useNavigate } from "react-router-dom";

function Denied() {
    const navigate = useNavigate();
    return (
        <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">

    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black animate-[gradientMove_8s_ease_infinite]"></div>

    {/* Glow Effects */}
    <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
    <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

    <div className="relative z-10 flex flex-col items-center">

      <h1 className="text-9xl font-extrabold tracking-widest
                     bg-gradient-to-r from-blue-500 to-cyan-400
                     bg-clip-text text-transparent">
        403
      </h1>

      <div className="mt-4 px-4 py-1 rounded-md
                      bg-white/5 backdrop-blur-md border border-white/10
                      text-gray-300 text-sm">
        Access Denied
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500
                   px-8 py-3 rounded-md font-semibold text-white
                   transition-all duration-300 ease-in-out
                   hover:scale-105 hover:-translate-y-1
                   hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
      >
        Go Back
      </button>

    </div>

    <style>
      {`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}
    </style>

  </main>
    );

}

export default Denied;