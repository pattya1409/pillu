import { api } from './client';

export const getTrendingMovies = async () => {
  const { data } = await api.get('/movies/trending');
  return data;
};

export const searchMovies = async (title, page = 1) => {
  const { data } = await api.get('/movies/search', {
    params: { title, page },
  });
  return data;
};

export const getMovieById = async (id) => {
  const { data } = await api.get(`/movies/${id}`);
  return data;
};
