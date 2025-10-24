// // import React from "react";

// // const TrendingProperties = () =>{
// //     const [properties,setProperties] = useState([]);

// //     useEffect(()=>{
// //          fetch("http://localhost:5000/api/property/trending")
// //         .then(res => res.json())
// //       .then(data => setProperties(data))
// //       .catch(err => console.error(err));
// //     },[]);


// //     return (
// //         <div className="mt-10">
// // <h1 className="text-xl font-bold mb-4">Trending Properties</h1>
// //    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //         {properties.map(p => (
// //           <div key={p._id} className="border p-3 rounded shadow hover:shadow-lg">
// //             <h2 className="font-bold">{p.location}</h2>
// //             <p>Predicted Price: ₹{p.predictedPrice}</p>
// //             <p>Status: {p.status}</p>
// //             <p>Furnishing: {p.furnishing}</p>
// //           </div>
// //         ))}
// //    </div>
// //         </div>
// //     )
// // }

// // export default TrendingProperties;

// import { useState,useEffect } from "react";
// import axios from 'axios'
// import Marquee from "react-fast-marquee";

// const TrendingAutoScroll = () => {
//   const [trending, setTrending] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/property/trending")
//       .then((res) => setTrending(res.data))
//       .catch((err) => console.error("Error fetching trending:", err));
//   }, []);

//   return (
//     <div className="w-full overflow-hidden">
//       <Marquee
//         pauseOnHover
//         gradient={false}
//         speed={50}
//       >
//         {trending.map((property, idx) => (
//           <div
//             key={idx}
//             className="mx-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-72"
//           >
            
//             <div className="p-4">
//               <h3 className="text-lg font-semibold text-gray-800 truncate">
//                 {property.location || "Unknown Location"}
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 {property.status || "Ready"} • {property.transaction || "Sale"}
//               </p>
//               <p className="mt-2 text-indigo-600 font-semibold">
//                 ₹{property.predictedPrice?.toLocaleString() || "N/A"}
//               </p>
//             </div>
//           </div>
//         ))}
//       </Marquee>
//     </div>
//   );
// };

// export default TrendingAutoScroll;

import { useState, useEffect } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRupeeSign } from "react-icons/fa";

const TrendingAutoScroll = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/property/trending`)
      // .get("http://localhost:5000/api/property/trending")
      .then((res) => setTrending(res.data))
      .catch((err) => console.error("Error fetching trending:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-16">
        <div className="animate-pulse text-gray-400 text-lg font-medium">
          Loading trending properties...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 overflow-hidden">
      <Marquee pauseOnHover gradient={false} speed={40}>
        {trending.map((property, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="mx-5 bg-white/30 backdrop-blur-lg border border-white/40 shadow-lg rounded-2xl overflow-hidden w-80 transform transition-all duration-300"
          >
            {/* Image Section */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={
                  property.image ||
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
                }
                alt="Property"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-2 left-3 flex items-center gap-2 text-white text-sm">
                <FaMapMarkerAlt className="text-red-400" />
                <span className="truncate max-w-[200px]">
                  {property.location || "Unknown Location"}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {property.status || "Ready to Move"}
              </h3>
              <p className="text-gray-500 text-sm">
                {property.transaction || "For Sale"} •{" "}
                {property.furnishing || "Semi-furnished"}
              </p>
              <div className="mt-3 flex items-center gap-1 text-indigo-700 font-bold text-lg">
                <FaRupeeSign />
                <span>{property.predictedPrice?.toLocaleString() || "N/A"}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
};

export default TrendingAutoScroll;
