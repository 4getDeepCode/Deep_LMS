import HomeLayout from "@/Layouts/HomeLayout";
import { addCourseLecture } from "@/Redux/Slices/LectureSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function AddLecture() {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  function handleVideo(e) {
    const video = e.target.files[0];
    const source = window.URL.createObjectURL(video);
    console.log(source);
    setUserInput({
      ...userInput,
      lecture: video,
      videoSrc: source,
    });
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.lecture || !userInput.title || !userInput.description) {
      toast.error("All fields are mandatory");
      return;
    }
    const response = await dispatch(addCourseLecture(userInput));
    if (response?.payload?.success) {
      navigate(-1);
      setUserInput({
        id: courseDetails?._id,
        lecture: undefined,
        title: "",
        description: "",
        videoSrc: "",
      });
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
  }, []);

  return (
    <HomeLayout>
      <div
        className="min-h-screen flex items-center justify-center px-4 text-white
                   bg-gradient-to-br from-black via-blue-950 to-black"
      >
        <div
          className="w-full max-w-md bg-white/5 backdrop-blur-md
                    border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] p-6"
        >
          <header className="flex items-center justify-center relative mb-4">
            <button
              className="absolute left-0 text-2xl text-blue-400 hover:text-blue-300 transition"
              onClick={() => navigate(-1)}
            >
              <AiOutlineArrowLeft />
            </button>

            <h1 className="text-xl font-semibold text-blue-400">
              Add New Lecture
            </h1>
          </header>

          <form onSubmit={onFormSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              placeholder="Enter lecture title"
              onChange={handleInputChange}
              value={userInput.title}
              className="bg-transparent px-3 py-2 border border-blue-500/40
                        rounded-md focus:outline-none focus:border-blue-500"
            />

            <textarea
              name="description"
              placeholder="Enter lecture description"
              onChange={handleInputChange}
              value={userInput.description}
              className="bg-transparent px-3 py-2 border border-blue-500/40
                        rounded-md resize-none h-32 focus:outline-none focus:border-blue-500"
            />

            {userInput.videoSrc ? (
              <video
                muted
                src={userInput.videoSrc}
                controls
                controlsList="nodownload nofullscreen"
                disablePictureInPicture
                className="w-full rounded-lg"
              />
            ) : (
              <div
                className="h-40 border border-dashed border-blue-400/50
                            flex items-center justify-center rounded-lg"
              >
                <label
                  htmlFor="lecture"
                  className="cursor-pointer text-blue-400 font-medium"
                >
                  Upload Lecture Video
                </label>

                <input
                  type="file"
                  className="hidden"
                  id="lecture"
                  name="lecture"
                  onChange={handleVideo}
                  accept="video/mp4 video/x-mp4 video/*"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 rounded-md font-semibold text-lg
                        bg-blue-600 hover:bg-blue-500 transition-all duration-300"
            >
              Add New Lecture
            </button>
          </form>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
