import HomeLayout from "@/Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "@/Redux/Slices/LectureSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function Displaylectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);

  async function onLectureDelete(courseId, lectureId) {
    console.log(courseId, lectureId);
    await dispatch(
      deleteCourseLecture({ courseId: courseId, lectureId: lectureId }),
    );
    await dispatch(getCourseLectures(courseId));
  }

  useEffect(() => {
    console.log(state);
    if (!state) navigate("/courses");
    dispatch(getCourseLectures(state._id));
  }, []);

  return (
    <HomeLayout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen py-10 text-white bg-gradient-to-br from-black via-blue-950 to-black">
        <div className="text-center text-2xl font-semibold text-blue-400">
          Course Name: {state?.title}
        </div>

        {lectures && lectures.length > 0 ? (
          <div className="flex flex-col lg:flex-row justify-center gap-10 w-full">
            {/* Left Section - Video Player */}
            <div
              className="space-y-5 w-full max-w-md p-4 rounded-xl 
                         bg-white/5 backdrop-blur-md border border-white/10 
                        shadow-[0_0_25px_rgba(0,0,0,0.8)]"
            >
              <video
                src={lectures && lectures[currentVideo]?.lecture?.secure_url}
                className="object-fill rounded-lg w-full"
                controls
                disablePictureInPicture
                muted
                controlsList="nodownload"
              />

              <div className="space-y-2">
                <h1>
                  <span className="text-blue-400 font-semibold">Title: </span>
                  {lectures && lectures[currentVideo]?.title}
                </h1>

                <p>
                  <span className="text-blue-400 font-semibold">
                    Description:{" "}
                  </span>
                  {lectures && lectures[currentVideo]?.description}
                </p>
              </div>
            </div>

            <ul
              className="w-full max-w-md p-4 rounded-xl 
                        bg-white/5 backdrop-blur-md border border-white/10 
                         shadow-[0_0_25px_rgba(0,0,0,0.8)] space-y-4"
            >
              <li className="font-semibold text-xl text-blue-400 flex items-center justify-between">
                <p>Lectures List</p>

                {role === "ADMIN" && (
                  <button
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md font-semibold text-sm transition"
                  >
                    Add New Lecture
                  </button>
                )}
              </li>

              {lectures &&
                lectures.map((lecture, idx) => {
                  return (
                    <li
                      className="space-y-2 border-b border-white/10 pb-2"
                      key={lecture._id}
                    >
                      <p
                        className="cursor-pointer hover:text-blue-400 transition"
                        onClick={() => setCurrentVideo(idx)}
                      >
                        <span className="font-semibold">
                          Lecture {idx + 1}:
                        </span>{" "}
                        {lecture?.title}
                      </p>

                      {role === "ADMIN" && (
                        <button
                          onClick={() =>
                            onLectureDelete(state?._id, lecture?._id)
                          }
                          className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md font-semibold text-sm transition"
                        >
                          Delete Lecture
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          role === "ADMIN" && (
            <button
              onClick={() =>
                navigate("/course/addlecture", { state: { ...state } })
              }
              className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md font-semibold text-sm transition"
            >
              Add New Lecture
            </button>
          )
        )}
      </div>
    </HomeLayout>
  );
}

export default Displaylectures;
