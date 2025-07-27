import { motion } from 'framer-motion';
import { FaPlay, FaStar, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import WatchlistButton from './WatchlistButton';

const ContentRow = ({ title, items, type = 'movies' }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={`/${type}/${item.id}`}>
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x750?text=Image+Not+Found';
                }}
              />
              {item.progress && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-medium mb-1 text-white">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-sm mb-2 text-white">
                    <span className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {item.rating}
                    </span>
                    <span>•</span>
                    <span>{item.year}</span>
                    <span>•</span>
                    <span>{item.duration || `${item.seasons} Seasons`}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.genre.slice(0, 3).map((genre, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white/20 px-2 py-1 rounded text-white"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-white line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors">
                      <FaPlay className="mr-2" />
                      Play
                    </button>
                    <WatchlistButton content={item} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ContentRow;