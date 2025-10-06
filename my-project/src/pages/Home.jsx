import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Home = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <Navbar />

      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700">
          Welcome to PropertyDeller 🏠
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl">
          Predict property prices, manage your listings, and gain valuable market insights — 
          powered by AI and data analytics.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {/* <UserButton afterSignOutUrl="/" /> */}
              <Link
                to="/dashboard"
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started ➡️
            </button>
          )}

          <Link
            to="/pricing"
            className="px-6 py-2 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
          >
            View Pricing
          </Link>
        </div>

        {/* Optional: Add product teaser section */}
        <div className="mt-16 bg-white shadow-md rounded-xl p-6 max-w-3xl">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-3">
            🚀 What You Can Do
          </h2>
          <ul className="text-left text-gray-700 list-disc list-inside space-y-2">
            <li>Predict real estate prices instantly using ML model</li>
            <li>Save and compare multiple properties</li>
            <li>Access market trends and insights</li>
            <li>Chat with your AI-powered assistant for advice</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
