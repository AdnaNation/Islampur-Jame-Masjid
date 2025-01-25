const SignIn = () => {
  return (
    <div className=" mx-auto max-w-96 space-y-2 mt-14">
      <label className="form-control w-96 px-1">
        <div className="label">
          <span className="label-text">আপনার নাম্বার কী?</span>
        </div>
        <input
          type="text"
          placeholder="আপনার নাম্বার"
          className="input input-bordered w-full"
        />
      </label>
     <div className="text-center">
     <button className="btn btn-outline btn-info" type="button">প্রবেশ করুন</button>
     </div>
    </div>
  );
};

export default SignIn;
