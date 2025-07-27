import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaBug, FaExclamationTriangle } from 'react-icons/fa';

const ReportIssue = ({ isOpen, onClose, contentTitle }) => {
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle issue submission
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setIssueType('');
      setDescription('');
    }, 2000);
  };

  const issueTypes = [
    { id: 'playback', label: 'Playback Issues', icon: FaBug },
    { id: 'quality', label: 'Video Quality', icon: FaBug },
    { id: 'audio', label: 'Audio Problems', icon: FaBug },
    { id: 'subtitles', label: 'Subtitle Issues', icon: FaBug },
    { id: 'content', label: 'Content Problems', icon: FaExclamationTriangle },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-850 rounded-xl w-full max-w-lg"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold">Report an Issue</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Content Title</h3>
                  <p className="text-gray-400">{contentTitle}</p>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Issue Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {issueTypes.map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setIssueType(type.id)}
                        className={`flex items-center p-3 rounded-lg border-2 transition-colors ${
                          issueType === type.id
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <type.icon className="mr-2" />
                        <span>{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue you're experiencing..."
                    className="w-full h-32 px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2 mr-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 text-center">
                <FaExclamationTriangle className="text-4xl text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Report Submitted</h3>
                <p className="text-gray-400">
                  Thank you for your report. We'll look into this issue right away.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReportIssue;