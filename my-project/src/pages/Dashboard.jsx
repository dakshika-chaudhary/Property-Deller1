

import React, { useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "@clerk/clerk-react";

const API_URL = process.env.REACT_APP_API_URL;
const ML_API_URL = process.env.REACT_APP_ML_API_URL;


const Dashboard = () => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
  location: "",
  status: "",
  floor: "",
  transaction: "",
  furnishing: "",
  facing: "",
  overlooking: "",
  ownership: "",
  carpet_area: "",   // ✅ use snake_case
  bathroom: "",
  balcony: "",
  car_parking: "",   // ✅
  super_area: "",    // ✅
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
const handlePredict = async () => {
  setLoading(true);
  setPredictedPrice(null);

  try {
    // Convert numeric inputs to numbers before sending to ML API
    const formattedData = {
  location: formData.location || "Unknown",
  Status: formData.status || "Unknown",
  Floor: formData.floor || "Unknown",
  Transaction: formData.transaction || "Unknown",
  Furnishing: formData.furnishing || "Unknown",
  facing: formData.facing || "Unknown",
  overlooking: formData.overlooking || "Unknown",
  Ownership: formData.ownership || "Unknown",
  Carpet_Area: formData.carpet_area ? Number(formData.carpet_area) : 0,
  Bathroom: formData.bathroom ? Number(formData.bathroom) : 0,
  Balcony: formData.balcony ? Number(formData.balcony) : 0,
  Car_Parking: formData.car_parking ? Number(formData.car_parking) : 0,
  Super_Area: formData.super_area ? Number(formData.super_area) : 0,
};

//  const formattedData = {
//   location: formData.location || "Unknown",
//   status: formData.status || "Unknown",
//   floor: formData.floor || "Unknown",
//   transaction: formData.transaction || "Unknown",
//   furnishing: formData.furnishing || "Unknown",
//   facing: formData.facing || "Unknown",
//   overlooking: formData.overlooking || "Unknown",
//   ownership: formData.ownership || "Unknown",
//   carpet_area: formData.carpet_area ? Number(formData.carpet_area) : 0,
//   bathroom: formData.bathroom ? Number(formData.bathroom) : 0,
//   balcony: formData.balcony ? Number(formData.balcony) : 0,
//   car_parking: formData.car_parking ? Number(formData.car_parking) : 0,
//   super_area: formData.super_area ? Number(formData.super_area) : 0,
// };



console.log("Payload to ML API:", JSON.stringify(formattedData, null, 2));


    const response = await fetch(`${ML_API_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    });

    const data = await response.json();

    console.log("Response from ML API:", data);

    let price;
    if (data["Predicted Price (in rupees)"] !== undefined)
      price = data["Predicted Price (in rupees)"];
    else if (data.predictedPrice !== undefined)
      price = data.predictedPrice;
    else
      price = "N/A";

    const formattedPrice =
      price !== "N/A" && !isNaN(price)
        ? Math.round(Number(price)).toLocaleString()
        : "N/A";

    setPredictedPrice(formattedPrice);
    setShowFullPagePrice(true);

    // Hide popup after 3 seconds
    setTimeout(() => setShowFullPagePrice(false), 3000);
  } catch (err) {
    console.error("Prediction error:", err);
    alert("Error connecting to the API. Please check your server.");
  } finally {
    setLoading(false);
  }
};

//   const handlePredict = async () => {
//     setLoading(true);
//     setPredictedPrice(null);
//     try {
//       // const response = await fetch(`${API_URL}/api/property/predict`, {
//       const response = await fetch(`${ML_API_URL}/predict`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//      let price;
//   if (data["Predicted Price (in rupees)"] !== undefined) 
//     price = data["Predicted Price (in rupees)"];
// else if (data.predictedPrice !== undefined)
//    price = data.predictedPrice;
// else 
//   price = "N/A";

//  const formattedPrice =
//       price !== "N/A" && !isNaN(price)
//         ? Math.round(Number(price)).toLocaleString()
//         : "N/A";

//       setPredictedPrice(formattedPrice);
//       setShowFullPagePrice(true);

//       setTimeout(() => setShowFullPagePrice(false), 3000);
//     } catch (err) {
//       console.error("Prediction error:", err);
//       alert("Error connecting to the API. Please check your server.");
//     } finally {
//       setLoading(false);
//     }
//   };

const handleSave = async () => {
  if (!predictedPrice) {
    alert("Please predict the price first!");
    return;
  }
  if (!user?.id) {
    alert("❌ User not loaded or not signed in. Cannot save property.");
    return;
  }

  try {
    const propertyData = {
      userId: user.id,
      location: formData.location,
      status: formData.status || "Unknown",
      floor: formData.floor || "Unknown",
      transaction: formData.transaction || "Unknown",
      furnishing: formData.furnishing || "Unknown",
      facing: formData.facing || "Unknown",
      overlooking: formData.overlooking || "Unknown",
      ownership: formData.ownership || "Unknown",
      carpet_area: Number(formData.carpet_area) || 0,
      bathroom: Number(formData.bathroom) || 0,
      balcony: Number(formData.balcony) || 0,
      car_parking: Number(formData.car_parking) || 0,
      super_area: Number(formData.super_area) || 0,
      predictedPrice: Number(predictedPrice.replace(/,/g, "")),
    };

    console.log("Payload to /save API:", propertyData);

    const response = await fetch(`${API_URL}/api/property/save`, {
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


  // Keys that should render as <select>
  const selectFields = {
    status: statusOptions,
    transaction: transactionOptions,
    furnishing: furnishingOptions,
    facing: facingOptions,
    overlooking: overlookingOptions,
    ownership: ownershipOptions,
  };

  // Keys that should render as number inputs
const numberFields = ["carpet_area", "bathroom", "balcony", "car_parking", "super_area"];


  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h1 className="text-2xl font-bold mb-6 text-indigo-600 text-center">🏡 Property Price Prediction Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((key) => {
            if (selectFields[key]) {
              return (
                <div key={key} className="flex flex-col">
                  <label className="font-medium mb-1">{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</label>
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="p-2 border rounded-md w-full focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="" disabled>-- Select --</option>
                    {selectFields[key].map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
                  </select>
                </div>
              );
            }

            return (
              <div key={key} className="flex flex-col">
                <label className="font-medium mb-1">{key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}:</label>
                <input
                  type={numberFields.includes(key) ? "number" : "text"}
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
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

      {/* {user && <Chatbot userId={user.id} />} */}
    </Layout>
  );
};

export default Dashboard;
