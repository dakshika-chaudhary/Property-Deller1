
// import React from "react";
// import Navbar from "../components/Navbar";
// import { Link } from "react-router-dom";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import TrendingAutoScroll from "../components/TrendingProperties";
// import Footer from "../components/Footer";
// import About from "./About";

// const Home = () => {
//   const { user } = useUser();
//   const { openSignIn } = useClerk();

//   return (
//     <div className="">
//       {/* Navbar */}
     

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center mt-24 px-4 md:px-8 lg:px-20">
//         <h1 className="text-4xl md:text-5xl font-bold text-indigo-700">
//           Welcome to PropertyDeller 🏠
//         </h1>
//         <p className="mt-4 text-gray-600 max-w-2xl">
//           Predict property prices, manage your listings, and gain valuable market insights — 
//           powered by AI and data analytics.
//         </p>

//         {/* Buttons */}
//         <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
//           {user ? (
//             <Link
//               to={`/dashboard/${user.id}`}
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//             >
//               Go to Dashboard
//             </Link>
//           ) : (
//             <button
//               onClick={openSignIn}
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//             >
//               Get Started ➡️
//             </button>
//           )}

//           <Link
//             to="/pricing"
//             className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition"
//           >
//             View Pricing
//           </Link>
//         </div>
//       </section>

//       {/* Trending Properties Section */}
//       <section className="mt-20 w-full bg-gradient-to-r from-indigo-50 to-indigo-100 py-10">
//         <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
//           🔥 Trending Properties
//         </h2>
//         <div className="max-w-6xl mx-auto px-4">
//           <TrendingAutoScroll />
//         </div>
//       </section>

//  <About></About>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default Home;


import React from "react";
import { Link } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import TrendingAutoScroll from "../components/TrendingProperties";
import Footer from "../components/Footer";
import About from "./About";
import FloatingChatBot from "../components/FloatingChatBot";

const Home = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="bg-gradient-to-b  to-white min-h-screen">
      {/* Navbar */}
      
<Navbar/>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center mt-24 px-4 md:px-8 lg:px-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-indigo-700 drop-shadow-lg"
        >
          Welcome to PropertyDeller 🏠
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-6 text-gray-600 max-w-3xl text-lg md:text-xl"
        >
          Predict property prices, manage your listings, and gain valuable market insights —
          powered by AI and data analytics.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          {user ? (
           <Link
               to={`/dashboard/${user.id}`}
               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
             >
               Go to Dashboard
            </Link>
          ) : (
            <button
              onClick={openSignIn}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transform transition"
            >
              Get Started ➡️
            </button>
          )}

          <Link
            to="/subscription"
            className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-600 hover:text-white hover:scale-105 transform transition"
          >
            View Pricing
          </Link>
        </motion.div>
      </section>

      {/* Trending Properties Section */}
      <section className="mt-20 w-full py-12 bg-gradient-to-r  to-indigo-100">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-8 text-center drop-shadow-md">
          🔥 Trending Properties
        </h2>
        <div className="max-w-6xl mx-auto px-4">
          <TrendingAutoScroll />
        </div>
      </section>

      {/* About Section with Motion */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <About />
      </motion.div>
      <FloatingChatBot/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
