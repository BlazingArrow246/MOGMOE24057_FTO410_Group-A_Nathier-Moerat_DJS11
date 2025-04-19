import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, removeFromFavorites } from '../utils/LocalStFavorites';
import './Styling/FavoritesPage.css';

function FavoritesPage() {
  const [favoritePodcasts, setFavoritePodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('A-Z');

  useEffect(() => {
    const favoritesWithTimestamp = getFavorites();
    const favoritePodcastDetails = favoritesWithTimestamp
      .filter((item) => item.type === 'podcast');
    const favoritePodcastIds = favoritePodcastDetails.map((item) => item.id);

    if (favoritePodcastIds.length > 0) {
      Promise.all(
        favoritePodcastIds.map(podcastId =>
          fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
            })
        )
      )
        .then((fetchedPodcasts) => {
          const podcastsWithTimestamp = fetchedPodcasts.map((podcast, index) => ({
            ...podcast,
            favoritedAt: favoritePodcastDetails[index].favoritedAt, // Match timestamp
          }));
          setFavoritePodcasts(podcastsWithTimestamp);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
          console.error("Error fetching favorite podcasts:", error);
        });
    } else {
      setFavoritePodcasts([]);
      setLoading(false);
    }
  }, []);

  const sortPodcasts = (podcastsToSort, order) => {
    return [...podcastsToSort].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (order === 'A-Z') {
        return titleA.localeCompare(titleB);
      } else if (order === 'Z-A') {
        return titleB.localeCompare(titleA);
      }
      return 0;
    });
  };

  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    setFavoritePodcasts(sortPodcasts(favoritePodcasts, newSortOrder));
  };

  const handleUnfavoriteClick = (podcast) => {
    removeFromFavorites(podcast.id, 'podcast');
    setFavoritePodcasts(getFavorites().filter(fav => fav.type === 'podcast'));
  };

  if (loading) {
    return <div className="favorites-container">Loading your favorite podcasts...</div>;
  }

  if (error) {
    return <div className="favorites-container error">Error loading favorite podcasts: {error.message}</div>;
  }

  if (favoritePodcasts.length === 0) {
    return <div className="favorites-container empty">You haven't favorited any podcasts yet!</div>;
  }

  const sortedFavoritePodcasts = sortPodcasts(favoritePodcasts, sortOrder);

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorite Podcasts</h1>

      {/* Sorting Controls */}
      <div className="sorting-controls">
        <label htmlFor="sortOrder">Sort By:</label>
        <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <ul className="favorites-list">
        {sortedFavoritePodcasts.map((podcast) => (
          <li key={podcast.id} className="favorite-item">
            <Link to={`/podcasts/${podcast.id}`} className="podcast-link">
              {podcast.title}
            </Link>
            {podcast.image && (
              <img
                src={podcast.image}
                alt={podcast.title}
                className="podcast-image"
              />
            )}
            <p className="favorited-at">
              Favorited on: {new Date(podcast.favoritedAt).toLocaleString()}
            </p>
            <button onClick={() => handleUnfavoriteClick(podcast)} className="unfavorite-button">💔 Unfavorite</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;