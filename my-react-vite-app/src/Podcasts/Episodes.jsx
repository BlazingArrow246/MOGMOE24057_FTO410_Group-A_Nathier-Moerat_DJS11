import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Styling/episodes.css';

function EpisodeList() {
  const { podcastId, seasonId } = useParams(); // Get IDs from URL
  const [podcastTitle, setPodcastTitle] = useState('');
  const [episodes, setEpisodes] = useState([]); // State for episodes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);
  const [currentEpisodeUrl, setCurrentEpisodeUrl] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  useEffect(() => {
    setLoading(true);
    fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPodcastTitle(data.title);
        // Find the correct season object in the array
        const foundSeason = data.seasons.find(
          (s) => s.season === parseInt(seasonId)
        );
        setEpisodes(foundSeason ? foundSeason.episodes : []);
        // Set the audio URL to the first episode if available
        if (foundSeason && foundSeason.episodes.length > 0) {
          setCurrentEpisodeUrl(foundSeason.episodes[0].file);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching podcast details:", error);
        setError(error);
        setLoading(false);
      });
  }, [podcastId, seasonId]);

  const handleGoBack = () => {
    navigate(`/podcasts/${podcastId}`); // Navigate back to the seasons page
  };

  if (loading) {
    return <div>Loading episodes...</div>;
  }

  if (error) {
    return <div>Error loading episodes: {error.message}</div>;
  }

  return (
    <div>
      <button onClick={handleGoBack}>Back to Seasons</button> {/* Go Back Button */}
      <h1>{podcastTitle || "Loading..."} <br /> Season {seasonId}</h1>
      {episodes.length > 0 ? (
        episodes.map((episode) => (
          <div key={episode.title}>
            <h3>{episode.title}</h3>
            <p>{episode.description}</p>
            <button onClick={() => setCurrentEpisodeUrl(episode.file)}>
              Play Episode {episode.episode}
            </button>
          </div>
        ))
      ) : (
        <p>No episodes available for this season.</p>
      )}

      {currentEpisodeUrl && (
        <div style={{ marginTop: '20px' }}>
          <h2>Now Playing</h2>
          <audio key={currentEpisodeUrl} ref = {audioRef} controls src={currentEpisodeUrl} />
        </div>
      )}
    </div>
  );
}

export default EpisodeList;
