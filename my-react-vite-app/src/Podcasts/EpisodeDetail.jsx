import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function EpisodeDetail() {

    const { episodeId } = useParams(); // Get the episode ID from the URL
    const [episodeDetails, setEpisodeDetails] = useState(null); // State to store episode details
    const [loading, setLoading] = useState(true); // State for loading indicator
  
    useEffect(() => {
      
      // Fetch episode details dynamically
      fetch(`https://podcast-api.netlify.app/${episodeId}`) 
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setEpisodeDetails(data); // Store fetched data in state
          setLoading(false); // Update loading state
        })
        .catch((error) => {
          console.error("Error fetching episode details:", error);
          setLoading(false); // Ensure loading state is updated
        });
    }, [episodeId]);
  
    if (loading) {
      return <p>Loading episode details...</p>; // Show a loading indicator
    }
  
    if (!episodeDetails) {
      return <p>Error loading episode details.</p>; // Show an error message
    }
  
    return (
      <div>
        <h1>{episodeDetails.title}</h1> {/* Dynamically render the episode title */}
        <p>{episodeDetails.description}</p> {/* Dynamically render the description */}
      </div>
    );
  }
  
  

export default EpisodeDetail; 
