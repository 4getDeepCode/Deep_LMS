import CourseCard from "@/Components/CourseCard";
import HomeLayout from "@/Layouts/HomeLayout";
import { getAllCourses } from "@/Redux/Slices/CourseSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CourseList() {
  const dispatch = useDispatch();

  const { courseData } = useSelector((state) => state.course);

  async function loadCourses() {
    await dispatch(getAllCourses());
  }

  useEffect(() => {
    loadCourses();
  }, []);

  return (
    <HomeLayout>
      <div className="relative min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-blue-950 to-black animate-[gradientMove_8s_ease_infinite]"></div>

        {/* Glow Effects */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-600 rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] opacity-20"></div>

        <div className="relative z-10 min-h-[90vh] pt-8 px-8 flex flex-col gap-8 text-white">
          <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Explore the courses made by
            <span className="block text-white mt-2 text-2xl font-semibold">
              Industry Experts
            </span>
          </h1>

          <div className="flex flex-wrap justify-center gap-10">
            {courseData?.map((element) => {
              return <CourseCard key={element._id} data={element} />;
            })}
          </div>
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
      </div>
    </HomeLayout>
  );
}

export default CourseList;
