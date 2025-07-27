import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSearch, FaHeadset, FaEnvelope, FaPhone, FaBug } from 'react-icons/fa';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'account',
      title: 'Account & Billing',
      icon: FaHeadset,
      faqs: [
        {
          question: 'How do I change my subscription plan?',
          answer: 'You can change your subscription plan by going to Account Settings > Subscription. Choose your new plan and follow the instructions to update your subscription.'
        },
        {
          question: 'When will I be billed?',
          answer: 'You\'ll be billed on the same date each month. The exact date depends on when you started your subscription.'
        },
        {
          question: 'How do I update my payment information?',
          answer: 'Go to Account Settings > Billing and select "Update Payment Method" to change your payment information.'
        }
      ]
    },
    {
      id: 'streaming',
      title: 'Streaming & Playback',
      icon: FaBug,
      faqs: [
        {
          question: 'Why is my video buffering?',
          answer: 'Buffering can be caused by slow internet connection, network congestion, or device issues. Try reducing video quality or checking your internet connection.'
        },
        {
          question: 'What internet speed do I need?',
          answer: 'We recommend at least 5 Mbps for HD streaming and 25 Mbps for 4K streaming. Test your connection speed to ensure optimal playback.'
        },
        {
          question: 'How do I fix audio sync issues?',
          answer: 'Try refreshing the page, clearing your browser cache, or restarting your device. If issues persist, contact support.'
        }
      ]
    },
    {
      id: 'devices',
      title: 'Devices & Apps',
      icon: FaPhone,
      faqs: [
        {
          question: 'Which devices are supported?',
          answer: 'StreamFlix works on most modern web browsers, smart TVs, gaming consoles, mobile devices, and streaming devices like Roku and Fire TV.'
        },
        {
          question: 'How many devices can I use?',
          answer: 'The number of simultaneous devices depends on your subscription plan. Basic allows 1 device, Standard allows 2, and Premium allows 4.'
        },
        {
          question: 'How do I download content for offline viewing?',
          answer: 'Look for the download icon next to eligible titles. Downloads are available on mobile devices and tablets with our app installed.'
        }
      ]
    }
  ];

  const filteredCategories = searchQuery
    ? categories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : categories;

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">How can we help?</h1>
          <div className="relative max-w-2xl mx-auto">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-12 pr-4 py-3 bg-gray-850 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-850 p-6 rounded-xl"
          >
            <FaHeadset className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat Support</h3>
            <p className="text-gray-400 mb-4">Get instant help from our support team</p>
            <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Start Chat
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-850 p-6 rounded-xl"
          >
            <FaEnvelope className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-400 mb-4">Response within 24 hours</p>
            <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Send Email
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-850 p-6 rounded-xl"
          >
            <FaPhone className="text-4xl text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-400 mb-4">Available 24/7</p>
            <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Call Now
            </button>
          </motion.div>
        </div>

        <div className="space-y-6">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.id}
              initial={false}
              className="bg-gray-850 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className="w-full flex items-center justify-between p-6"
              >
                <div className="flex items-center">
                  <category.icon className="text-2xl text-primary mr-4" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <FaChevronDown
                  className={`transform transition-transform ${
                    selectedCategory === category.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {selectedCategory === category.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 space-y-4">
                      {category.faqs.map((faq, index) => (
                        <div key={index} className="border-t border-gray-700 pt-4">
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-gray-400">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-850 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
          <p className="text-gray-400 mb-6">
            Our support team is available 24/7 to assist you with any questions or concerns.
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;