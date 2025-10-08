import React, { useState } from "react";

const Chatbot = ({ userId }) => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!query.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, question: query }),
      });
      const data = await response.json();

      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong. Try again later." },
      ]);
    } finally {
      setQuery("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
        🤖 Property Assistant
      </h2>

      <div className="h-80 overflow-y-auto border p-3 rounded-md mb-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`my-2 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
  className={`p-2 rounded-xl max-w-xs ${
    msg.sender === "user"
      ? "bg-indigo-100 text-indigo-900"
      : "bg-green-100 text-green-900"
  }`}
>
  {msg.text.split('\n').map((line, idx) => (
    <span key={idx}>
      {line}
      <br />
    </span>
  ))}
</div>

          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about your property or new investments..."
          className="flex-1 p-2 border rounded-l-md focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
