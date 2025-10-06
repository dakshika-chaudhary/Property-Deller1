import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    location: "",
    Status: "",
    Floor: "",
    Transaction: "",
    Furnishing: "",
    facing: "",
    overlooking: "",
    Ownership: "",
    Carpet_Area: "",
    Bathroom: "",
    Balcony: "",
    Car_Parking: "",
    Super_Area: "",
  });

  const [predictedPrice, setPredictedPrice] = useState(null);
  const [showFullPagePrice, setShowFullPagePrice] = useState(false);
  const [loading, setLoading] = useState(false);

  const facingOptions = ['Unknown', 'East', 'West', 'North - East', 'North', 'North - West', 'South', 'South -West', 'South - East'];
  const overlookingOptions = [
    'Unknown','Garden/Park','Garden/Park, Main Road','Main Road',
    'Pool, Garden/Park, Main Road','Garden/Park, Pool, Main Road','Garden/Park, Pool',
    'Main Road, Garden/Park','Main Road, Garden/Park, Pool','Pool, Garden/Park','Pool',
    'Garden/Park, Main Road, Pool','Pool, Main Road','Main Road, Pool, Garden/Park',
    'Pool, Main Road, Garden/Park','Main Road, Not Available','Main Road, Pool',
    'Garden/Park, Pool, Main Road, Not Available','Garden/Park, Not Available','Pool, Main Road, Not Available'
  ];
  const ownershipOptions = ['Unknown','Freehold','Co-operative Society','Power Of Attorney','Leasehold'];
  const statusOptions = ["Ready to Move", "Unknown"];
  const transactionOptions = ['Resale', 'New Property', 'Unknown', 'Other', 'Rent/Lease'];
  const furnishingOptions = ['Unfurnished', 'Semi-Furnished', 'Furnished', 'Unknown'];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePredict = async () => {
    setLoading(true);
    setPredictedPrice(null);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      const price = data["Predicted Price (in rupees)"] || "N/A";
      setPredictedPrice(price);
      setShowFullPagePrice(true);

      // Hide full-page after 3 seconds
      setTimeout(() => setShowFullPagePrice(false), 3000);
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Error connecting to the API. Please check your server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!predictedPrice) { alert("Please predict the price first!"); return; }
    try {
      const propertyData = { ...formData, predictedPrice };
      const response = await fetch("http://localhost:5000/api/property/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(propertyData),
      });
      const data = await response.json();
      if (response.ok) alert("✅ Property saved successfully!");
      else alert("❌ Failed to save property: " + data.error);
    } catch (err) {
      console.error("Error saving property:", err);
      alert("Error saving property. Please check your server.");
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-6 text-indigo-600 text-center">🏡 Property Price Prediction Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => {
            let options = [];
            if (key === "Status") options = statusOptions;
            else if (key === "Transaction") options = transactionOptions;
            else if (key === "Furnishing") options = furnishingOptions;
            else if (key === "facing") options = facingOptions;
            else if (key === "overlooking") options = overlookingOptions;
            else if (key === "Ownership") options = ownershipOptions;

            if (options.length > 0) {
              return (
                <div key={key} className="flex flex-col">
                  <label className="font-medium mb-1">{key.replace(/_/g, " ")}:</label>
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="p-2 border rounded-md w-full focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="" disabled>-- Select --</option>
                    {options.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                  </select>
                </div>
              );
            }

            return (
              <div key={key} className="flex flex-col">
                <label className="font-medium mb-1">{key.replace(/_/g, " ")}:</label>
                <input
                  type={["Carpet_Area","Bathroom","Balcony","Car_Parking","Super_Area"].includes(key) ? "number" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/_/g," ")}
                  className="p-2 border rounded-md w-full focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <button
            onClick={handlePredict}
            disabled={loading}
            className={`flex-1 py-3 rounded-lg text-white font-semibold transition-colors ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
          {predictedPrice && (
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-lg text-white font-semibold bg-green-600 hover:bg-green-700 transition-colors"
            >
              Save Property
            </button>
          )}
        </div>

        {/* Full-page predicted price modal */}
        {predictedPrice && showFullPagePrice && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-2xl shadow-2xl relative max-w-lg w-full text-center animate-scale-up">
              <button
                onClick={() => setShowFullPagePrice(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
              >
                &times;
              </button>
              <p className="text-2xl font-semibold text-indigo-700 mb-4">💰 Predicted Property Value</p>
              <p className="text-5xl font-extrabold text-indigo-900">₹ {predictedPrice}</p>
            </div>
          </div>
        )}

        {/* Bottom persistent predicted price */}
        {predictedPrice && !showFullPagePrice && (
          <div className="fixed bottom-4 right-4 bg-indigo-100 p-4 rounded-xl shadow-lg text-center animate-pulse z-40">
            <p className="font-semibold text-indigo-700">💰 Predicted Price</p>
            <p className="text-2xl font-bold text-indigo-800">₹ {predictedPrice}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
