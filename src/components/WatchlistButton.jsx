import { motion } from 'framer-motion';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { useWatchlist } from '../context/WatchlistContext';

const WatchlistButton = ({ content }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const inWatchlist = isInWatchlist(content.id);

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        if (inWatchlist) {
          removeFromWatchlist(content.id);
        } else {
          addToWatchlist({
            ...content,
            type: content.seasons ? 'shows' : 'movies'
          });
        }
      }}
      className={`p-3 rounded-full transition-colors ${
        inWatchlist ? 'bg-primary text-white' : 'bg-gray-850 hover:bg-gray-700'
      }`}
    >
      {inWatchlist ? <FaCheck className="h-4 w-4" /> : <FaPlus className="h-4 w-4" />}
    </motion.button>
  );
};

export default WatchlistButton;