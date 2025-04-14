import React, { useState, useEffect } from "react";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://example.com/api/podcasts") // Replace with your API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch podcasts");
        }
        return response.json();
      })
      .then((data) => setPodcasts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div>
      <h1>Podcasts</h1>
      {error && <p>Error: {error}</p>}
      {podcasts.map((podcast) => (
        <div key={podcast.id}>
          <h2>{podcast.name}</h2>
          <p>{podcast.description}</p>
          {/* Link to episodes page */}
          <a href={`/podcasts/${podcast.id}/episodes`}>View Episodes</a>
        </div>
      ))}
    </div>
  );
}
