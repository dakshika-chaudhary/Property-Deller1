import React, { useEffect, useState } from "react";

const RecommendedProperties = ({userId})=>{
    const [properties,setProperties] = useState([]);

    useEffect(()=>{
        console.log("Fetching recommendations for:", userId);
if(!userId) return;
        fetch(`http://localhost:5000/api/property/recommended/${userId}`)
        .then(res => res.json())
      .then(data => setProperties(data))
      .catch(err => console.error(err));
    },[userId]);

    if (!properties.length) return <p>No recommendations yet.</p>;

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map(p=>(
              <div key={p._id} className="border p-3 rounded shadow hover:shadow-lg">
                 <h2 className="font-bold">{p.location}</h2>
                 <p>Predicted Price: ₹{p.predictedPrice}</p>
                 <p>Status: {p.status}</p>
                  <p>Furnishing: {p.furnishing}</p>
                </div>  
        ))}
      </div>
    )
}

export default RecommendedProperties;

