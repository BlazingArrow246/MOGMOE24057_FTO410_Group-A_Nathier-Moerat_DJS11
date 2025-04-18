
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import usePagination from "./usePagination";

function PodcastList() {
  const [podcasts, setPodcasts] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const PODCASTS_PER_PAGE = 10;

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app`)
      .then((response) =>
      {if (!response.ok){
        throw new Error (`HTTP error! status: ${response.status}`);
      }
        return response.json();
    })
      .then((data) => setPodcasts(data))
      .catch((error) => console.error("Error fetching podcasts:", error));
  }, []);

   // Fetch all genres
   useEffect(() => {
    fetch("https://podcast-api.netlify.app/genres")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => setGenres(data))
    .catch((error) => console.error("Error fetching genres:", error));
  
  }, []);

  // Handle genre selection
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  // Filter podcasts based on selected genre
  const filteredPodcasts = selectedGenre
    ? podcasts.filter((podcast) => podcast.genre === parseInt(selectedGenre))
    : podcasts;

    const { paginatedItems, loadMore, hasMore } = usePagination(filteredPodcasts, PODCASTS_PER_PAGE);


  return (
    <div>
    <h1>The Lounge</h1>
    
    {/* Filter Section */}
    <div>
      <label htmlFor="genre">Filter by Genre:</label>
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
      </div>

      {paginatedItems.map((podcast) => (
        <div key={podcast.id}style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", margin: "10px 0" }}> 
          <img
          src={podcast.image}
          alt={podcast.title}
          style={{ width: "200px", height: "auto", borderRadius: "8px", marginBottom: "10px" }}
          />
          <h2>{podcast.title}</h2>
          <p>{podcast.description}</p>
          <Link to ={`/podcasts/${podcast.id}`}>View Details</Link>

        </div>
      ))}
      {/* Load More Button */}
      {hasMore && (
        <button
          onClick={loadMore}
          style={{
            borderRadius: "8px",
            border: "1px solid transparent",
            padding: "0.6em 1.2em",
            fontSize: "1em",
            fontWeight: "500",
            backgroundColor: "#646cff",
            color: "white",
            cursor: "pointer",
            transition: "background-color 0.25s",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};


export default PodcastList;
