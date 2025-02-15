import { useState } from "react";
import useHomeName from "../hooks/useHomeName";
import useUsers from "../hooks/useUsers";
const FeePage = () => {
  const [userData, setUserData] = useState({});
  const [users] = useUsers();
  const [homeName] = useHomeName();
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

      {/* table data */}

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

            <div className="max-w-2xl mx-auto bg-gray-100 min-h-screen flex flex-col items-center">
              <div className="w-full bg-white p-2 shadow-md rounded-lg">
                <div className="flex justify-between border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold">ইসলামপুর জামে মসজিদ</h2>
                    <p className="text-gray-600">দক্ষিণ চন্ডিপুর, ইসলামপুর</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600">Date: 15 Feb 2025</p>
                  </div>
                </div>

                <div className="mt-4 border-b pb-4">
                  <h3 className="text-lg font-semibold">Bill To:</h3>
                  <p className="text-gray-700">Abul Kalam Liton</p>
                  <p className="text-gray-600">মজিদ হাজী বাড়ি</p>
                </div>

                <div className="mt-4">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="py-2">মাসের নাম</th>
                        <th className="py-2">স্ট্যাটাস</th>
                        <th className="py-2">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData?.PayMonths &&
                        Object.entries(userData.PayMonths).map(
                          ([month, status], index) => (
                            <tr className="border-b" key={index}>
                              <td className="font-bold ">{month} </td>
                              <td className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 transition ease-in-out delay-75 hover:bg-blue-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-90">
                                {status}
                              </td>
                              <td className="py-2">$0</td>
                            </tr>
                          )
                        )}
                      {/* <tr className="border-b">
                <td className="py-2">January Fee</td>
                <td className="py-2">1</td>
                <td className="py-2">$0</td>
              </tr> */}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 text-right">
                  <h3 className="text-lg font-semibold">Total: $0</h3>
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
                    Download PDF
                  </button>
                </div>
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
    </div>
  );
};

export default FeePage;
