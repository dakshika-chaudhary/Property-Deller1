// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const UserProperties = ()=>{
//     const {id} = useParams();
//     const [properties,setProperties] = useState([]);
//     const [loading,setLoading] = useState(true);

//     useEffect(()=>{
//         const fetchProperties = async()=>{
//             try{ 
//                   const res = await fetch(`http://localhost:5000/api/property/user/${id}`);
//                   const data = await res.json();
//                   setProperties(data.properties || []); 
//             }
//             catch(err){
//              console.error("Error fetching properties:", err);   
//             }
//             finally{
//                 setLoading(false);
//             }
//         }
//             if(id)fetchProperties();
//     },[id]);

//       if (loading) return <p>Loading properties...</p>;

//   if (!properties.length) return <p>No saved properties found for this user.</p>;

//   return(
//     <div className="max-w-4xl mx-auto p-6">
//         <h1 className="text-2xl font-bold mb-4">Your Saved Properties</h1>
//         {properties.map((prop)=>(
//             <div 
//             key={prop._id}
//             className="mb-4 p-4 border rounded-md shadow-sm bg-white">
//                  <p><strong>Price:</strong> ₹{prop.predictedPrice}</p>
//           <p><strong>Location:</strong> {prop.location}</p>
//            <p><strong>Facing:</strong> {prop.facing || "N/A"}</p>
//           <p><strong>Carpet Area:</strong> {prop.Carpet_Area || "N/A"} sqft</p>
//           <p><strong>Floor:</strong> {prop.Floor || "N/A"}</p>
//           <p><strong>Furnishing:</strong> {prop.Furnishing || "N/A"}</p>
//           <p><strong>Bathrooms:</strong> {prop.Bathroom || "N/A"}</p>
//           <p><strong>Balcony:</strong> {prop.Balcony || "N/A"}</p>
//           <p><strong>Overlooking</strong> {prop.overlooking || "N/A"}</p>
//           <p><strong>Status:</strong> {prop.Status || "N/A"}</p>
//                 </div>
//         ))}
//     </div>
//   )
// }

// export default UserProperties;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserProperties = () => {
  const { id } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/property/user/${id}`);
        const data = await res.json();
        setProperties(data.properties || []);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProperties();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-indigo-600 text-lg font-semibold">
        Loading properties...
      </div>
    );

  if (!properties.length)
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg font-medium">
        No saved properties found for this user.
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        🏡 Your Saved Properties
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((prop) => (
          <div
            key={prop._id}
            className="relative bg-white border rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 overflow-hidden"
          >
            {/* Header gradient */}
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r rounded-t-2xl"></div>

            <div className="mt-3">
              <h2 className="text-xl font-semibold text-indigo-700 mb-3">
                ₹{prop.predictedPrice?.toLocaleString("en-IN") || "N/A"}
              </h2>

              <div className="space-y-1 text-gray-700">
                <p><strong>📍 Location:</strong> {prop.location}</p>
                <p><strong>🏢 Floor:</strong> {prop.floor || "N/A"}</p>
                <p><strong>🛋 Furnishing:</strong> {prop.furnishing || "N/A"}</p>
                <p><strong>🧱 Carpet Area:</strong> {prop.carpetArea || "N/A"} sqft</p>
                <p><strong>🚪 Facing:</strong> {prop.facing || "N/A"}</p>
                <p><strong>🌅 Overlooking:</strong> {prop.overlooking || "N/A"}</p>
                <p><strong>🚽 Bathrooms:</strong> {prop.bathroom || "N/A"}</p>
                <p><strong>🌇 Balcony:</strong> {prop.balcony || "N/A"}</p>
                <p><strong>🚗 Car Parking:</strong> {prop.carParking || "N/A"}</p>
                <p><strong>📜 Ownership:</strong> {prop.ownership || "N/A"}</p>
                <p><strong>📊 Status:</strong> {prop.status || "N/A"}</p>
              </div>

              <p className="text-sm text-gray-500 mt-4 italic">
                Added on {new Date(prop.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProperties;
