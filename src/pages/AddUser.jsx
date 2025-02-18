import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useHomeName from "../hooks/useHomeName";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AddUser = () => {
  const [homeName] = useHomeName();
  const axiosPublic = useAxiosPublic();
  const [newHome, setNewHome] = useState(false);
  const [unpaidMonthsCount, setUnpaidMonthsCount] = useState(0);
  const toggleNewHome = () => {
    setNewHome(!newHome);
  };

  /......................./;

  const payMonth = {
    January: "unpaid",
    February: "unpaid",
    March: "unpaid",
    April: "unpaid",
  };
  // Get the current month index
  const currentMonthIndex = new Date().getMonth();
  // Get all months in order
  const monthNames = Object.keys(payMonth);

  const countUnpaidMonths = () => {
    let unpaidCount = 0;
    for (let i = 0; i <= currentMonthIndex; i++) {
      if (payMonth[monthNames[i]] === "unpaid") {
        unpaidCount++;
      }
    }
    return unpaidCount;
  };

  useEffect(() => {
    setUnpaidMonthsCount(countUnpaidMonths());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(unpaidMonthsCount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const Name = form.NameEn.value;
    const NameBn = form.NameBn.value;
    const Number = form.Number.value;
    const HomeName = form.HomeName.value;
    const Due = 0;
    const Tarabi = {
      fee: 0,
      status: "unpaid",
      active: false
  };
    const FeeRate = 0;
    const PayMonths = [
      {
        monthName: "January",
        status: "unpaid"
      },
      {
        monthName: "February",
        status: "unpaid"
      },
      {
        monthName: "March",
        status: "unpaid"
      },
      {
        monthName: "April",
        status: "unpaid"
      },
      {
        monthName: "May",
        status: "unpaid"
      },
      {
        monthName: "June",
        status: "unpaid"
      },
      {
        monthName: "July",
        status: "unpaid"
      },
      {
        monthName: "August",
        status: "unpaid"
      },
      {
        monthName: "September",
        status: "unpaid"
      },
      {
        monthName: "October",
        status: "unpaid"
      },
      {
        monthName: "November",
        status: "unpaid"
      },
      {
        monthName: "December",
        status: "unpaid"
      }
    ];
    
    const user = {
      Name,
      NameBn,
      Number,
      HomeName,
      Due,
      Tarabi,
      FeeRate,
      PayMonths,
    };

    // send data to the server
    const addUser = await axiosPublic.post("/addUser", user);
    if (addUser.data.insertedId) {
      Swal.fire({
        title: "Congrats!",
        text: `${user.NameBn}কে অ্যাড করা হয়েছে!`,
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div className=" mx-auto md:max-w-80 space-y-2 mt-14">
      <form onSubmit={handleSubmit}>
        <div className="form-control md:w-96 w-72 px-1 mx-auto space-y-1">
          <input
            type="text"
            name="NameEn"
            placeholder="নাম ইংরেজীতে "
            required
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="NameBn"
            placeholder="নাম বাংলায়"
            required
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="Number"
            placeholder="নাম্বার 01**"
            required
            className="input input-bordered w-full"
          />
          <p className="text-right">
            <p onClick={toggleNewHome}>
              <small className="underline">
                {newHome ? "পুরাতন বাড়ি?" : "নতুন বাড়ি?"}
              </small>
            </p>
          </p>

          {newHome ? (
            <input
              type="text"
              name="HomeName"
              placeholder="বাড়ির নাম বাংলায়"
              required
              className="input input-bordered w-full"
            />
          ) : (
            <select className="select select-bordered w-full " name="HomeName">
              <option disabled selected>
                বাড়ির নাম
              </option>
              {homeName.map((home) => (
                <option key={home}>{home}</option>
              ))}
            </select>
          )}
        </div>
        <div className="text-center md:w-96 mt-2 ">
          <input
            type="submit"
            value="অ্যাড করুন"
            className="btn btn-outline btn-info"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;
