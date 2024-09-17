import React, { useContext, useEffect } from "react";
import {
  FaCode,
  FaCompass,
  FaLightbulb,
  FaMicrophone,
  FaUserCircle,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { Context } from "../context/Context";
import geminiLogo from "../assets/geminiLogo.png";

const MainContent = ({
  darkMode,
  setDarkMode,
  input,
  setInput,
  recentPrompt,
  showResult,
  loading,
  resultData,
  onSent,
}) => {
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input) {
      onSent();
    }
  };

  return (
    <div
      className={`flex-1 min-h-screen pb-[15vh] relative transition-all duration-300 ease-in-out ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-slate-700"
      }`}
      onKeyDown={handleKeyPress}
      tabIndex={0}
    >
      <div className="flex items-center justify-between text-xl p-5">
        <div className="flex items-center gap-3">
          <p>Gemini</p>
        </div>
        <FaUserCircle className="text-4xl" />
      </div>

      <div className="absolute top-6 left-[100px]">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-[8px] py-[4px] rounded-full ${
            darkMode ? "bg-gray-200 text-black" : "bg-black text-white"
          }`}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="max-w-[900px] mx-auto">
        {!showResult ? (
          <>
            <div className="my-12 text-[56px] font-semibold p-5">
              <p>
                <span className="bg-gradient-to-r from-[#368ddd] to-[#ff5546] bg-clip-text text-transparent">
                  Hello, Zeeshan's Friend.
                </span>
              </p>
              <p className="text-slate-400">How can I help you today?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
              {[
                {
                  text: "Suggest top 10 Visual Studio Code extensions.",
                  icon: (
                    <FaCompass className="text-4xl p-1 absolute bottom-2 right-2" />
                  ),
                },
                {
                  text: "What is a hook in React?",
                  icon: (
                    <FaLightbulb className="text-4xl p-1 absolute bottom-2 right-2" />
                  ),
                },
                {
                  text: "Where can I find public API's for my next project?",
                  icon: (
                    <FaMessage className="text-4xl p-1 absolute bottom-2 right-2" />
                  ),
                },
                {
                  text: "How can I debug my code for Vite?",
                  icon: (
                    <FaCode className="text-4xl p-1 absolute bottom-2 right-2" />
                  ),
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`h-[200px] p-4 rounded-lg relative cursor-pointer hover:bg-${
                    darkMode ? "gray-700" : "gray-300"
                  } bg-${darkMode ? "gray-600" : "gray-200"}`}
                  onClick={() => onSent(item.text)} // Pass item.text to onSent
                >
                  <p
                    className={`text-lg ${
                      darkMode ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {item.text}
                  </p>
                  {item.icon}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-0 px-[5%] max-h-[70vh] overflow-y-scroll scrollbar-hidden">
            <div className="my-10 mx-0 flex items-center gap-5">
              <FaUserCircle className="text-3xl" />
              <p className="text-lg font-[400] leading-[1.8]">{recentPrompt}</p>
            </div>

            <div className="flex items-start gap-5">
              <img src={geminiLogo} alt="" className="w-8 rounded-[50%]" />
              {loading ? (
                <div className="w-full flex flex-col gap-2">
                  <hr className="rounded-md border-none bg-gray-200 bg-gradient-to-r from-[#81cafe] via-[#ffffff] to-[#81cafe] p-4 animate-scroll-bg" />
                </div>
              ) : (
                <p
                  dangerouslySetInnerHTML={{ __html: resultData }}
                  className="text-lg font-[400] leading-[1.8]"
                />
              )}
            </div>
          </div>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] px-5 mx-auto mt-5">
          <div
            className={`flex items-center justify-between gap-20 py-2 px-5 rounded-full bg-${
              darkMode ? "slate-700" : "gray-200"
            }`}
          >
            <input
              type="text"
              placeholder="Enter a prompt here..."
              className={`flex-1 bg-transparent border-none outline-none p-2 text-lg ${
                darkMode ? "text-white" : "text-slate-700"
              }`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex gap-4 items-center">
              <MdAddPhotoAlternate className="text-2xl cursor-pointer" />
              <FaMicrophone className="text-2xl cursor-pointer" />
              {input && (
                <IoMdSend
                  onClick={onSent}
                  className="text-2xl cursor-pointer"
                />
              )}
            </div>
          </div>
          <p className="text-sm my-4 mx-auto text-center font-[500] text-slate-600">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
