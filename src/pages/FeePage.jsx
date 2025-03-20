import { useEffect, useState } from "react";
import useHomeName from "../hooks/useHomeName";
import useUsers from "../hooks/useUsers";
import { TiTick } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";
import { MdAssistantDirection } from "react-icons/md";
const FeePage = () => {
  const [isAdmin] = useAdmin();
  const [selectedId, setSelectedId] = useState("67b579d9992b1fd00b488aef");
  const [userData, setUserData] = useState({});
  const [feeRate, setFeeRate] = useState(userData.FeeRate);
  const [dueFee, setDueFee] = useState(userData.Due);
  const [tarabiFee, setTarabiFee] = useState(userData?.Tarabi?.fee);
  const [users, isUsersLoading, refetch] = useUsers();
  const [search, setSearch] = useState("");
  const [banglaText, setBanglaText] = useState(" ");
  const [selectedHome, setSelectedHome] = useState(" ");
  const [homeName] = useHomeName();
  const axiosPublic = useAxiosPublic();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMonths, setSelectedMonths] = useState([]);
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

  const { data = {}, refetch: reload, isPending: dataLoading } = useQuery({
    queryKey: ["dataById", selectedId],
    queryFn: async () => await axiosPublic.get(`user/${selectedId}`),
  });

  const handleUserDetails = (user) => {
    setSelectedMonths([]);
    document.getElementById("my_modal_1").showModal();
    setSelectedId(user._id);
    reload();
    setUserData(user);
    refetch();
  };

  const handleHome = (e) => {
    setSelectedHome(e.target.value);
  };
  const handleSearch = (e) => {
    if (/[\u0980-\u09FF]/.test(e.target.value)) {
      setBanglaText(e.target.value);
    } else {
      setSearch(e.target.value);
      setBanglaText(" ");
    }
  };
  useEffect(() => {
    localStorage.setItem("search", search);
    localStorage.setItem("Bangla", banglaText);
    if (selectedHome) {
      localStorage.setItem("homeName", selectedHome);
      refetch()
    } else {
      localStorage.setItem("homeName", " ");
      refetch()
    }
  }, [search, selectedHome, refetch, banglaText]);

  useEffect(() => {
    setFeeRate(userData.FeeRate);
    setDueFee(userData.Due);
    setTarabiFee(userData?.Tarabi?.fee);
    refetch();
  }, [userData, refetch]);

  const handleFeeRate = (e, id) => {
    e.preventDefault();
    refetch();
    const form = e.target;
    const FeeRate = form.FeeRate.value;
    const TarabiFee = form.Tarabi.value;
    const DueFee = form.Due.value;
    const fees = {
      FeeRate,
      TarabiFee,
      DueFee,
    };
    axiosPublic.patch(`/editFee/${id}`, fees).then((res) => {
      if (res.data.modifiedCount > 0) {
        reload();
        setIsOpen2(false);
        refetch();
        Swal.fire({
          position: "top-end",
          title: "চাঁদা সেইভ করা হয়েছে",
          showConfirmButton: false,
          timer: 800,
        });
      }
    });
  };

  const handleModal = (monthName, id) => {
    setSelectedMonth(monthName);
    setId(id);
    setIsOpen(true);
  };

  const handleMonthStatus = async () => {
    setLoading(true);
    await axiosPublic
      .patch("/monthStatus", { id, selectedMonth })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          reload();
          setLoading(false);
          setIsOpen(false);
        }
      });
  };

  // calculation.........
  const currentMonthIndex = new Date().getMonth();
  const userFeeRate = Number(data?.data?.FeeRate);
  const TarabiFee = data?.data?.Tarabi?.active
    ? Number(data?.data?.Tarabi?.fee)
    : 0;

  const totalDue =
    data?.data?.PayMonths?.slice(0, currentMonthIndex + 1).filter(
      (m) => m.status === "unpaid"
    ).length *
      userFeeRate +
    Number(data?.data?.Due) +
    TarabiFee;

  // checkbox for multiple months
  const handleCheckboxChange = (monthName, id) => {
    if (data?.data?._id === id) {
      setSelectedMonths((prevSelected) =>
        prevSelected.includes(monthName)
          ? prevSelected.filter((m) => m !== monthName)
          : [...prevSelected, monthName]
      );
    }
  };

  const handleMultiMonthsPay = async () => {
    setLoading(true);
    await axiosPublic
      .patch("/multiple-months", {
        id: selectedId,
        months: selectedMonths,
      })
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          reload();
          setLoading(false);
          setIsOpen3(false);
        }
      });
  };

  const handleViewFee = () => {
    setIsOpen4(true);
  };

  return (
    <div className="mt-16">
      <div className="flex max-w-xl">
        <div className="navbar bg-base-100">
          <div className="navbar-center flex">
            <select onClick={handleHome} className="p-2 border rounded">
              <option value="" className="font-bold bg-red-50">
                বাড়ির নাম
              </option>
              {homeName.map((home) => (
                <option value={home} key={home}> {home}</option>
              ))}
            </select>
          </div>
          <div className="border rounded-lg flex-1">
            <input
              onChange={handleSearch}
              type="search"
              name="search"
              placeholder="Search"
              className="p-2 w-full"
              id=""
            />
          </div>
          <div>
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
                      {user.NameBn} <br /> {isAdmin && user.Number}
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
                          চাঁদার হার: {data?.data?.FeeRate} <small>টাকা</small>
                        </p>
                        <p className="text-sm font-semibold">
                          তারাবীর চাঁদা: {data?.data?.Tarabi?.fee}{" "}
                          <small>টাকা</small>
                        </p>
                        <p className="text-sm font-semibold flex flex-row gap-1 items-center">
                          বকেয়া চাঁদা: <span>{totalDue}</span> <small>টাকা</small>
                          <button className="text-lg" onClick={handleViewFee}>
                            <MdAssistantDirection />
                          </button>
                        </p>
                      </div>
                      {isAdmin && (
                        <button
                          className=" absolute -top-7 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100"
                          onClick={() => setIsOpen2(true)}
                        >
                          <CiEdit />
                        </button>
                      )}
                    </div>
                  </div>
                  {isOpen2 && (
                    <div className="modal modal-open flex items-center justify-center bg-black bg-opacity-50 fixed top-0 left-0 w-full h-full">
                      <div className="modal-box bg-white pt-8 px-4 w-96 rounded-lg">
                        <button
                          onClick={() => setIsOpen2(false)}
                          className="btn text-xl btn-sm btn-circle btn-ghost absolute right-2 top-1"
                        >
                          ✕
                        </button>
                        <form onSubmit={(e) => handleFeeRate(e, userData._id)}>
                          <div className="flex flex-col items-center justify-center gap-6 pt-8 border">
                            {/* Fee Rate Input */}
                            <div className="relative w-full px-4">
                              <input
                                name="FeeRate"
                                type="text"
                                value={feeRate}
                                onChange={(e) => setFeeRate(e.target.value)}
                                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer w-full bg-inherit"
                              />
                              <label
                                htmlFor="FeeRate"
                                className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                              >
                                চাঁদার হার
                              </label>
                            </div>

                            {/* Tarabi Fee Input */}
                            <div className="relative w-full px-4">
                              <input
                                name="Tarabi"
                                type="text"
                                value={tarabiFee}
                                onChange={(e) => setTarabiFee(e.target.value)}
                                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer w-full bg-inherit"
                              />
                              <label
                                htmlFor="Tarabi"
                                className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                              >
                                তারাবীর চাঁদা
                              </label>
                            </div>

                            {/* Due Fee Input */}
                            <div className="relative w-full px-4">
                              <input
                                name="Due"
                                type="text"
                                value={dueFee}
                                onChange={(e) => setDueFee(e.target.value)}
                                className="border-b border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer w-full bg-inherit"
                              />
                              <label
                                htmlFor="Due"
                                className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700 peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm"
                              >
                                আগের বকেয়া চাঁদা
                              </label>
                            </div>

                            {/* Submit Button */}
                            <input
                              type="submit"
                              value="সেইভ"
                              className="bg-blue-800 rounded-lg btn-outline px-6 mb-1 text-white"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                  <div className="mt-1">
                    <h1 className="text-center font-bold font-mono text-sm">
                      পেমেন্ট ডিটেইলস
                    </h1>
                    {dataLoading &&  <div className="animate-pulse flex flex-col items-center gap-4">
    
      <div className="h-7 bg-slate-400 w-full rounded-md" />
      <div className="h-7 bg-slate-400 w-full rounded-md" />
      <div className="h-7 bg-slate-400 w-full rounded-md" />
      <div className="h-7 bg-slate-400 w-full rounded-md" />
      <div className="h-7 bg-slate-400 w-full rounded-md" />
      <div className="h-7 bg-slate-400 w-full rounded-md" />
    </div>}
                    {userData?.PayMonths && (
                      <div className="grid grid-cols-2  border w-full ">
                        <div className="border-r-2 p-1">
                          {/* First 6 months */}
                          {data?.data?.PayMonths.slice(0, 6).map(
                            (user, index) => (
                              <div
                                key={index}
                                className="border-b py-2 flex justify-between items-center gap-1"
                              >
                                {user.status === "unpaid" && isAdmin && (
                                  <input
                                    type="checkbox"
                                    checked={selectedMonths.includes(
                                      user.monthName
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        user.monthName,
                                        selectedId
                                      )
                                    }
                                    className="w-3 h-3"
                                  />
                                )}

                                <div className="font-bold text-md">
                                  {monthTranslation[user.monthName] ||
                                    user.monthName}
                                </div>
                                <button
                                  onClick={() =>
                                    isAdmin &&
                                    handleModal(user.monthName, selectedId)
                                  }
                                  className={`inline-flex items-center justify-center px-2 py-2 transition ease-in-out delay-75 text-white text-sm font-medium rounded-md ${
                                    user.status === "paid"
                                      ? "bg-blue-600 hover:bg-blue-700"
                                      : "bg-red-600 hover:bg-red-700"
                                  }`}
                                >
                                  {user.status === "paid" ? (
                                    <TiTick />
                                  ) : (
                                    <FaTimes />
                                  )}
                                </button>
                              </div>
                            )
                          )}
                        </div>

                        <div className="border-l-2 p-1">
                          {/* Last 6 months */}
                          {data?.data?.PayMonths.slice(6).map((user, index) => (
                            <div
                              key={index}
                              className="border-b py-2 flex justify-between items-center"
                            >
                              {user.status === "unpaid" && isAdmin && (
                                <input
                                  type="checkbox"
                                  checked={selectedMonths.includes(
                                    user.monthName
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(
                                      user.monthName,
                                      selectedId
                                    )
                                  }
                                  className="w-3 h-3"
                                />
                              )}

                              <div className="font-bold text-md">
                                {monthTranslation[user.monthName] ||
                                  user.monthName}
                              </div>
                              <button
                                onClick={() =>
                                  isAdmin &&
                                  handleModal(user.monthName, selectedId)
                                }
                                className={`inline-flex items-center justify-center px-2 py-2 transition ease-in-out delay-75 text-white text-sm font-medium rounded-md ${
                                  user.status === "paid"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-red-600 hover:bg-red-700"
                                }`}
                              >
                                {user.status === "paid" ? (
                                  <TiTick />
                                ) : (
                                  <FaTimes />
                                )}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-left flex justify-between">
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

                    {selectedMonths.length > 1 && (
                      <div>
                        <button
                          onClick={() => setIsOpen3(true)}
                          className="btn btn-xs bg-red-500 text-white"
                        >
                          সব পেইড?
                        </button>
                      </div>
                    )}
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
                  <button className="btn">Close</button>
                </form>
                <div>
                  {/* Modal */}
                  {isOpen && (
                    <div className="modal modal-middle modal-open">
                      <div className="modal-box">
                        <p className="py-2 text-center">
                          চাঁদা দেয়ার ব্যাপারটা আপনি কি নিশ্চিত?
                        </p>
                        <div className="flex justify-evenly">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="btn btn-xs px-5 inline-block sm:w-auto text-center font-semibold leading-6 text-blue-50 bg-red-500 hover:bg-green-600 rounded-lg transition duration-200"
                          >
                            না
                          </button>
                          <button
                            onClick={handleMonthStatus}
                            className="flex items-center btn btn-xs px-5 sm:w-auto text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
                          >
                            হ্যাঁ{" "}
                            {loading && (
                              <span className="loading loading-spinner w-3"></span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {isOpen3 && (
                    <div className="modal modal-middle modal-open">
                      <div className="modal-box">
                        <p className="py-2 text-center">
                          {selectedMonths.length} মাসের{" "}
                          {selectedMonths.length * userFeeRate} টাকা চাঁদা দেয়ার
                          ব্যাপারটা <br /> আপনি কি নিশ্চিত?
                        </p>
                        <div className="flex justify-evenly">
                          <button
                            onClick={() => setIsOpen3(false)}
                            className="btn btn-xs px-5 inline-block sm:w-auto text-center font-semibold leading-6 text-blue-50 bg-red-500 hover:bg-green-600 rounded-lg transition duration-200"
                          >
                            না
                          </button>
                          <button
                            onClick={handleMultiMonthsPay}
                            className="flex items-center btn btn-xs px-5 sm:w-auto text-center font-semibold leading-6 text-blue-50 bg-green-500 hover:bg-green-600 rounded-lg transition duration-200"
                          >
                            হ্যাঁ{" "}
                            {loading && (
                              <span className="loading loading-spinner w-3"></span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {isOpen4 && (
                    <div className="modal modal-top modal-open">
                      <div className="modal-box">
                        <p className="py-2 text-center">বকেয়ার বিবেরনী</p>
                        <p className="font-semibold text-sm">
                          তারাবীঃ {TarabiFee} টাকা , <br />
                          আগের বছরেরঃ {data?.data?.Due} টাকা , <br />
                          এই বছরেরঃ{" "}
                          {data?.data?.PayMonths?.slice(
                            0,
                            currentMonthIndex + 1
                          ).filter((m) => m.status === "unpaid").length *
                            userFeeRate}{" "}
                          টাকা, <br />
                          টোটালঃ {totalDue} টাকা
                        </p>
                        <div className="flex justify-evenly">
                          <button
                            onClick={() => setIsOpen4(false)}
                            className="btn btn-xs px-5"
                          >
                            ✕
                          </button>
                          {isAdmin && (
                        <button
                        className="btn btn-xs px-5"
                          onClick={() => { setIsOpen4(false), setIsOpen2(true)}}
                        >
                          <CiEdit />
                        </button>
                      )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </div>
  );
};

export default FeePage;
