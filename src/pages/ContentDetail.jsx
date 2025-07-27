import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlay, FaStar, FaCalendar, FaClock, FaClosedCaptioning, FaVolumeUp, FaGlobe, FaShare, FaDownload, FaExclamationTriangle } from 'react-icons/fa';
import { MOVIES, TV_SHOWS } from '../data/mockData';
import VideoPlayer from '../components/VideoPlayer';
import WatchlistButton from '../components/WatchlistButton';
import ContentRow from '../components/ContentRow';
import ReportIssue from '../components/ReportIssue';

const ContentDetail = ({ type }) => {
  const { id } = useParams();
  const [showPlayer, setShowPlayer] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const content = type === 'movies' 
    ? MOVIES.find(m => m.id === parseInt(id))
    : TV_SHOWS.find(s => s.id === parseInt(id));

  if (!content) {
    return <div className="text-white">Content not found</div>;
  }

  // Get similar content based on genre
  const similarContent = [...MOVIES, ...TV_SHOWS]
    .filter(item => item.id !== content.id && item.genre.some(g => content.genre.includes(g)))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-dark">
      {showPlayer ? (
        <div className="fixed inset-0 z-50 bg-black">
          <VideoPlayer
            videoUrl={content.videoUrl}
            subtitles={content.subtitles}
            onClose={() => setShowPlayer(false)}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Banner */}
          <div className="relative h-[70vh] w-full">
            <div className="absolute inset-0">
              <img src={content.image} alt={content.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold mb-4 text-white">{content.title}</h1>
                <div className="flex items-center space-x-4 text-sm mb-6 text-white">
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
                <p className="text-white text-lg mb-8 max-w-3xl">
                  {content.description}
                </p>
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPlayer(true)}
                    className="flex items-center px-8 py-3 bg-primary rounded-lg hover:bg-primary/90 transition-colors text-white"
                  >
                    <FaPlay className="mr-2" />
                    Play Now
                  </motion.button>
                  <WatchlistButton content={content} />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-6 py-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-white"
                  >
                    <FaDownload className="mr-2" />
                    Download
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center px-6 py-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-white"
                  >
                    <FaShare className="mr-2" />
                    Share
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowReportModal(true)}
                    className="flex items-center px-6 py-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors backdrop-blur-sm text-white"
                  >
                    <FaExclamationTriangle className="mr-2" />
                    Report
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Overview */}
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-white">Overview</h2>
                  <p className="text-white leading-relaxed">{content.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                    <div className="bg-gray-850 p-4 rounded-lg">
                      <FaStar className="text-yellow-400 mb-2" />
                      <div className="text-sm text-white">Rating</div>
                      <div className="font-bold text-white">{content.rating}/10</div>
                    </div>
                    <div className="bg-gray-850 p-4 rounded-lg">
                      <FaCalendar className="text-primary mb-2" />
                      <div className="text-sm text-white">Release Year</div>
                      <div className="font-bold text-white">{content.year}</div>
                    </div>
                    <div className="bg-gray-850 p-4 rounded-lg">
                      <FaClock className="text-primary mb-2" />
                      <div className="text-sm text-white">Duration</div>
                      <div className="font-bold text-white">
                        {content.duration || `${content.seasons} Seasons`}
                      </div>
                    </div>
                    <div className="bg-gray-850 p-4 rounded-lg">
                      <FaGlobe className="text-primary mb-2" />
                      <div className="text-sm text-white">Languages</div>
                      <div className="font-bold text-white">Multiple</div>
                    </div>
                  </div>
                </section>

                {/* Available Features */}
                <section className="bg-gray-850 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 text-white">Available Features</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-white">
                      <FaClosedCaptioning className="text-primary" />
                      <span>Subtitles</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <FaVolumeUp className="text-primary" />
                      <span>5.1 Audio</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white">
                      <FaDownload className="text-primary" />
                      <span>Available Offline</span>
                    </div>
                  </div>
                </section>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-gray-850 rounded-lg p-6">
                  <h3 className="text-lg font-bold mb-4 text-white">More Info</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Genre</span>
                      <span>{content.genre.join(', ')}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span>Rating</span>
                      <span>{content.maturityRating}</span>
                    </div>
                    {content.director && (
                      <div className="flex justify-between text-white">
                        <span>Director</span>
                        <span>{content.director}</span>
                      </div>
                    )}
                    {content.creator && (
                      <div className="flex justify-between text-white">
                        <span>Creator</span>
                        <span>{content.creator}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* More Like This */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-white">More Like This</h2>
              <ContentRow items={similarContent} type={type} />
            </section>
          </div>

          {/* Report Issue Modal */}
          <ReportIssue
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            contentTitle={content.title}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ContentDetail;