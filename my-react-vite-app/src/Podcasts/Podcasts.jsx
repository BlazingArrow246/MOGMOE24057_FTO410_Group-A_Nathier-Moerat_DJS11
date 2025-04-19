
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import usePagination from "../utils/usePagination";
import genreMapping from '../utils/Genres';
import { addToFavorites, removeFromFavorites, isFavorite, getFavorites } from '../utils/LocalStFavorites'; // Import helper functions
import filterPodcasts from '../utils/SearchBar'; // Import the new filter function

function PodcastList() {
  const [podcasts, setPodcasts] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const PODCASTS_PER_PAGE = 10;
  const [sortOrder, setSortOrder] = useState("A-Z"); // Default sort order
  const [favorites, setFavorites] = useState(getFavorites()); // Initialize favorites from localStorage
  const [searchTerm, setSearchTerm] = useState("");

// Convert genreMapping object into an array for the dropdown
const genreOptions = Object.entries(genreMapping).map(([id, name]) => ({
  id: parseInt(id),
  name: name,
}));

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


  // Handle genre selection
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

   // Handle sort order change
   const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };


  // Filter podcasts based on selected genre
  const filteredPodcasts = filterPodcasts(podcasts, selectedGenre, searchTerm);
   

    // Sort the filtered podcasts
  const sortedPodcasts = [...filteredPodcasts].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "Z-A") {
      return b.title.localeCompare(a.title);
    }
    return 0; // Default no sorting
  });

    const { paginatedItems, loadMore, hasMore } = usePagination(
      sortedPodcasts, 
      PODCASTS_PER_PAGE);

      const handleFavoriteClick = (podcast) => {
        const item = { id: podcast.id, type: 'podcast' };
        const isCurrentlyFavorite = isFavorite(item.id, item.type);

        if (isCurrentlyFavorite) {
          removeFromFavorites(item.id, item.type);
          setFavorites(getFavorites()); // Update local state
          
        } else {
          addToFavorites(item); // Let addToFavorites update localStorage
          setFavorites(getFavorites()); // Re-read from localStorage
        }
        
      }; 
      
      // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
    <h1>The Lounge</h1>
    
    {/* Filter Section */}
{/* Search Bar */}
<div>
      <label htmlFor="search">Search by Title:</label>
      <input
        type="text"
        id="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Enter podcast title"
      />
    </div>

    <div>
      <label htmlFor="genre">Filter by Genre:</label>
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">All Genres</option>
        {genreOptions.map((genre) => (
          <option key={genre.id} value={String(genre.id)}>
            {genre.name}
          </option>
        ))}
      </select>
      </div>

       {/* Sort Section */}
       <div>
          <label htmlFor="sortOrder">Sort by:</label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
      </div>

      {paginatedItems.map((podcast) => (
        <div key={podcast.id} style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", margin: "10px 0" }}>
          <img
            src={podcast.image}
            alt={podcast.title}
            style={{ width: "200px", height: "auto", borderRadius: "8px", marginBottom: "10px" }}
          />
          <h2>{podcast.title}</h2>
          {podcast.genres && podcast.genres[0] && (
            <p>Genre: {genreMapping[podcast.genres[0]] || "Unknown Genre"}</p>
          )}
          <p>{podcast.description}</p>
    <Link to={`/podcasts/${podcast.id}`}>View Details</Link>
    <button
      onClick={() => handleFavoriteClick(podcast)}
      style={{ marginLeft: 'auto', padding: '5px', cursor: 'pointer' }}
    >
      {favorites.some(fav => fav.id === podcast.id && fav.type === 'podcast') ? '❤️ Unfavorite' : '🤍 Favorite'}
    </button>
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
}


export default PodcastList;
