import { BiRupee } from "react-icons/bi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "@/Layouts/HomeLayout";
import {
  getRazorPayId,
  purchaseCourseBundle,
  verifyUserPayment,
} from "@/Redux/Slices/RazorpaySlice";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const razorpayKey = useSelector((state) => state?.razorpay?.key);
  const subscription_id = useSelector(
    (state) => state?.razorpay?.subscription_id,
  );
  const paymentDetails = {
    razorpay_payment_id: "",
    razorpay_subscription_id: "",
    razorpay_signature: "",
  };

  async function handleSubscription(e) {
    e.preventDefault();
    if (!razorpayKey || !subscription_id) {
      toast.error("Something went wrong");
      return;
    }
    const options = {
      key: razorpayKey,
      subscription_id: subscription_id,
      name: "Coursify Pvt. Ltd.",
      description: "Subscription",
      theme: {
        color: "#F37254",
      },

      handler: async function (response) {
        paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
        paymentDetails.razorpay_signature = response.razorpay_signature;
        paymentDetails.razorpay_subscription_id =
          response.razorpay_subscription_id;

        toast.success("Payment successfull");

        const res = await dispatch(verifyUserPayment(paymentDetails));
        console.log(res);
        res?.payload?.success
          ? navigate("/checkout/success")
          : navigate("/checkout/fail");
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  async function load() {
    await dispatch(getRazorPayId());
    await dispatch(purchaseCourseBundle());
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <HomeLayout>
      <form
        onSubmit={handleSubscription}
        className="min-h-screen flex items-center justify-center text-white"
      >
        <div
          className="w-80 h-[26rem] flex flex-col justify-center 
    bg-white/5 backdrop-blur-md border border-white/10 
    shadow-[0_0_25px_rgba(0,0,0,0.8)] rounded-xl relative"
        >
          <h1 className="bg-blue-600 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-xl rounded-tr-xl">
            Subscription Bundle
          </h1>

          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px] text-gray-200 pt-8">
              This purchase will allow you to access all available course of our
              platform for{" "}
              <span className="text-blue-400 font-bold">
                <br />1 Year duration
              </span>{" "}
              All the existing and new launched courses will be also available
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-400">
              <BiRupee />
              <span>499</span> only
            </p>

            <div className="text-gray-300">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions applied *</p>
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 transition-all duration-300 
          absolute bottom-0 w-full left-0 text-xl font-bold 
          rounded-bl-xl rounded-br-xl py-2"
            >
              Buy now
            </button>
          </div>
        </div>
      </form>
    </HomeLayout>
  );
}

export default Checkout;
