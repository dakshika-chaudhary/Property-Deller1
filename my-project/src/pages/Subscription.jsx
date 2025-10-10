import React from 'react';
import { PricingTable } from '@clerk/clerk-react';
import Layout from '../components/Layout';

const Plan = () => {
  return (
    <Layout>
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center px-6 py-10 -my-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-3xl p-10 border border-slate-200 z-20">
        <div className="text-center mb-12">
          <h2 className="text-slate-800 text-[40px] sm:text-[46px] font-bold tracking-tight">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mt-4 text-lg leading-relaxed">
            Start for free and scale up as you grow. Find the perfect plan for your content creation needs.
          </p>
        </div>

        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-3xl">
            <PricingTable />
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-pink-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>
    </div>
     </Layout> 
  );
};

export default Plan;
