
import useUsers from "../hooks/useUsers";
const FeePage = () => {
  const [users]= useUsers();

  return (
    <div className="mt-16">
      <div className="flex max-w-xl">
        <div className="navbar bg-base-100">
          <div className="navbar-center flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary className="border p-2 text-black font-bold">
                    Barir Naam
                  </summary>
                  <ul className="p-2 w-40 z-10">
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="border rounded-lg flex-1">
            <input type="search" name="search" placeholder="Search" className="p-2 w-full" id="" />
          </div>
        </div>
      </div>

      {/* table data */}

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Home Name</th>
              <th>Name</th>
              <th>Number</th>
              <th>Chadar Har</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => (
              <tr key={user.number}>
                <th>{user.homeName}</th>
                <td>{user.Name}</td>
                <td>{user.number}</td>
                <td className="flex justify-center">{user.feeRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeePage;
