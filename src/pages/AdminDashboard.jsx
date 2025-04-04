import { MdOutlineToggleOff, MdOutlineToggleOn } from "react-icons/md";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useEffect } from "react";



const AdminDashboard = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stats, refetch: reload } = useQuery({
    queryKey: ["tarabi-stats"],
    queryFn: async () => await axiosPublic.get("/tarabi-stats"),
  });
  const {
    data: active,
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["activeStatus"],
    queryFn: async () => await axiosPublic.get("/activeStatus"),
  });
  const inTotal =
    stats?.data?.paidStats?.totalAmount +
      stats?.data?.unpaidStats?.totalUnpaidAmount || 0;
  const widthPercentage = (stats?.data?.paidStats?.totalAmount * 100) / inTotal;
  const handleTrue = async () => {
    await axiosPublic.patch("/activity").then((res) => {
      refetch();
      Swal.fire({
        title: `তারাবী হিসাব ${
          !active?.data ? "সচল করা হয়েছে" : "বন্ধ করা হয়েছে"
        }`,
        showConfirmButton: false,
        timer: 600,
      });
    });
  };

   useEffect(() => {
      const interval = setInterval(() => {
        reload()
        refetch(); 
      }, 3000); 
  
      return () => clearInterval(interval);
    }, [refetch, reload]);

  const totalPaid = stats?.data?.paidStats?.totalAmount;
  const totalUnpaid = stats?.data?.unpaidStats?.totalUnpaidAmount 
  
  // Data for the Pie Chart
  const pieData = [
    { name: "পেইড", value: totalPaid, color: "#4CAF50" },
    { name: "আনপেইড", value: totalUnpaid, color: "#F44336" },
  ];
  
  return (
    <div className="max-w-4xl min-h-screen mx-auto border p-2 bg-orange-50">
      <div className="flex items-center justify-center flex-col">
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
     <div>
     <div className=" max-w-xs  bg-white shadow-lg rounded-2xl p-4 mx-auto">
        <div className="flex items-center">
          <p className="ml-2 text-gray-700 text-md font-semibold">
            {" "}
            সর্বমোট তারাবী কালেকশান{" "}
          </p>
        </div>

        <div className="flex flex-col justify-center mt-4">
          <p className="text-gray-900 text-4xl font-bold text-left">
            {stats?.data?.paidStats?.totalAmount}{" "}
            <small className="text-xl">টাকা</small>
          </p>
          <div className="relative bg-gray-200 w-full h-2 rounded mt-2">
            <div
              style={{ width: `${widthPercentage}%` }}
              className="absolute top-0 left-0 bg-green-500 h-full rounded"
            />
          </div>
        </div>
      </div>

      {/* PieChart */}
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart >
            <Pie 
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={50}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
     </div>
    </div>
  );
};

export default AdminDashboard;
