// // src/components/FloatingChatBot.jsx
// import { useState } from "react";
// import ChatBot from "./Chatbot"

// const FloatingChatBot = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Floating Button */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition"
//       >
//         🤖
//       </button>

//       {/* ChatBot Panel */}
//       {open && (
//         <div className="fixed bottom-20 right-5 z-50 w-96 h-128">
//           <ChatBot />
//         </div>
//       )}
//     </>
//   );
// };

// export default FloatingChatBot;
import { useState } from "react";
import ChatBot from "./Chatbot";

const FloatingChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-50 bg-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          🤖
        </button>
      )}

      {/* ChatBot Panel */}
      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-96 max-w-[90vw] h-[550px] bg-white shadow-2xl rounded-2xl flex flex-col border border-indigo-100 transition-all duration-300 top-[80px]">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-indigo-600 text-white rounded-t-2xl">
            <h2 className="text-lg font-semibold">Property Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 text-xl font-bold transition-transform transform hover:rotate-90"
            >
              ✖
            </button>
          </div>

          {/* Chatbot Body */}
          <div className="flex-1 overflow-hidden">
            <ChatBot />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatBot;
