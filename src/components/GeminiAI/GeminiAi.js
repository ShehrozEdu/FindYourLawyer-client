import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import { FiLoader } from "react-icons/fi";

const GeminiAi = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCsPQI899HN0gY6k1fX5BJ3hZ-dy28xoiE"
  );

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const newUserMessage = { text: input, fromUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]); // Add user message to chat history
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetchResponse(input);
      const newBotMessage = { text: response, fromUser: false };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]); // Add bot response to chat history
    } catch (error) {
      console.error("Error fetching response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchResponse = async (input) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(input);
    const response = await result.response;
    return response.text();
  };

  return (
    <div className="h-[calc(100vh-5rem)] bg-gray-100 dark:bg-gray-800 flex flex-col">
     <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-700">
        <div className="messages flex flex-col space-y-4 w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.fromUser ? "user" : "bot"} flex ${
                message.fromUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`message-box p-3 rounded-lg ${
                  message.fromUser ? "bg-red-200" : "bg-blue-200 w-96"
                }`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot flex items-center justify-start dark:text-white">
              <FiLoader className="animate-spin mr-2" />
              <span className="">Loading...</span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex w-full bg-gray-100 dark:bg-gray-800">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isLoading}
          className="flex-1 p-3 rounded-full bg-white border-2 border-gray-200 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="ml-4 px-6 py-3 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GeminiAi;
