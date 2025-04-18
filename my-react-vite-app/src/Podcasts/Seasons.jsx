import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";



function SeasonList() {
  // Extract the podcast ID from the URL parameters
  const { podcastId } = useParams(); 
  const [podcastTitle, setPodcastTitle] = useState("");

  // Hardcoded list of seasons
  const seasons = [
    { id: 1, seasonNumber: "Season 1", episodes: 10 },
    { id: 2, seasonNumber: "Season 2", episodes: 8 },
  ];

  useEffect(() => {
    // Fetch podcast name dynamically 
    fetch(`https://podcast-api.netlify.app/id/${podcastId}`
)
      .then((response) => response.json())
      .then((data) => setPodcastTitle(data.title)) //  returns the name
      .catch((error) => console.error("Error fetching podcast name:", error));
  }, [podcastId]);

  return (
    <div className = "container">

      <h1>Seasons for {podcastTitle|| "Loading..."}</h1>
      <div className = "content">
      {seasons.map((season) => (
        <div key={season.id} clasName="card">
          <h2>{season.seasonNumber}</h2>
          <p>{season.episodes} Episodes</p>
          <Link to={`/podcasts/${podcastId}/seasons/${season.id}`}
           style={{ textDecoration: 'none', color: 'blue' }}
          >View Episodes</Link>

        </div>
      ))}
    </div>
    </div>
  );
}

export default SeasonList;
