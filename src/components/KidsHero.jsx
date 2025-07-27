import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaStar, FaInfoCircle } from 'react-icons/fa';
import WatchlistButton from './WatchlistButton';

const KidsHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const featuredContent = [
    {
      id: 1,
      title: "Moana",
      description: "An adventurous teenager sails out on a daring mission to save her people. During her journey, Moana meets the mighty demigod Maui, who guides her in her quest to become a master wayfinder.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkUkFrAsNqha8jJvlQ5Uq8XCGeFxK8jzQysQ&s",
      banner: "https://images.hdqwalls.com/wallpapers/moana-movie-poster-4k-bn.jpg",
      rating: 4.8,
      year: 2016,
      genre: ["Animation", "Adventure", "Family"],
      maturityRating: "PG"
    },
    {
      id: 2,
      title: "Frozen",
      description: "The story of two royal sisters, where one struggles with magical ice powers that threaten their kingdom.",
      image: "https://upload.wikimedia.org/wikipedia/en/0/05/Frozen_%282013_film%29_poster.jpg",
      banner: "https://images.alphacoders.com/498/498834.jpg",
      rating: 4.7,
      year: 2013,
      genre: ["Animation", "Musical", "Fantasy"],
      maturityRating: "PG"
    },
    {
      id: 3,
      title: "The Lion King",
      description: "A young lion prince overcomes tragedy to become the leader of his pride and homeland.",
      image: "https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_.jpg",
      banner: "https://images2.alphacoders.com/724/724132.jpg",
      rating: 4.9,
      year: 1994,
      genre: ["Animation", "Drama", "Adventure"],
      maturityRating: "G"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, featuredContent.length]);

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
              src={featuredContent[currentIndex].banner || featuredContent[currentIndex].image} 
              alt={featuredContent[currentIndex].title}
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
                  className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {featuredContent[currentIndex].title}
                </motion.h1>

                {/* Info Row */}
                <motion.div 
                  className="flex items-center space-x-4 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    {featuredContent[currentIndex].rating}
                  </span>
                  <span>{featuredContent[currentIndex].year}</span>
                  <span>{featuredContent[currentIndex].maturityRating}</span>
                  <div className="flex items-center space-x-2">
                    {featuredContent[currentIndex].genre.map((g, idx) => (
                      <span 
                        key={idx}
                        className="text-sm bg-gray-800/60 px-2 py-1 rounded"
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
                  {featuredContent[currentIndex].description}
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
                    className="px-8 py-4 bg-primary text-white rounded-lg font-medium text-lg flex items-center"
                  >
                    <FaPlay className="mr-2" /> Play Now
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gray-700/50 text-white rounded-lg font-medium text-lg flex items-center backdrop-blur-sm"
                  >
                    <FaInfoCircle className="mr-2" /> More Info
                  </motion.button>
                  <WatchlistButton content={featuredContent[currentIndex]} />
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

export default KidsHero;