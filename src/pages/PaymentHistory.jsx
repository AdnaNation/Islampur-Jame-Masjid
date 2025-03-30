import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => await axiosPublic.get("/paymentHistory"),
  });
  console.log(data);
  return (
    <div className="flex flex-col gap-2 justify-center bg-orange-50">
   {
    data?.data?.slice().reverse().map(history =>  <div key={history._id} className="card bg-base-100 w-80 shadow-sm">
      <div className="card-body">
        <h2 className="card-title text-right text-sm">{history.time}</h2>
        <p>
         {history.name}  {history.type === "Tarabi" && "তারাবীর"} {history.fee} টাকা চাঁদা দিয়েছেন
        </p>
      </div>
    </div>)
   }
    </div>
  );
};

export default PaymentHistory;
