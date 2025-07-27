import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaPlay } from 'react-icons/fa';

const ContentGrid = ({ items, type }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Link to={`/${type}/${item.id}`}>
            <div className="aspect-[2/3] rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/500x750?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold mb-1 text-white">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-white">
                    <span className="flex items-center">
                      <FaStar className="text-yellow-400 mr-1" />
                      {item.rating}
                    </span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <button className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-md transition-colors">
                      <FaPlay className="mr-2" />
                      Play
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
};

export default ContentGrid;