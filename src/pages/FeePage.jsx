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
            <h3 className="font-bold text-lg">{userData?.NameBn}</h3>
            <p className="py-4">{userData?.HomeName}</p>
            <p className=" border">
              {userData?.PayMonths &&
                Object.entries(userData.PayMonths).map(
                  ([month, status], index) => (
                    <tr className="flex flex-row justify-center" key={index}>
                      <td className="font-bold ">{month} : </td>
                      <td className=" text-right px-4"> {status}</td>
                    </tr>
                  )
                )}
            </p>

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
