import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useEffect } from "react";

const PaymentHistory = () => {
  const axiosPublic = useAxiosPublic();
  const { data, refetch } = useQuery({
    queryKey: ["paymentHistory"],
    queryFn: async () => await axiosPublic.get("/paymentHistory"),
  });
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="flex justify-center">
      <div className="grid md:grid-cols-3 items-center max-w-5xl gap-2 justify-center bg-orange-50">
        {data?.data
          ?.slice()
          .reverse()
          .map((history) => (
            <div
              key={history._id}
              className="card bg-base-100 h-40 md:w-80 md:mx-0 mx-2 shadow-sm mt-1 "
            >
              <div className="p-5">
                <h2 className=" text-right text-[12px]">{history.time}</h2>
                <p>
                  {history.name} (<small className="mr-1">{history.home}</small>
                  ) <small>{history.monthName && history.monthName}</small> মাসের মাসিক চাঁদা{" "}
                  {history.type === "Tarabi" && "তারাবীর"} {history.fee} টাকা
                  পরিশোধ করেছেন।{" "}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
