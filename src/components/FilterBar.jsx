import { useState } from 'react';
import { FaFilter, FaSortAmountDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { GENRES } from '../data/mockData';

const FilterBar = ({ onFilterChange, onSortChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1900, 2024]);
  const [ratingRange, setRatingRange] = useState(0);

  const handleGenreToggle = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    onFilterChange({ genres: updatedGenres, year: yearRange, rating: ratingRange });
  };

  return (
    <div className="sticky top-16 z-40 bg-dark/95 backdrop-blur-sm py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-850 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FaFilter />
          <span>Filters</span>
        </button>
        
        <select
          onChange={(e) => onSortChange(e.target.value)}
          className="px-4 py-2 bg-gray-850 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <option value="latest">Latest</option>
          <option value="rating">Top Rated</option>
          <option value="title">A-Z</option>
        </select>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-4 space-y-4"
          >
            <div>
              <h3 className="text-sm font-medium mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {GENRES.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedGenres.includes(genre)
                        ? 'bg-primary text-white'
                        : 'bg-gray-850 hover:bg-gray-700'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Year Range</h3>
              <input
                type="range"
                min="1900"
                max="2024"
                value={yearRange[1]}
                onChange={(e) => {
                  const newRange = [1900, parseInt(e.target.value)];
                  setYearRange(newRange);
                  onFilterChange({ genres: selectedGenres, year: newRange, rating: ratingRange });
                }}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>1900</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Minimum Rating</h3>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={ratingRange}
                onChange={(e) => {
                  const newRating = parseFloat(e.target.value);
                  setRatingRange(newRating);
                  onFilterChange({ genres: selectedGenres, year: yearRange, rating: newRating });
                }}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>0</span>
                <span>{ratingRange.toFixed(1)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;