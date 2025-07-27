import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const PlanSelection = () => {
  const { updatePlan, loading } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 8.99,
      features: {
        quality: '480p',
        devices: 1,
        downloads: false,
        ads: true,
        offline: false,
      }
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 13.99,
      features: {
        quality: '1080p',
        devices: 2,
        downloads: true,
        ads: false,
        offline: true,
      },
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 17.99,
      features: {
        quality: '4K+HDR',
        devices: 4,
        downloads: true,
        ads: false,
        offline: true,
      }
    }
  ];

  const features = [
    { name: 'Video quality', key: 'quality' },
    { name: 'Simultaneous devices', key: 'devices' },
    { name: 'Downloads', key: 'downloads' },
    { name: 'Ad-free viewing', key: 'ads', reverse: true },
    { name: 'Offline viewing', key: 'offline' }
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Choose your plan</h1>
          <p className="text-xl text-gray-400">
            Flexible plans for every viewer
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative bg-gray-850 rounded-2xl overflow-hidden ${
                plan.popular ? 'border-2 border-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <button
                  onClick={() => updatePlan(plan.id)}
                  disabled={loading}
                  className={`w-full py-3 rounded-lg transition-colors ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {loading ? 'Processing...' : 'Choose Plan'}
                </button>
              </div>
              <div className="px-6 pb-6">
                <div className="pt-6 border-t border-gray-700">
                  {features.map((feature) => (
                    <div
                      key={feature.key}
                      className="flex items-center justify-between py-2"
                    >
                      <span className="text-sm text-gray-400">{feature.name}</span>
                      {typeof plan.features[feature.key] === 'boolean' ? (
                        feature.reverse ? (
                          !plan.features[feature.key] ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-red-500" />
                          )
                        ) : (
                          plan.features[feature.key] ? (
                            <FaCheck className="text-green-500" />
                          ) : (
                            <FaTimes className="text-red-500" />
                          )
                        )
                      ) : (
                        <span>{plan.features[feature.key]}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center text-gray-400">
          <p className="mb-4">
            Prices may vary depending on your location and current promotions.
          </p>
          <p>
            All plans include access to our entire library of movies and TV shows.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanSelection;