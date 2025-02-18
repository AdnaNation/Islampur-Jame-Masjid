import photo from "../../public/mosque.jpg"
const Home = () => {

  return (
    <div>
      <div className="  mt-16 border rounded-lg">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content w-full mx-auto text-neutral-content">
          <img className="shadow-xl md:max-h-96" src={photo} alt="mosque" />
        </div>
      </div>

      <div>
        <p className="text-sm p-2">
          <span className="text-lg font-semibold shadow-lg ">ইসলামপুর জামে মসজিদঃ</span> ফেনির দাগনভূঞা উপজেলার দুধমুখা বাজারের অদূরে
          ইসলামপুর সমাজের কেন্দ্রে অবস্থিত ইসলামপুর জামে মসজিদ। এটি স্থাপিত করা
          হয়েছিল ১৯৪০ সালে।
        </p>
      </div>
    </div>
  );
};

export default Home;
