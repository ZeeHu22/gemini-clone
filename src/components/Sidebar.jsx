import React, { useContext, useState, useEffect } from "react";
import { IoMenu } from "react-icons/io5";
import { FaMessage, FaPlus, FaQuestion } from "react-icons/fa6";
import { MdHistory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { Context } from "../context/Context";

const Sidebar = ({ darkMode }) => {
  const [extended, setExtended] = useState(false);
  const [fullyOpen, setFullyOpen] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  useEffect(() => {
    if (!extended) setFullyOpen(false);
  }, [extended]);

  const handleTransitionEnd = () => {
    if (extended) {
      setFullyOpen(true);
    }
  };

  return (
    <div
      className={`min-h-screen inline-flex flex-col justify-between py-[25px] px-[15px] transition-all duration-300 ease-in-out ${extended ? "w-64" : "w-20"} 
      ${darkMode ? "bg-slate-700 text-white" : "bg-[#e4e7eb] text-slate-700"}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={`flex flex-col ${fullyOpen ? "items-start" : "items-center"} justify-between`}>
        <IoMenu
          onClick={() => setExtended(!extended)}
          className="text-2xl block cursor-pointer m-[15px]"
        />

        <div
          onClick={() => newChat()}
          className={`mt-[10px] inline-flex items-center gap-[10px] py-[10px] px-[15px] text-[14px] cursor-pointer rounded-full transition-all duration-300 ease-in-out 
          ${darkMode ? "bg-gray-600 text-gray-300" : "bg-gray-300 text-gray-500"}`}
        >
          <FaPlus className="text-2xl" />
          {fullyOpen && <p>New Chat</p>}
        </div>

        {fullyOpen && (
          <div className="flex flex-col animate-fadeIn duration-1000">
            <p className="m-[15px]">Recent</p>
            {prevPrompt?.map((item, index) => (
              <div
                key={index}
                onClick={() => loadPrompt(item)}
                className={`flex items-center gap-2 p-2 pr-10 rounded-[50px] cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out 
                ${darkMode ? "text-white hover:bg-gray-700" : "text-slate-700 hover:bg-gray-300"}`}
              >
                <FaMessage className="text-2xl" />
                <p>{item.slice(0, 18)}...</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={`flex flex-col ${fullyOpen ? "items-start" : "items-center"} justify-center pb-4`}>
        <div className={`flex items-center gap-2 p-2 rounded-[50px] m-[8px] cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out 
        ${darkMode ? "text-white hover:bg-gray-700" : "text-slate-700 hover:bg-gray-300"}`}>
          <FaQuestion className="text-2xl" />
          {fullyOpen && <p>Help</p>}
        </div>

        <div className={`flex items-center gap-2 p-2 rounded-[50px] m-[8px] cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out 
        ${darkMode ? "text-white hover:bg-gray-700" : "text-slate-700 hover:bg-gray-300"}`}>
          <MdHistory className="text-2xl" />
          {fullyOpen && <p>History</p>}
        </div>

        <div className={`flex items-center gap-2 p-2 rounded-[50px] m-[8px] cursor-pointer hover:bg-gray-300 transition-all duration-300 ease-in-out 
        ${darkMode ? "text-white hover:bg-gray-700" : "text-slate-700 hover:bg-gray-300"}`}>
          <IoSettings className="text-2xl" />
          {fullyOpen && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
