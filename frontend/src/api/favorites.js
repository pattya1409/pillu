import { api } from './client';

export const getFavorites = async () => {
  const { data } = await api.get('/user/favorites');
  return data;
};

export const addFavorite = async (movie) => {
  const { data } = await api.post('/user/favorites', {
    imdbID: movie.imdbID,
    title: movie.Title,
    poster: movie.Poster,
    year: movie.Year,
  });
  return data;
};

export const removeFavorite = async (imdbID) => {
  const { data } = await api.delete(`/user/favorites/${imdbID}`);
  return data;
};
