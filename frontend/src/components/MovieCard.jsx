import { Link } from 'react-router-dom';

const MovieCard = ({ movie, showAddToFavorites = false, onAddFavorite, onRemoveFavorite, isFavorite = false }) => {
  const poster = movie.Poster && movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/333/666?text=No+Image';
  const title = movie.Title || movie.title || 'Unknown';
  const year = movie.Year || movie.year || '';
  const id = movie.imdbID || movie.imdbId;

  return (
    <div className="group relative flex-shrink-0 w-40 sm:w-48">
      <Link to={`/movie/${id}`}>
        <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-netflix-dark">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="mt-2">
        <Link to={`/movie/${id}`}>
          <h3 className="text-sm font-medium text-white truncate hover:text-netflix-red transition-colors">
            {title}
          </h3>
        </Link>
        {year && (
          <p className="text-xs text-netflix-gray mt-0.5">{year}</p>
        )}
      </div>
      {showAddToFavorites && onAddFavorite && (
        <button
          onClick={(e) => {
            e.preventDefault();
            isFavorite ? onRemoveFavorite?.(id) : onAddFavorite(movie);
          }}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-10 ${
            isFavorite
              ? 'bg-netflix-red text-white'
              : 'bg-black/60 text-white hover:bg-netflix-red'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default MovieCard;
