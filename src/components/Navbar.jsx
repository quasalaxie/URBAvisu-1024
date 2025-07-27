import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBell, FaUser, FaSignOutAlt, FaCog, FaChild } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { currentProfile } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setShowProfile(false);
  };

  const handleProfileToggle = () => {
    setShowProfile(!showProfile);
    setShowSearch(false);
  };

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/shows', label: 'TV Shows' },
    { path: '/my-list', label: 'My List' },
    { path: '/kids', label: 'Kids' },
  ];

  return (
    <motion.nav
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgb(0, 0, 0)' : 'transparent',
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">StreamFlix</h1>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm hover:text-primary transition-colors ${
                  location.pathname === item.path ? 'text-primary' : 'text-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={handleSearchToggle}
                className="p-2 hover:text-primary transition-colors"
              >
                <FaSearch className="h-5 w-5" />
              </button>

              <AnimatePresence>
                {showSearch && (
                  <motion.form
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '300px', opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    onSubmit={handleSearch}
                    className="absolute right-0 top-full mt-2"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search titles, people..."
                      className="w-full px-4 py-2 bg-gray-850 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <button className="p-2 hover:text-primary transition-colors">
              <FaBell className="h-5 w-5" />
            </button>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={handleProfileToggle}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={currentProfile?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </button>

              <AnimatePresence>
                {showProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-gray-850 rounded-lg shadow-lg overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-700">
                      <p className="font-medium">{currentProfile?.name || currentUser?.name}</p>
                      <p className="text-sm text-gray-400">{currentUser?.email}</p>
                    </div>
                    
                    <div className="py-1">
                      <Link
                        to="/profile/select"
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                      >
                        <FaUser className="mr-3" />
                        Switch Profile
                      </Link>
                      <Link
                        to="/account/settings"
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-700 transition-colors"
                      >
                        <FaCog className="mr-3" />
                        Account Settings
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:bg-gray-700 transition-colors"
                      >
                        <FaSignOutAlt className="mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-primary bg-gray-850'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-primary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;