import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/movies';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../context/AuthContext';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchMovies = async () => {
    if (!query.trim()) {
      setMovies([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await searchMovies(query);
      setMovies(res.data?.movies || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await getFavorites();
      setFavorites(res.data || []);
    } catch {
      setFavorites([]);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [query]);

  useEffect(() => {
    fetchFavorites();
  }, [isAuthenticated]);

  const handleAddFavorite = async (movie) => {
    if (!isAuthenticated) return;
    try {
      const res = await addFavorite(movie);
      setFavorites(res.data || []);
    } catch (err) {
      console.error('Failed to add favorite:', err);
    }
  };

  const handleRemoveFavorite = async (imdbID) => {
    try {
      const res = await removeFavorite(imdbID);
      setFavorites(res.data || []);
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        Search Results{query ? ` for "${query}"` : ''}
      </h1>

      {error ? (
        <ErrorMessage message={error} onRetry={fetchMovies} />
      ) : !query.trim() ? (
        <p className="text-netflix-gray-light">Enter a search term to find movies.</p>
      ) : movies.length === 0 ? (
        <p className="text-netflix-gray-light">No movies found for "{query}".</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              showAddToFavorites={isAuthenticated}
              onAddFavorite={handleAddFavorite}
              onRemoveFavorite={handleRemoveFavorite}
              isFavorite={favorites.some(
                (f) => (f.imdbID || f.imdbId) === movie.imdbID
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
