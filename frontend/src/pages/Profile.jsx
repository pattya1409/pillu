import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFavorites, removeFavorite } from '../api/favorites';
import { useAuth } from '../context/AuthContext';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Profile = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await getFavorites();
      setFavorites(res.data || []);
    } catch (err) {
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (imdbID) => {
    try {
      const res = await removeFavorite(imdbID);
      setFavorites(res.data || []);
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome, {user?.name}
        </h1>
        <p className="text-netflix-gray-light mb-8">{user?.email}</p>

        <h2 className="text-xl font-semibold text-white mb-6">My List</h2>

        {loading ? (
          <LoadingSpinner />
        ) : favorites.length === 0 ? (
          <div className="text-center py-16 bg-netflix-dark/50 rounded-lg border border-netflix-gray/20">
            <p className="text-netflix-gray-light mb-4">
              You haven't added any movies to your list yet.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-netflix-red hover:bg-red-600 rounded-md text-white font-medium transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.imdbID || movie.imdbId}
                movie={{
                  ...movie,
                  Poster: movie.poster,
                  Title: movie.title,
                  Year: movie.year,
                  imdbID: movie.imdbID || movie.imdbId,
                }}
                showAddToFavorites={true}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorite={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
