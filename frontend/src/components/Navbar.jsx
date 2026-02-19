import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-netflix-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-netflix-red font-bold text-2xl tracking-tight">
                NETFLIX
              </span>
            </Link>
            <div className="hidden md:flex gap-6">
              <Link
                to="/"
                className="text-netflix-gray-light hover:text-white transition-colors"
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  to="/profile"
                  className="text-netflix-gray-light hover:text-white transition-colors"
                >
                  My List
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-netflix-dark/80 border border-netflix-gray/50 rounded-md px-3 py-2 text-sm text-white placeholder-netflix-gray w-40 sm:w-56 focus:outline-none focus:border-netflix-red transition-colors"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-netflix-red hover:bg-red-600 rounded-md text-white text-sm font-medium transition-colors"
              >
                Search
              </button>
            </form>

            <div className="relative">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-netflix-dark transition-colors"
                  >
                    <div className="w-8 h-8 rounded-md bg-netflix-red flex items-center justify-center text-sm font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-sm">{user?.name}</span>
                  </button>
                  {showMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 py-2 bg-netflix-dark border border-netflix-gray/30 rounded-lg shadow-xl z-50">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-white hover:bg-netflix-gray/20"
                          onClick={() => setShowMenu(false)}
                        >
                          My Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-netflix-gray/20"
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-netflix-red hover:bg-red-600 rounded-md text-white text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
