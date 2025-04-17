
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function PodcastList() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => setPodcasts(data))
      .catch((error) => console.error("Error fetching podcasts:", error));
  }, []);

   // Fetch all genres
   useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => setGenres(data.genres || [])) // Adjust according to actual data structure
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  // Handle genre selection
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  // Filter podcasts based on selected genre
  const filteredPodcasts = selectedGenre
    ? podcasts.filter((podcast) => podcast.genre.name === selectedGenre)
    : podcasts;

  return (
    <div>
    <h1>Available Podcasts</h1>
    
    {/* Filter Section */}
    <div>
      <label htmlFor="genre">Filter by Genre:</label>
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.name}>
            {genre.name}
          </option>
        ))}
      </select>
      </div>

      {filteredPodcasts.map((podcast) => (
        <div key={podcast.id}>
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <Link to ={`/podcasts/${podcast.id}`}>View Details</Link>

        </div>
      ))}
    </div>
  );
}

export default PodcastList;
