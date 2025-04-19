// src/utils/LocalStFavorites.js

export const getFavorites = () => {
  const favoritesString = localStorage.getItem('favoritePodcasts');
  return favoritesString ? JSON.parse(favoritesString) : [];
};

// src/utils/LocalStFavorites.js

export const addToFavorites = (item) => {
  const favorites = getFavorites();
  const existingFavorite = favorites.find(fav => fav.id === item.id && fav.type === item.type);

  if (!existingFavorite) {
    favorites.push({ ...item, favoritedAt: new Date().toISOString() }); // Use the item object
    localStorage.setItem('favoritePodcasts', JSON.stringify(favorites));
  }
};

export const removeFromFavorites = (id, type) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(item => !(item.id === id && item.type === type));
  localStorage.setItem('favoritePodcasts', JSON.stringify(updatedFavorites));
};

export const isFavorite = (id, type) => {
  const favorites = getFavorites();
  return favorites.some(item => item.id === id && item.type === type);
};