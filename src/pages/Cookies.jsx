import { motion } from 'framer-motion';
import { FaCookie, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const Cookies = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FaCookie className="text-4xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Cookie Preferences</h1>
          <p className="text-gray-400">Manage how we use cookies to improve your experience</p>
        </motion.div>

        <div className="space-y-8">
          <section className="bg-gray-850 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Essential Cookies</h2>
            <p className="text-gray-300 mb-4">
              These cookies are necessary for the website to function and cannot be switched off.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Always Active</span>
              <FaToggleOn className="text-primary text-2xl" />
            </div>
          </section>

          <section className="bg-gray-850 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Performance Cookies</h2>
            <p className="text-gray-300 mb-4">
              Help us improve our website by collecting anonymous information.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Your Choice</span>
              <FaToggleOff className="text-gray-400 text-2xl cursor-pointer hover:text-primary transition-colors" />
            </div>
          </section>

          <section className="bg-gray-850 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Functional Cookies</h2>
            <p className="text-gray-300 mb-4">
              Enable personalized features and remember your preferences.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Your Choice</span>
              <FaToggleOff className="text-gray-400 text-2xl cursor-pointer hover:text-primary transition-colors" />
            </div>
          </section>

          <section className="bg-gray-850 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Marketing Cookies</h2>
            <p className="text-gray-300 mb-4">
              Track your activity to deliver personalized advertisements.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Your Choice</span>
              <FaToggleOff className="text-gray-400 text-2xl cursor-pointer hover:text-primary transition-colors" />
            </div>
          </section>
        </div>

        <div className="mt-12 flex justify-center space-x-4">
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Save Preferences
          </button>
          <button className="px-8 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cookies;