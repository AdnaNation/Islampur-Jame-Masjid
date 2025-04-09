import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import useHomeName from "../hooks/useHomeName";
import { FiLoader } from "react-icons/fi";

const PaymentHistory = () => {
  const [homeName] = useHomeName();
  const [home, setHome] = useState('home')
  const [name, setName] = useState(' ')
  const axiosPublic = useAxiosPublic();
  const { data, refetch, isPending } = useQuery({
    queryKey: ["paymentHistory", home, name],
    queryFn: async () => await axiosPublic.get(`/paymentHistory?home=${home}&name=${name}`),
  });
  const { data: userName= {}, refetch: reload } = useQuery({
    queryKey: ["usersName", home],
    queryFn: async () => await axiosPublic.get(`/usersName/${home}`),
  });
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleHome = async (e)=>{
    setHome(e.target.value)
   await reload()
  }
  const handleName = (e)=>{
    setName(e.target.value)
  }

  return (
   <div className="bg-orange-50 min-h-screen">
       <div className="flex justify-center gap-1 my-1">
       <select onChange={handleHome} className="p-2 border rounded w-40">
              <option value="home" className="font-bold bg-red-50">
                বাড়ির নাম
              </option>
              {homeName.map((home) => (
                <option value={home} key={home}>
                  {" "}
                  {home}
                </option>
              ))}
            </select>
            
       <select disabled={home=== 'home'} onChange={handleName} className="p-2 border rounded w-40">
              <option value="" className="font-bold bg-red-50">
                 নাম
              </option>
              {userName?.data?.map((name) => (
                <option value={name.NameBn} key={name._id}>
                  {" "}
                  {name.NameBn}
                </option>
              ))}
            </select>
       </div>

       {
        isPending && <div className="flex justify-center mt-40 text-3xl animate-spin"> 
          <FiLoader />

        </div>
       }
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
                  ) <small>{history.monthName && history.monthName}</small> {history.type === "Monthly" && 'মাসের মাসিক চাঁদা'}
                  {history.type === "Tarabi" && "তারাবীর"} {history.type === "Due" && "বকেয়ার"} {history.fee} টাকা
                  পরিশোধ করেছেন।{" "}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
   </div>
  );
};

export default PaymentHistory;
