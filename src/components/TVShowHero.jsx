import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaStar, FaPlus } from 'react-icons/fa';
import { TV_SHOWS } from '../data/mockData';
import WatchlistButton from './WatchlistButton';

const TVShowHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const featuredShows = TV_SHOWS.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % featuredShows.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, featuredShows.length]);

  return (
    <div 
      className="relative h-[80vh]"
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
          <div className="absolute inset-0">
            <img
              src={featuredShows[currentIndex].image}
              alt={featuredShows[currentIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl text-white"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4">
                  {featuredShows[currentIndex].title}
                </h1>
                
                <div className="flex items-center space-x-4 mb-4">
                  <span className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {featuredShows[currentIndex].rating}
                  </span>
                  <span>{featuredShows[currentIndex].year}</span>
                  <span>{featuredShows[currentIndex].seasons} Seasons</span>
                  <div className="flex items-center space-x-2">
                    {featuredShows[currentIndex].genre.map((g, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-white/20 px-2 py-1 rounded"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-gray-200 text-xl mb-8 line-clamp-3">
                  {featuredShows[currentIndex].description}
                </p>

                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-primary text-white rounded-lg font-medium flex items-center"
                  >
                    <FaPlay className="mr-2" /> Play Now
                  </motion.button>
                  <WatchlistButton content={featuredShows[currentIndex]} />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
        {featuredShows.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-primary' : 'bg-gray-400/50 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

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

export default TVShowHero;