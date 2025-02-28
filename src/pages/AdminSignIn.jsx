import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";

const AdminSignIn = () => {
  const axiosPublic = useAxiosPublic();
  const [alert, setAlert] = useState(' ');
  const navigate = useNavigate()
  const handleSignIn = async (e)=>{
    setAlert(" ")
    e.preventDefault()
    const form = e.target;
    const number = form.number.value;
    const password = form.password.value;

    const signedData = await axiosPublic(`admin/${number}`)
    if (signedData.data.number){
      if(signedData.data.number === number && signedData.data.password === password){
        localStorage.setItem('Number', number)
        setAlert(" ")
        navigate('/fee')
      }
      else{
        setAlert("কিছু একটা ভুল আছে");
      }
    }
    else{
      setAlert("কিছু একটা ভুল আছে")
    }
  }
    return (
        <form onSubmit={handleSignIn} className=" mx-auto md:max-w-80 space-y-2 mt-14">
        <label className="form-control md:w-96 w-72 px-1 mx-auto">
          <div className="label">
            <span className="label-text">আপনার নাম্বার কী?</span>
          </div>
          <input
          name="number"
            type="text"
            placeholder="আপনার নাম্বার"
            className="input input-bordered w-full"
          />
          <div className="label">
            <span className="label-text">আপনার পিন কী?</span>
          </div>
          <input
          name="password"
            type="text"
            placeholder="আপনার পিন"
            className="input input-bordered w-full"
          />
          {
            alert && <p className="text-[10px] text-red-600 text-right">{alert}</p>
          }
           <div className="label flex justify-end">
            <Link to="/signin" className="text-sm text-blue-600 underline">সদস্য?..</Link>
          </div>
        </label>
       <div className="text-center">
       <button className="btn btn-outline btn-info" type="submit">প্রবেশ করুন</button>
       </div>
      </form>
    );
};

export default AdminSignIn;