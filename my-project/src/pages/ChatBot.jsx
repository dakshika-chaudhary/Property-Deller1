import React from "react";
import Layout from "../components/Layout";
import Chatbot from "../components/Chatbot";
import { useUser } from "@clerk/clerk-react";

const ChatBot = () => {
  const { user } = useUser();

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen text-center">
         
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          💬 AI Chat Assistant
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Ask anything about property prices, locations, or real estate trends.
        </p>

        {/* ✅ Your Chatbot Component */}
        <div className="border rounded-lg shadow-inner p-4">
          <Chatbot userId={user.id} />
        </div>
      </div>
    </Layout>
  );
};

export default ChatBot;
