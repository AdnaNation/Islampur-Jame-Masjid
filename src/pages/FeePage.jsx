import { useEffect, useState } from "react";
import useHomeName from "../hooks/useHomeName";
import useUsers from "../hooks/useUsers";
import { TiTick } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const FeePage = () => {
  const [userData, setUserData] = useState({});
  const [feeRate, setFeeRate]= useState(userData.FeeRate)
  const [dueFee, setDueFee]= useState(userData.Due)
  const [tarabiFee, setTarabiFee]= useState(userData?.Tarabi?.fee)
  const [users, isUsersLoading, refetch] = useUsers();
  const [homeName] = useHomeName();
  const axiosPublic = useAxiosPublic()
  const date = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const monthTranslation = {
    January: "জানুয়ারি",
    February: "ফেব্রুয়ারি",
    March: "মার্চ",
    April: "এপ্রিল",
    May: "মে",
    June: "জুন",
    July: "জুলাই",
    August: "আগস্ট",
    September: "সেপ্টেম্বর",
    October: "অক্টোবর",
    November: "নভেম্বর",
    December: "ডিসেম্বর",
  };

  const handleUserDetails = (user) => {
    refetch()
    document.getElementById("my_modal_1").showModal();
    setUserData(user);
  };
  useEffect(()=>{
    setFeeRate(userData.FeeRate)
    setDueFee(userData.Due)
    setTarabiFee(userData?.Tarabi?.fee);
    refetch()
  },[userData, refetch])
  const handleFeeRate =(e,id)=>{
    e.preventDefault()
    refetch()
    const form = e.target;
    const FeeRate = form.FeeRate.value;
    const TarabiFee = form.Tarabi.value;
    const DueFee = form.Due.value;
    const fees ={
      FeeRate,
      TarabiFee,
      DueFee
    }
axiosPublic.patch(`/editFee/${id}`, fees).then(res =>{
  if (res.data.modifiedCount > 0) {
    refetch();
    Swal.fire({
      position: "top-end",
      title: "চাঁদা সেইভ করা হয়েছে",
      showConfirmButton: false,
      timer: 800,
    });
  }
})

  }

  return (
    <div className="mt-16">
      <div className="flex max-w-xl">
        <div className="navbar bg-base-100">
          <div className="navbar-center flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary className="border p-2 text-black font-bold">
                    বাড়ির নাম
                  </summary>
                  <ul className="p-2 w-40 z-10">
                    {homeName.map((home) => (
                      <li key={home}>
                        <a>{home}</a>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="border rounded-lg flex-1">
            <input
              type="search"
              name="search"
              placeholder="Search"
              className="p-2 w-full"
              id=""
            />
          </div>
        </div>
      </div>
      {isUsersLoading ? (
        <div className="animate-pulse flex flex-col items-center gap-4 w-full h-full">
          <div className="space-y-8">
            <div className="w-48 h-6 bg-slate-400 rounded-md" />
            <div className="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md" />
          </div>
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
          <div className="h-7 bg-slate-400 w-full rounded-md" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <p className="text-center">নাম ও নাম্বার</p>
                </th>
                <th className="text-center">বাড়ির নাম</th>
                <th className="text-center">চাঁদার হার</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users.map((user) => (
                <tr
                  className="btn-ghost"
                  onClick={() => handleUserDetails(user)}
                  key={user._id}
                >
                  <td className="text-[12px]">
                    <p className="text-center">
                      {user.NameBn} <br /> {user.Number}
                    </p>
                  </td>
                  <th className="text-[12px] text-center">{user.HomeName}</th>
                  <td>
                    <p className="text-center">{user.FeeRate}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              {/* ............ */}

              <div className="max-w-2xl mx-auto bg-gray-100 flex flex-col items-center">
                <div className="w-full bg-white p-2 shadow-md rounded-lg">
                  <div className="flex justify-between border-b pb-4">
                    <div>
                      <h2 className="md:text-xl text-sm font-bold">
                        ইসলামপুর জামে মসজিদ
                      </h2>
                      <p className="text-gray-600 md:text-xl text-sm">
                        দক্ষিণ চন্ডিপুর, ইসলামপুর
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-600"> {date}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-b">
                    <div className="mt-2 pb-2">
                      <p className="text-sm">{userData.NameBn},</p>
                      <p className="text-sm">{userData.HomeName}</p>
                    </div>

                    <div className="group relative">
                      <div className="mt-2 pb-2">
                        <p className="text-sm font-semibold">
                          চাঁদার হার: {userData.FeeRate} <small>টাকা</small>
                        </p>
                        <p className="text-sm font-semibold">
                          তারাবীর চাঁদা: {userData?.Tarabi?.fee}{" "}
                          <small>টাকা</small>
                        </p>
                        <p className="text-sm font-semibold">
                          বকেয়া চাঁদা: {userData.Due}{" "}
                          <small>টাকা</small>
                        </p>
                      </div>
                      <button
                        className=" absolute -top-7 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                        onClick={() =>
                          document.getElementById("my_modal_2").showModal()
                        }
                      >
                        <CiEdit />
                      </button>
                    </div>
                  </div>
                  <dialog id="my_modal_2" className="modal">
                    <div className="bg-white pt-8 px-2 w-96 rounded">
                      <form onSubmit={(e)=>handleFeeRate(e,userData._id)}>
                        <div className="flex flex-col items-center justify-center gap-6 pt-8 border">
                          <div className="relative">
                            <input
                              name="FeeRate"
                              type="text"
                              value={feeRate}
                              onChange={(e)=>setFeeRate(e.target.value)}
                              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                            />
                            <label
                              htmlFor="FeeRate"
                              className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                            >
                              চাঁদার হার
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              name="Tarabi"
                              type="text"
                              value={tarabiFee}
                              onChange={(e)=>setTarabiFee(e.target.value)}
                              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                            />
                            <label
                              htmlFor="Tarabi"
                              className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                            >
                              তারাবীর চাঁদা
                            </label>
                          </div>
                          <div className="relative">
                            <input
                              name="Due"
                              type="text"
                              value={dueFee}
                              onChange={(e)=>setDueFee(e.target.value)}
                              className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                            />
                            <label
                              htmlFor="Due"
                              className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                            >
                              বকেয়া চাঁদা
                            </label>
                          </div>
                          <input type="submit" value="সেইভ" className="btn btn-primary px-6 text-white" />
                        </div>
                        
                      </form>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn-outline btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>

                  <div className="mt-1">
                    <h1 className="text-center font-bold font-mono text-sm">
                      পেমেন্ট ডিটেইলস
                    </h1>
                    {userData?.PayMonths && (
                      <div className="grid grid-cols-2  border w-full ">
                        <div className="border-r-2 p-1">
                          {/* First 6 months */}
                          {userData.PayMonths.slice(0, 6).map((user, index) => (
                            <div
                              key={index}
                              className="border-b py-2 flex justify-between items-center gap-1"
                            >
                              <div className="font-bold text-md">
                                {monthTranslation[user.monthName] ||
                                  user.monthName}
                              </div>
                              <div className=" inline-flex items-center justify-center px-2 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-90">
                                {user.status === "paid" ? (
                                  <TiTick />
                                ) : (
                                  <FaTimes />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-l-2 p-1">
                          {/* Last 6 months */}
                          {userData.PayMonths.slice(6).map((user, index) => (
                            <div
                              key={index}
                              className="border-b py-2 flex justify-between items-center"
                            >
                              <div className="font-bold text-md">
                                {monthTranslation[user.monthName] ||
                                  user.monthName}
                              </div>
                              <div className="inline-flex items-center justify-center px-2 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-90">
                                {user.status === "paid" ? (
                                  <TiTick />
                                ) : (
                                  <FaTimes />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-left">
                    <div className="font-bold text-md">
                      তারাবীঃ{" "}
                      <span className="inline-flex items-center justify-center p-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-90">
                        {userData?.Tarabi?.status === "paid" ? (
                          <TiTick />
                        ) : (
                          <FaTimes />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* <div className="mt-6 text-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                    Download PDF
                  </button>
                </div> */}
                </div>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default FeePage;
