// src/components/Layout.jsx
import React from "react";
import Navbar from "./Navbar";
import { FaBars, FaHome, FaBuilding, FaDollarSign, FaUser, FaCog, FaInfoCircle, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  
  const userId = isLoaded && isSignedIn ? user.id : null;
    

    const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
{
      name: "Properties",
      icon: <FaBuilding />,
      path: userId ? `/properties/${userId}` : "#", // ✅ safely handle if not logged in
    },
    { name: "Pricing", icon: <FaDollarSign />, path: "/pricing" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Subscription", icon: <FaClipboardList />, path: "/subscription" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
    { name: "About", icon: <FaInfoCircle />, path: "/about" },
  ];
  return (
     <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div
        className={`bg-white shadow-md flex flex-col p-6 transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
        >
            <button
          className="mb-6 text-gray-600 hover:text-green-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars size={20} />
        </button>
        <h1
          className={`text-xl font-bold mb-6 transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          PropertyDeller 🏠
        </h1>
        <nav className="flex flex-col space-y-3">
            {menuItems.map((item,index)=>(
                <Link
                key={index}
                to={item.path}
                className="flex items-center space-x-3 hover:bg-green-100 rounded px-3 py-2 transition-colors duration-200">
                    <span>{item.icon}</span>
                     {isOpen && <span className="font-medium">{item.name}</span>}
                </Link>

            ))}
        </nav>
        </div>

         <main className="flex-1">
        <Navbar />
        <div className="mt-6">{children}</div>
      </main>
     </div>
  );
};

export default Layout;
