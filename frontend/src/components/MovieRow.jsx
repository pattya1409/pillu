import { useRef } from 'react';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies, showAddToFavorites, onAddFavorite, onRemoveFavorite, favorites = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!movies?.length) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-netflix-dark/80 hover:bg-netflix-gray/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-netflix-dark/80 hover:bg-netflix-gray/30 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 px-4 sm:px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID || movie.imdbId}
            movie={movie}
            showAddToFavorites={showAddToFavorites}
            onAddFavorite={onAddFavorite}
            onRemoveFavorite={onRemoveFavorite}
            isFavorite={favorites.some(
              (f) => (f.imdbID || f.imdbId) === (movie.imdbID || movie.imdbId)
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
