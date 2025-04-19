import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './Styling/seasons.css';


export default function SeasonList() {
  // Extract the podcast ID from the URL parameters
  const { podcastId } = useParams(); 
  const [podcastData, setPodcastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPodcastData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error("Error fetching podcast data:", error);
      });
  }, [podcastId]);

  if (loading) {
    return <div className="seasons-container">Loading podcast details and seasons...</div>;
  }

  if (error) {
    return <div className="seasons-container">Error loading podcast data: {error.message}</div>;
  }

  if (!podcastData || !podcastData.seasons) {
    return <div className="seasons-container">Seasons not found for this podcast.</div>;
  }

  return (
    <div className="seasons-container">
      <h1> {podcastData.title}</h1>
      <div className="seasons-content">
        
          {podcastData.seasons.map((season) => (
            <div key={season.season} className="card">
              <h2>{season.title || `Season ${season.season}`}</h2>
              <p>{season.episodes ? season.episodes.length : "Number of episodes not available"} Episodes</p>
              <Link
                to={`/podcasts/${podcastId}/seasons/${season.season}`}
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                View Episodes
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}