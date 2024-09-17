import React, { useState, useContext } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { Context } from "./context/Context";
import './App.css';

const App = () => {
  const {
    input,
    setInput,
    recentPrompt,
    setRecentPrompt,
    prevPrompt,
    setPrevPrompt,
    showResult,
    loading,
    resultData,
    onSent,
  } = useContext(Context)
 
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <div className="flex animate-fadeIn duration-1000">
        <Sidebar darkMode={darkMode} />
        <MainContent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          input={input}
          setInput={setInput}
          recentPrompt={recentPrompt}
          showResult={showResult}
          loading={loading}
          resultData={resultData}
          onSent={onSent}
        />
      </div>
    </>
  );
};

export default App;
