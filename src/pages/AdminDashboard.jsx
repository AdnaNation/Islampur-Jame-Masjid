import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AdminDashboard = () => {
  const axiosPublic = useAxiosPublic();
  // const { data: stats, refetch: reload } = useQuery({
  //   queryKey: ["tarabi-stats"],
  //   queryFn: async () => await axiosPublic.get("/tarabi-stats"),
  // });
  const { data: totalPayment, refetch: refresh } = useQuery({
    queryKey: ["total-payment"],
    queryFn: async () => await axiosPublic.get("/total-payment"),
  });
  const {
    data: active,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["activeStatus"],
    queryFn: async () => await axiosPublic.get("/activeStatus"),
  });

  const handleTrue = async () => {
    await axiosPublic.patch("/activity").then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          title: `তারাবী হিসাব ${
            !active?.data ? "সচল করা হয়েছে" : "বন্ধ করা হয়েছে"
          }`,
          showConfirmButton: false,
          timer: 600,
        });
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      refresh();
    }, 3000);

    return () => clearInterval(interval);
  }, [refetch, refresh]);

  const monthlyTotal =
    Math.floor(totalPayment?.data?.Monthly?.totalAmount) || 0;
  const tarabiTotal = Math.floor(totalPayment?.data?.Tarabi?.totalAmount) || 0;
  const dueTotal = Math.floor(totalPayment?.data?.Due?.totalAmount) || 0;

  const total = monthlyTotal + tarabiTotal + dueTotal;
  console.log(total);

  return (
    <div className="min-h-screen p-2 mx-auto border  bg-orange-50">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="flex flex-col items-center justify-center ">
          <p className="font-semibold">মাসিক চাঁদার হিসাব</p>
          <div className="p-4 mx-auto bg-white shadow-lg md:w-full w-72 rounded-2xl">
            <div className="flex items-center">
              <p className="ml-2 font-semibold text-gray-700 text-md">
                {" "}
                সর্বমোট চাঁদা কালেকশান{" "}
              </p>
            </div>

            <div className="mt-4 ">
              <p className="text-4xl font-bold text-left text-gray-900">
                {monthlyTotal} <small className="text-xl">টাকা</small>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="font-semibold">বকেয়া চাঁদার হিসাব</p>
          <div className="p-4 mx-auto bg-white shadow-lg md:w-full w-72 rounded-2xl">
            <div className="flex items-center">
              <p className="ml-2 font-semibold text-gray-700 text-md">
                {" "}
                সর্বমোট বকেয়া কালেকশান{" "}
              </p>
            </div>

            <div className="mt-4 ">
              <p className="text-4xl font-bold text-left text-gray-900">
                {dueTotal} <small className="text-xl">টাকা</small>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <p className="font-semibold">তারাবী চাঁদার হিসাব</p>
          <div className="p-4 mx-auto bg-white shadow-lg md:w-full w-72 rounded-2xl">
            <div className="flex items-center">
              <p className="ml-2 font-semibold text-gray-700 text-md">
                {" "}
                সর্বমোট তারাবী কালেকশান{" "}
              </p>
            </div>

            <div className="mt-4 ">
              <p className="text-4xl font-bold text-left text-gray-900">
                {tarabiTotal} <small className="text-xl">টাকা</small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="p-4 mx-auto bg-white shadow-lg w-72 rounded-2xl">
          <div className="flex items-center">
            <p className="ml-2 font-semibold text-gray-700 text-md">
              {" "}
              সর্বমোট কালেকশান{" "}
            </p>
          </div>

          <div className="flex flex-col justify-center mt-4">
            <p className="text-4xl font-bold text-left text-gray-900">
              {total} <small className="text-xl">টাকা</small>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="font-semibold">তারাবীর হিসাব</p>
        <div className="flex items-center gap-1">
          <p
            className={`text-red-700 ${
              !active?.data && "border-b-2 border-red-700"
            }`}
          >
            বন্ধ
          </p>
          <button
            disabled={isPending}
            className={`text-6xl ${
              active?.data ? "text-orange-500" : "text-red-700"
            }`}
            onClick={handleTrue}
          >
            {active?.data ? <MdOutlineToggleOn /> : <MdOutlineToggleOff />}
          </button>
          <p
            className={`text-orange-500 ${
              active?.data && "border-b-2 border-orange-500"
            }`}
          >
            সচল
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
