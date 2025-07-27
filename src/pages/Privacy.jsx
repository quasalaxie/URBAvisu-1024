import { motion } from 'framer-motion';
import { FaUserShield, FaLock, FaShieldAlt } from 'react-icons/fa';

const Privacy = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FaUserShield className="text-4xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last Updated: March 2024</p>
        </motion.div>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (name, email, payment details)</li>
              <li>Viewing history and preferences</li>
              <li>Device information and IP address</li>
              <li>Usage statistics and interactions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our services</li>
              <li>Personalize your streaming experience</li>
              <li>Process payments and prevent fraud</li>
              <li>Communicate with you about our service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-white">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Object to data processing</li>
              <li>Data portability</li>
            </ul>
          </section>
        </div>

        <div className="mt-12 p-6 bg-gray-850 rounded-xl">
          <h3 className="text-xl font-bold mb-4 text-white">Privacy Concerns?</h3>
          <p className="text-gray-400 mb-6">
            If you have any questions about our Privacy Policy or how we handle your data, please contact our Privacy Team.
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Contact Privacy Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default Privacy;