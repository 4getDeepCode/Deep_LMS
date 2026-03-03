import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/course/description/", { state: { ...data } })}
      className="w-[22rem] h-[430px] rounded-xl cursor-pointer group overflow-hidden
               bg-white/5 backdrop-blur-lg border border-white/10
               shadow-[0_0_30px_rgba(0,0,0,0.6)]
               transition-all duration-300 ease-in-out
               hover:scale-105 hover:-translate-y-2
               hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]"
    >
    <div className="overflow-hidden">
        <img
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={data?.thumbnail?.secure_url}
          alt="course thumbnail"
        />

        <div className="p-4 space-y-2 text-white">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent line-clamp-2">
            {data?.title}
          </h2>

          <p className="text-gray-300 line-clamp-2">{data?.description}</p>

          <p className="font-semibold text-gray-300">
            <span className="text-blue-400 font-bold">Category : </span>
            {data?.category}
          </p>

          <p className="font-semibold text-gray-300">
            <span className="text-blue-400 font-bold">Total lectures : </span>
            {data?.numberoflectures}
          </p>

          <p className="font-semibold text-gray-300">
            <span className="text-blue-400 font-bold">Instructor : </span>
            {data?.createdBy}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
