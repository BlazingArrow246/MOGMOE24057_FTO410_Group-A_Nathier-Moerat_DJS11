import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function EpisodeList() {
  const { podcastId, seasonId } = useParams(); // Get IDs from URL
  const [podcastTitle, setPodcastTitle] = useState('')

  useEffect(() => {
    // Fetch podcast details dynamically using the podcastId
    fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setPodcastTitle(data.title)) // Assume API response contains "title"
      .catch((error) => console.error("Error fetching podcast title:", error));
  }, [podcastId]);

  const episodes = [
    { id: 1, title: "Episode 1", description: "Introduction to the season" },
    { id: 2, title: "Episode 2", description: "The journey continues" },
  ];

  return (
    
    <div>
      <h1> {podcastTitle || "Loading..."}
        <br/> 
        Season {seasonId}
        </h1>

      {episodes.map((episode) => (
        <div key={episode.id}>
          <h3>{episode.title}</h3>
          <p>{episode.description}</p>
          <Link to={`/podcasts/${podcastId}/seasons/${seasonId}/episodes/${episode.id}`}>Play</Link>
        </div>
      ))}
    </div>
  );
}

export default EpisodeList;
