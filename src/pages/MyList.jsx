import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThList, FaGripHorizontal, FaTrash, FaPlay } from 'react-icons/fa';
import { useWatchlist } from '../context/WatchlistContext';
import { Link } from 'react-router-dom';

const MyList = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('dateAdded');

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const GridView = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {sortedWatchlist.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative group"
        >
          <Link to={`/${item.type}/${item.id}`}>
            <div className="aspect-[2/3] rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors">
                      <FaPlay className="h-4 w-4" />
                      <span>Play</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWatchlist(item.id);
                      }}
                      className="p-2 bg-gray-850 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );

  const ListView = () => (
    <div className="space-y-4">
      {sortedWatchlist.map((item) => (
        <motion.div
          key={item.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-gray-850 rounded-lg overflow-hidden"
        >
          <div className="flex items-center p-4">
            <Link to={`/${item.type}/${item.id}`} className="flex-1 flex items-center">
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-36 object-cover rounded-md"
              />
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="text-sm text-gray-400">
                  <p>{item.year} • {item.duration || `${item.seasons} Seasons`}</p>
                  <p className="mt-1">{item.genre.join(', ')}</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors">
                <FaPlay className="h-4 w-4" />
                <span>Play</span>
              </button>
              <button
                onClick={() => removeFromWatchlist(item.id)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              >
                <FaTrash className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <main className="pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My List</h1>
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-850 text-light px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="dateAdded">Date Added</option>
              <option value="title">Title</option>
              <option value="rating">Rating</option>
            </select>
            <div className="flex items-center bg-gray-850 rounded-md">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-400'}`}
              >
                <FaGripHorizontal className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-gray-400'}`}
              >
                <FaThList className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Your list is empty</h2>
            <p className="text-gray-400 mb-8">
              Add movies and TV shows to your list to keep track of what you want to watch.
            </p>
            <Link
              to="/movies"
              className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 rounded-md transition-colors"
            >
              Browse Movies
            </Link>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? <GridView /> : <ListView />}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
};

export default MyList;