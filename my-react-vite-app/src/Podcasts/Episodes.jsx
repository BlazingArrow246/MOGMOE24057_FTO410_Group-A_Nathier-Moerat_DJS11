import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function EpisodeList() {
  const { podcastId, seasonId } = useParams(); // Get IDs from URL
  const [podcastTitle, setPodcastTitle] = useState('')
  const [episodes, setEpisodes] = useState([]); // State for episodes

  useEffect(() => {
     // Fetch podcast details dynamically using the podcastId
     fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
     .then((response) => {
       if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
       }
       return response.json();
     })
     .then((data) => {
       setPodcastTitle(data.title); // 
       const season = data.seasons.find((s) => s.id === parseInt(seasonId)); // Find the correct season
       setEpisodes(season ? season.episodes : []); // Set episodes for the season
     })
     .catch((error) => console.error("Error fetching podcast details:", error));
 }, [podcastId, seasonId]);

  return (
    
    <div>
      <h1> {podcastTitle || "Loading..."}
        <br/> 
        Season {seasonId}
        </h1>
      {episodes.lngth > 0 ? (
      episodes.map((episode) => (
        <div key={episode.id}>
          <h3>{episode.title}</h3>
          <p>{episode.description}</p>
          <Link to={`/podcasts/${podcastId}/seasons/${seasonId}/episodes/${episode.id}`}>Play</Link>
        </div>
      ))
    ) : (
      <p>No episodes available</p>
    )}
    </div>
  );
}

export default EpisodeList;
