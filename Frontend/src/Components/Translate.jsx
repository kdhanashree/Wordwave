import React, { useEffect, useState } from "react";
import icon1 from "../assets/icon1.png";
import language from "../utils/data.js";
import axiosInstance from "../utils/axios.js";
import { Loader } from 'lucide-react';
import backgroundImage from '../assets/languagetranslation.jpg'
const Translate = () => {
  const [text, setText] = useState("");
  const [translation, setTranslation] = useState("");
  const [sourceLang, setSourceLang] = useState("en-GB");
  const [targetLang, setTargetLang] = useState("hi-IN");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    let a = sourceLang;
    let b = targetLang;
    let t = text.trim();
    if (!t){
      setLoading(false);
      return;
    } 
    //set Loading
    try {
      const res = await axiosInstance.post("/translate", {
        sourceLang,
        targetLang,
        text: t,
      });
      //console.log(`Res:${res}`);
      let response = res.data.translatedText;
      //console.log(`Received Response:${response}`);
      setTranslation(response);
      setLoading(false);
    } catch (err) {
      console.log(`Error in translation`, err.message);
      setTranslation("Error in Translation!!");
      setLoading(false);
    }
  };

  return (
    <>
     
      <div className="top-line flex bg-white opacity-0.8 rounded-md justify-center">
        <img
          src={icon1}
          alt="Translation image"
          className="w-18 h-18 animate-pulse"
        ></img>
        <h1 className="text-blue-800">Let's Translate!!</h1>
        {/* <img
          src={icon1}
          alt="Translation image"
          className="w-18 h-18 animate-pulse"
        ></img> */}
      </div>
      <div className=" bg-sky-200 opacity-80 p-5 rounded-xl mt-4">
      <div className="main-container flex  h-90 w-200 justify-center align-items-center text-black ">
        <div className="h-75 w-95  pt-3">
          <select
            className="p-2 border-2 border-black w-full "
            onChange={(e) => setSourceLang(e.target.value)}  value={sourceLang}
          >
            {Object.entries(language).map(([code, name]) => (
              <option key={code} value={code} className="text-black">
                {name}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Enter speech"
            className=" from-text w-full h-full p-3 text-lg  outline-none border-2 border-black "
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <div className="h-75 w-95  pt-3 ">
          <select
            className="p-2 border-2 border-black  w-full "
            onChange={(e) => setTargetLang(e.target.value)} value={targetLang}
          >
            {Object.entries(language).map(([code, name]) => (
              <option key={code} value={code} className="text-black">
                {name}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Translated text"
            readOnly
            className=" to-text w-full h-full p-3 text-lg border-2 border-black  outline-none "
            value={translation}
          ></textarea>
        </div>

      </div>
      <div className="mt-1">
        <button onClick={handleClick} className="btn" disabled={loading} >
          {loading ? (
           <div style={{ display: "flex", alignItems: "center" }}>
           Loading <Loader style={{ marginLeft: "5px" }} className="animate-spin"/>
           </div> 
          ) : (
            "Translate"
          )}
        </button>
      </div>
     </div>
    
    </>
  );
};

export default Translate;
