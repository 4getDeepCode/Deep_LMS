import HomeLayout from "@/Layouts/HomeLayout";
import { deleteCourse, getAllCourses } from "@/Redux/Slices/CourseSlice";
import { getPaymentRecord } from "@/Redux/Slices/RazorpaySlice";
import { getStatsData } from "@/Redux/Slices/StatSlice";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  Title,
  Tooltip,
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allUsersCount, subscribedCount } = useSelector((state) => state.stat);

  const { allPayments, monthlySalesRecord } = useSelector(
    (state) => state.razorpay,
  );

  const userData = {
    labels: ["Registered User", "Enrolled User"],
    fontColor: "white",
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"],
      },
    ],
  };

  const salesData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    fontColor: "white",
    datasets: [
      {
        label: "Sales / Month",
        data: monthlySalesRecord,
        backgroundColor: ["red"],
        borderColor: ["white"],
        borderWidth: 2,
      },
    ],
  };

  const myCourses = useSelector((state) => state?.course?.courseData);

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ? ")) {
      const res = await dispatch(deleteCourse(id));
      console.log(res);
      if (res?.payload?.success) {
        await dispatch(getAllCourses());
      }
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, []);

  return (
    <HomeLayout>
      <div className="min-h-screen pt-8 flex flex-col gap-12 text-white bg-gradient-to-br from-black via-blue-950 to-black">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-blue-400">
          Admin Dashboard
        </h1>

        <div className="grid lg:grid-cols-2 gap-8 mx-[5%]">
          <div className="flex flex-col items-center gap-10 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
            <div className="w-72 h-72">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-semibold text-sm">Registered Users</p>
                  <h3 className="text-3xl font-bold">{allUsersCount}</h3>
                </div>
                <FaUsers className="text-blue-400 text-4xl" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-semibold text-sm">Subscribed Users</p>
                  <h3 className="text-3xl font-bold">{subscribedCount}</h3>
                </div>
                <FaUsers className="text-green-400 text-4xl" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.6)]">
            <div className="h-72 w-full relative">
              <Bar
                className="absolute bottom-0 w-full h-full"
                data={salesData}
              />
            </div>

            <div className="grid grid-cols-2 gap-6 w-full">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-semibold text-sm">Subscriptions</p>
                  <h3 className="text-3xl font-bold">{allPayments?.count}</h3>
                </div>
                <FcSalesPerformance className="text-4xl" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
                <div>
                  <p className="font-semibold text-sm">Total Revenue</p>
                  <h3 className="text-3xl font-bold">
                    ₹{allPayments?.count * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-400 text-4xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[5%] flex flex-col gap-8 mb-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-blue-400">
              Courses Overview
            </h1>

            <button
              onClick={() => navigate("/course/create")}
              className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-lg font-semibold"
            >
              Create New Course
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
            <table className="table w-full text-sm">
              <thead className="bg-black/40 text-blue-300">
                <tr>
                  <th>S No</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Instructor</th>
                  <th>Lectures</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myCourses?.map((course, idx) => (
                  <tr key={course._id} className="hover:bg-white/10">
                    <td>{idx + 1}</td>

                    <td>
                      <textarea
                        readOnly
                        value={course?.title}
                        className="w-40 bg-transparent resize-none"
                      />
                    </td>

                    <td>{course?.category}</td>

                    <td>{course?.createdBy}</td>

                    <td>{course?.numberOfLectures}</td>

                    <td>
                      <textarea
                        value={course?.description}
                        readOnly
                        className="w-64 bg-transparent resize-none"
                      />
                    </td>

                    <td className="flex gap-3">
                      <button
                        className="bg-blue-600 hover:bg-blue-500 text-lg py-2 px-3 rounded-md"
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course },
                          })
                        }
                      >
                        <BsCollectionPlayFill />
                      </button>

                      <button
                        className="bg-red-600 hover:bg-red-500 text-lg py-2 px-3 rounded-md"
                        onClick={() => onCourseDelete(course?._id)}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
