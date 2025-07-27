import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import { MOVIES, TV_SHOWS } from '../data/mockData';
import WatchlistButton from './WatchlistButton';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const featuredContent = [
    ...MOVIES.slice(0, 3),
    ...TV_SHOWS.slice(0, 2)
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, featuredContent.length]);

  const content = featuredContent[currentIndex];

  return (
    <div 
      className="relative min-h-[90vh]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={content.image}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl text-white"
              >
                {/* Title */}
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {content.title}
                </motion.h1>

                {/* Info Row */}
                <motion.div
                  className="flex items-center space-x-4 mb-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span>{content.year}</span>
                  <span>{content.maturityRating}</span>
                  <span>{content.duration || `${content.seasons} Seasons`}</span>
                  <div className="flex items-center space-x-2">
                    {content.genre.map((g, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-gray-800/60 px-2 py-1 rounded text-white"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-xl text-gray-200 mb-8 line-clamp-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {content.description}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary text-white rounded-lg font-medium text-lg flex items-center transition-colors"
                  >
                    <FaPlay className="mr-2" /> Play Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gray-700/50 text-white rounded-lg font-medium text-lg flex items-center backdrop-blur-sm transition-colors"
                  >
                    <FaInfoCircle className="mr-2" /> More Info
                  </motion.button>
                  <WatchlistButton content={content} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
        {featuredContent.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-primary' : 'bg-gray-400/50 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;