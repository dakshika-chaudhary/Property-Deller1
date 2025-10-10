// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const About = () => {
  return (
    
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-20 px-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
        About PropertyDeller 🏠
      </h1>
      
      <p className="text-lg text-gray-700 max-w-3xl text-center mb-4">
        PropertyDeller is a smart web application designed to help users predict
        real estate prices accurately. Using advanced algorithms and data
        analysis, it provides users with reliable price estimations for
        properties in various locations.
      </p>

      <p className="text-lg text-gray-700 max-w-3xl text-center mb-4">
        Whether you are buying, selling, or just curious about property values,
        PropertyDeller makes it easy to get insights and make informed decisions.
      </p>

      <p className="text-lg text-gray-700 max-w-3xl text-center mb-6">
        Our mission is to make property transactions transparent and data-driven,
        giving everyone access to accurate real estate pricing information.
      </p>

      <Link
        to="/"
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
      >
        Go to Home
      </Link>
    </div>
    
  );
};

export default About;
