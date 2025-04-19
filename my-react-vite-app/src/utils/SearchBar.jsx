// src/utils/filterPodcasts.js
import Fuse from 'fuse.js';

const filterPodcasts = (podcasts, selectedGenre, searchTerm) => {
  const genreFilteredPodcasts = podcasts.filter((podcast) => {
    return !selectedGenre || (podcast.genres && podcast.genres.includes(parseInt(selectedGenre)));
  });

  if (!searchTerm) {
    return genreFilteredPodcasts; // No search term, return only genre-filtered
  }

  const fuse = new Fuse(genreFilteredPodcasts, {
    keys: ['title'], // Search only in the 'title' property
    threshold: 0.6, // Adjust threshold for sensitivity (0.0 = exact match, 1.0 = anything matches)
  });

  const results = fuse.search(searchTerm);
  return results.map(result => result.item); // Extract the actual podcast objects
};

export default filterPodcasts;