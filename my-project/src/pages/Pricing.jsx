import React from "react";
import Layout from "../components/Layout";

const Pricing = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold text-center mb-8">💸 Choose Your Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white p-6 rounded shadow-md text-center">
          <h2 className="text-xl font-semibold mb-2">Free Plan</h2>
          <p>Get up to 5 predictions/day.</p>
          <p className="text-3xl font-bold my-4">₹0/month</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Start Free
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white p-6 rounded shadow-md text-center border-2 border-green-600">
          <h2 className="text-xl font-semibold mb-2">Premium Plan</h2>
          <p>Unlimited predictions + chat assistant.</p>
          <p className="text-3xl font-bold my-4">₹499/month</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Upgrade Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
