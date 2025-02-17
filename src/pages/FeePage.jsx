import { useState } from "react";
import useHomeName from "../hooks/useHomeName";
import useUsers from "../hooks/useUsers";
const FeePage = () => {
  const [userData, setUserData] = useState({});
  const [users, isUsersLoading] = useUsers();
  const [homeName] = useHomeName();
  const date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
 
  const handleUserDetails = (user) => {
    document.getElementById("my_modal_1").showModal();
    setUserData(user);
  };

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
      {isUsersLoading?  <div className="animate-pulse flex flex-col items-center gap-4 w-full h-full">
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
    </div>:<div className="overflow-x-auto">
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
                    <h2 className="md:text-xl text-sm font-bold">ইসলামপুর জামে মসজিদ</h2>
                    <p className="text-gray-600 md:text-xl text-sm">দক্ষিণ চন্ডিপুর, ইসলামপুর</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Date: {date}</p>
                  </div>
                </div>

                <div className="mt-4 border-b pb-2">
                  <h3 className="text-lg font-semibold">Bill To:</h3>
                  <p className="text-sm">{userData.NameBn}</p>
                  <p className="text-sm">{userData.HomeName}</p>
                </div>

                <div className="mt-1">
                  <h1 className="text-center font-bold font-mono text-sm">পেমেন্ট ডিটেইলস</h1>
                  {userData?.PayMonths && (
                    <div className="grid grid-cols-2  border w-full ">
                      <div className="border-r-2 p-1">
                        {/* First 6 months */}
                        {userData.PayMonths.slice(0, 6).map((user, index) => (
                          <div
                            key={index}
                            className="border-b py-2 flex justify-between gap-1"
                          >
                            <div className="font-bold text-md">{(user.monthName).slice(0, 3)}</div>
                            <div className=" inline-flex items-center justify-center px-2 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-90">
                              {user.status}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-l-2 p-1">
                        {/* Last 6 months */}
                        {userData.PayMonths.slice(6).map((user, index) => (
                          <div
                            key={index}
                            className="border-b py-2 flex justify-between"
                          >
                            <div className="font-bold text-md">{(user.monthName).slice(0, 3)}</div>
                            <div className="inline-flex items-center justify-center px-2 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-90">
                              {user.status}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-right">
                  <h3 className="text-lg font-semibold">Total: $0</h3>
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
      </div>}
      
    </div>
  );
};

export default FeePage;
