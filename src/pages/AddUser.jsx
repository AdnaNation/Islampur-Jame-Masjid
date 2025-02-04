import { useState } from "react";

const AddUser = () => {
    const [newHome, setNewHome] = useState(false);
    const toggleNewHome = () => {
        setNewHome(!newHome);
    };
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [number, setNumber] = useState("");
  const [convertedText, setConvertedText] = useState("");

  const numberMap = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  const convertToBengaliNumbers = (input) => {
    return input.replace(/\d/g, (digit) => numberMap[digit]);
  };

  const translateText = async (inputText) => {
    if (!inputText) {
      setTranslatedText("");
      return;
    }

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
          inputText
        )}&langpair=en|bn`
      );
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    translateText(value);
  };

  const handleChangeNum = (e) => {
    const value = e.target.value;
    setNumber(value);
    setConvertedText(convertToBengaliNumbers(value));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h3>English to Bengali Translator</h3>
      <input
        type="text"
        placeholder="Type in English..."
        value={text}
        onChange={handleChange}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      <p>
        <strong>Translated:</strong> {translatedText}
      </p>

      {/* numberMap */}

      <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <h3>English to Bengali Number Converter</h3>
        <input
          type="text"
          placeholder="Type numbers..."
          value={number}
          onChange={handleChangeNum}
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <p>
          <strong>Converted:</strong> {convertedText}
        </p>
      </div>

      {/* ............... */}
      <div className=" mx-auto md:max-w-80 space-y-2 mt-14">
        <label className="form-control md:w-96 w-72 px-1 mx-auto space-y-1">
          <input
            type="text"
            placeholder="নাম ইংরেজীতে "
            className="input input-bordered w-full"
          />

          <input
            type="text"
            placeholder="নাম বাংলায়"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="নাম্বার ইংরেজীতে"
            className="input input-bordered w-full"
          />
         
          <p className="text-right">
            <button onClick={toggleNewHome}><small className="underline">{newHome? "পুরাতন বাড়ি?": "নতুন বাড়ি?"}</small></button>
          </p>
         
        {
            newHome?  <input
            type="text"
            placeholder="বাড়ির নাম বাংলায়"
            className="input input-bordered w-full"
          /> :  <select className="select select-bordered w-full ">
          <option disabled selected>
          বাড়ির নাম
          </option>
          <option>Han Solo</option>
          <option>Greedo</option>
        </select>
        }
          
        </label>
        <div className="text-center">
          <button className="btn btn-outline btn-info" type="button">
            প্রবেশ করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
