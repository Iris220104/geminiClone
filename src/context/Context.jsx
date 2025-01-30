import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setInput(""); // Clear input
    setRecentPrompt(""); // Clear recent prompt
    setResultData(""); // Clear result data
    setShowResult(false); // Hide results
    setLoading(false); // Ensure loading is false
  };

  const onSent = async (prompt) => {
    if (!prompt.trim()) {
      console.error("Prompt cannot be empty!");
      return;
    }

    setLoading(true); // Start loading
    try {
      const response = await run(prompt); // Call the API with the passed prompt
      let responseArray = response.split("**");
      let newResponse = ""; // Initialize as an empty string

      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("</br>");
      setResultData(newResponse2); // Update result data with the API response
      setShowResult(true); // Show the result on the screen
      setRecentPrompt(prompt); // Store the latest prompt
      setPrevPrompts((prev) => [...prev, prompt]); // Add input to history
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;



