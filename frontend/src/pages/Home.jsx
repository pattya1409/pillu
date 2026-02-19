import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../api/movies';
import { getFavorites, addFavorite, removeFavorite } from '../api/favorites';
import MovieRow from '../components/MovieRow';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTrendingMovies();
      setMovies(res.data?.movies || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load movies');
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
  }, []);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchMovies} />;
  }

  return (
    <div className="pb-20">
      <div className="relative h-[70vh] min-h-[400px] mb-8">
        {movies[0] && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  movies[0].Poster && movies[0].Poster !== 'N/A'
                    ? movies[0].Poster
                    : 'https://via.placeholder.com/1920x1080/333/666?text=Featured'
                })`,
              }}
            />
            <div className="absolute inset-0 bg-hero-gradient" />
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {movies[0].Title}
              </h1>
              <p className="text-lg text-netflix-gray-light max-w-xl mb-6">
                {movies[0].Year} • Explore more movies
              </p>
              <a
                href={`/movie/${movies[0].imdbID}`}
                className="inline-flex items-center gap-2 px-8 py-3 bg-netflix-red hover:bg-red-600 rounded-md text-white font-semibold transition-colors"
              >
                Watch Now
              </a>
            </div>
          </>
        )}
      </div>

      <div className="space-y-2">
        {isAuthenticated && favorites.length > 0 && (
          <MovieRow
            title="My List"
            movies={favorites}
            showAddToFavorites={true}
            onAddFavorite={handleAddFavorite}
            onRemoveFavorite={handleRemoveFavorite}
            favorites={favorites}
          />
        )}
        <MovieRow
          title="Trending Now"
          movies={movies}
          showAddToFavorites={isAuthenticated}
          onAddFavorite={handleAddFavorite}
          onRemoveFavorite={handleRemoveFavorite}
          favorites={favorites}
        />
      </div>
    </div>
  );
};

export default Home;
