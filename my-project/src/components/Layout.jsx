import  { useState } from "react";
import Navbar from "./Navbar";
import {
  FaBars,
  FaHome,
  FaBuilding,
  FaDollarSign,
  FaUser,
  FaCog,
  FaInfoCircle,
  FaWpforms,
  
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
// import ChatBot from "./Chatbot.jsx";
import FloatingChatBot from "./FloatingChatBot";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = isLoaded && isSignedIn ? user.id : null;

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "DashBoard", icon: <FaWpforms />, path: `/dashboard/${userId}` },
    {
      name: "Properties",
      icon: <FaBuilding />,
      path: userId ? `/properties/${userId}` : "/properties/${userId}/page.jsx",
    },
   
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Subscription", icon: <FaDollarSign />, path: "/subscription" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
    { name: "About", icon: <FaInfoCircle />, path: "/about" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-md flex flex-col p-6 transition-all duration-300 z-40 ${
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
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-3 hover:bg-green-100 rounded px-3 py-2 transition-colors duration-200"
            >
              <span className="text-gray-700">{item.icon}</span>
              {isOpen && <span className="font-medium text-gray-800">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        {/* Navbar fixed to top */}
        <div className="sticky top-0 z-30 bg-white shadow">
          <Navbar />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>

<FloatingChatBot />
    </div>
  );
};

export default Layout;

