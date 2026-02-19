import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieById } from '../api/movies';
import { addFavorite, removeFavorite, getFavorites } from '../api/favorites';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../context/AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const fetchMovie = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMovieById(id);
      setMovie(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Movie not found');
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (!isAuthenticated) return;
    try {
      const res = await getFavorites();
      const found = (res.data || []).some(
        (f) => (f.imdbID || f.imdbId) === id
      );
      setIsFavorite(found);
    } catch {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  useEffect(() => {
    checkFavorite();
  }, [id, isAuthenticated]);

  const handleToggleFavorite = async () => {
    if (!isAuthenticated) return;
    setFavoriteLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(id);
        setIsFavorite(false);
      } else {
        await addFavorite(movie);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error('Failed to update favorite:', err);
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchMovie} />;
  if (!movie) return null;

  const poster =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : 'https://via.placeholder.com/300x450/333/666?text=No+Image';

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div
          className="absolute inset-0 h-[60vh] min-h-[400px] bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-netflix-black/80 to-transparent" />
      </div>

      <div className="relative -mt-[40vh] px-4 sm:px-8 lg:px-16 pb-16">
        <div className="flex flex-col md:flex-row gap-8 max-w-6xl">
          <div className="flex-shrink-0">
            <img
              src={poster}
              alt={movie.Title}
              className="w-48 sm:w-64 rounded-lg shadow-2xl"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {movie.Title}
            </h1>
            <div className="flex flex-wrap gap-4 text-netflix-gray-light mb-6">
              {movie.Year && <span>{movie.Year}</span>}
              {movie.Rated && <span>{movie.Rated}</span>}
              {movie.Runtime && <span>{movie.Runtime}</span>}
              {movie.Genre && <span>{movie.Genre}</span>}
            </div>
            {isAuthenticated && (
              <button
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
                className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors mb-6 ${
                  isFavorite
                    ? 'bg-netflix-red text-white'
                    : 'bg-netflix-gray/30 text-white hover:bg-netflix-gray/50'
                }`}
              >
                {favoriteLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isFavorite ? (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    In My List
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to My List
                  </>
                )}
              </button>
            )}
            {movie.Plot && movie.Plot !== 'N/A' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Plot</h3>
                <p className="text-netflix-gray-light leading-relaxed">
                  {movie.Plot}
                </p>
              </div>
            )}
            {movie.Actors && movie.Actors !== 'N/A' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Cast</h3>
                <p className="text-netflix-gray-light">{movie.Actors}</p>
              </div>
            )}
            {movie.Director && movie.Director !== 'N/A' && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Director</h3>
                <p className="text-netflix-gray-light">{movie.Director}</p>
              </div>
            )}
            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-bold">
                  IMDb {movie.imdbRating}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
