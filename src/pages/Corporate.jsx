import { motion } from 'framer-motion';
import { FaBuilding, FaChartLine, FaUsers, FaGlobe } from 'react-icons/fa';

const Corporate = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <FaBuilding className="text-4xl text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Corporate Information</h1>
          <p className="text-gray-400">Learn more about StreamFlix as a company</p>
        </motion.div>

        <div className="space-y-8">
          <section className="bg-gray-850 rounded-xl p-8">
            <FaChartLine className="text-3xl text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Company Overview</h2>
            <p className="text-gray-300">
              StreamFlix is a leading streaming service that offers a wide variety of award-winning content. Our mission is to entertain the world through innovative storytelling.
            </p>
          </section>

          <section className="bg-gray-850 rounded-xl p-8">
            <FaUsers className="text-3xl text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Leadership</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-2">Board of Directors</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>John Smith - Chairman</li>
                  <li>Sarah Johnson - CEO</li>
                  <li>Michael Chen - CFO</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">Executive Team</h3>
                <ul className="text-gray-300 space-y-2">
                  <li>David Wilson - CTO</li>
                  <li>Emma Brown - COO</li>
                  <li>Robert Taylor - CCO</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gray-850 rounded-xl p-8">
            <FaGlobe className="text-3xl text-primary mb-4" />
            <h2 className="text-2xl font-bold mb-4">Global Presence</h2>
            <div className="text-gray-300">
              <p className="mb-4">Headquartered in Los Angeles, California with offices worldwide:</p>
              <ul className="grid md:grid-cols-2 gap-4">
                <li>North America: Los Angeles, New York</li>
                <li>Europe: London, Amsterdam</li>
                <li>Asia Pacific: Tokyo, Singapore</li>
                <li>Latin America: São Paulo, Mexico City</li>
              </ul>
            </div>
          </section>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-gray-850 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">190+</h3>
              <p className="text-gray-300">Countries Served</p>
            </div>
            <div className="bg-gray-850 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">50M+</h3>
              <p className="text-gray-300">Subscribers</p>
            </div>
            <div className="bg-gray-850 rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-primary mb-2">10K+</h3>
              <p className="text-gray-300">Employees</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Investor Relations</h2>
          <p className="text-gray-400 mb-6">
            For investor information and financial reports, visit our Investor Relations portal.
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Investor Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Corporate;