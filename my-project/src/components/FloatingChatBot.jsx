// src/components/FloatingChatBot.jsx
import { useState } from "react";
import ChatBot from "./Chatbot"

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
      >
        🤖
      </button>

      {/* ChatBot Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-96 h-128">
          <ChatBot />
        </div>
      )}
    </>
  );
};

export default FloatingChatBot;
