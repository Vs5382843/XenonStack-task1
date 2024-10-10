import React, { useEffect, useState } from 'react';
import { trainModel, recommendPropertiesForUser } from './reccomndations.js';

const Dashboard = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    async function fetchRecommendations() {
      // Train the model (you can skip this step if the model is already trained)
      await trainModel();

      // Predict properties for a specific user (e.g., user ID 1)
      const predictedProperties = await recommendPropertiesForUser(1);
      setRecommendations(predictedProperties);
    }

    fetchRecommendations();
  }, []);

  return (
    <div>
      <h2>Recommended Properties</h2>
      {recommendations.length > 0 ? (
        recommendations.map((property, index) => (
          <div key={index}>
            <h3>Property {index + 1}</h3>
            <p>Interaction Level: {property}</p>
          </div>
        ))
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
};

export default Dashboard;
