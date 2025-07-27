import { motion } from 'framer-motion';
import { FaPlay, FaPlus, FaStar, FaShareAlt } from 'react-icons/fa';
import WatchlistButton from './WatchlistButton';

const ContentBanner = ({ content }) => {
  return (
    <div className="relative h-[70vh] w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={content.banner || content.image}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
      </div>

      {/* Content Info */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
          
          <div className="flex items-center space-x-4 text-sm mb-6">
            <span className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              {content.rating}
            </span>
            <span>{content.year}</span>
            <span>{content.maturityRating}</span>
            {content.duration && <span>{content.duration}</span>}
            {content.seasons && <span>{content.seasons} Seasons</span>}
            <span>{content.genre.join(' • ')}</span>
          </div>

          <p className="text-gray-300 text-lg mb-8 line-clamp-3">
            {content.description}
          </p>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-8 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              <FaPlay className="mr-2" />
              Play Now
            </motion.button>

            <WatchlistButton content={content} />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-gray-700/50 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm"
            >
              <FaShareAlt />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContentBanner;