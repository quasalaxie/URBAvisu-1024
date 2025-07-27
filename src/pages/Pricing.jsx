import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Pricing = () => {
  const navigate = useNavigate();
  const { currentUser, updatePlan } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 8.99,
      features: {
        videoQuality: '480p (SD)',
        resolution: 'Standard Definition',
        devices: 1,
        simultaneousStreams: 1,
        downloads: false,
        offline: false,
        ads: true,
        skip: false,
        profiles: 1,
        cancel: true,
      }
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 13.99,
      popular: true,
      features: {
        videoQuality: '1080p (HD)',
        resolution: 'High Definition',
        devices: 2,
        simultaneousStreams: 2,
        downloads: true,
        offline: true,
        ads: false,
        skip: true,
        profiles: 2,
        cancel: true,
      }
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 17.99,
      features: {
        videoQuality: '4K + HDR',
        resolution: 'Ultra HD',
        devices: 4,
        simultaneousStreams: 4,
        downloads: true,
        offline: true,
        ads: false,
        skip: true,
        profiles: 4,
        cancel: true,
      }
    }
  ];

  const features = [
    { name: 'Video Quality', key: 'videoQuality', info: 'Maximum video resolution available' },
    { name: 'Resolution', key: 'resolution', info: 'Picture quality and clarity' },
    { name: 'Supported Devices', key: 'devices', info: 'Number of registered devices' },
    { name: 'Simultaneous Streams', key: 'simultaneousStreams', info: 'Watch on multiple screens at once' },
    { name: 'Downloads', key: 'downloads', info: 'Download content for offline viewing', type: 'boolean' },
    { name: 'Offline Viewing', key: 'offline', info: 'Watch downloaded content without internet', type: 'boolean' },
    { name: 'Ad-Free', key: 'ads', info: 'No interruptions during playback', type: 'boolean', reverse: true },
    { name: 'Skip Intro', key: 'skip', info: 'Skip show intros and recaps', type: 'boolean' },
    { name: 'Profiles', key: 'profiles', info: 'Create separate profiles for family members' },
    { name: 'Cancel Anytime', key: 'cancel', info: 'No long-term contracts', type: 'boolean' }
  ];

  const handleSelectPlan = async (planId) => {
    if (!currentUser) {
      navigate('/signup');
    } else {
      await updatePlan(planId);
      navigate('/account/settings');
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Perfect Plan
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Watch unlimited movies, TV shows, and documentaries on any device. 
            Change or cancel your plan anytime.
          </p>
        </motion.div>

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative bg-gray-850 rounded-2xl overflow-hidden ${
                plan.popular ? 'border-2 border-primary ring-2 ring-primary/20' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`w-full py-4 rounded-lg transition-colors ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  {currentUser ? 'Switch Plan' : 'Start Free Trial'}
                </button>
              </div>
              <div className="p-8 bg-gray-900/50">
                <h4 className="font-semibold mb-4">Plan Features:</h4>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <FaCheck className="text-green-500 mr-2" />
                    Watch on {plan.features.devices} {plan.features.devices === 1 ? 'device' : 'devices'}
                  </li>
                  <li className="flex items-center text-sm">
                    <FaCheck className="text-green-500 mr-2" />
                    {plan.features.videoQuality} video quality
                  </li>
                  {plan.features.downloads && (
                    <li className="flex items-center text-sm">
                      <FaCheck className="text-green-500 mr-2" />
                      Download for offline viewing
                    </li>
                  )}
                  {!plan.features.ads && (
                    <li className="flex items-center text-sm">
                      <FaCheck className="text-green-500 mr-2" />
                      Ad-free streaming
                    </li>
                  )}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-gray-850 rounded-2xl overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Compare All Plans</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-4 pl-4">Features</th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className={`text-center py-4 px-6 ${
                          plan.popular ? 'text-primary' : ''
                        }`}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature) => (
                    <tr
                      key={feature.key}
                      className="border-b border-gray-700/50 hover:bg-gray-800/50"
                    >
                      <td className="py-4 pl-4 flex items-center">
                        {feature.name}
                        <div className="group relative ml-2">
                          <FaInfoCircle className="text-gray-400 hover:text-gray-300" />
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-48 p-2 bg-gray-900 rounded-lg text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            {feature.info}
                          </div>
                        </div>
                      </td>
                      {plans.map((plan) => (
                        <td key={`${plan.id}-${feature.key}`} className="text-center py-4 px-6">
                          {feature.type === 'boolean' ? (
                            feature.reverse ? (
                              !plan.features[feature.key] ? (
                                <FaCheck className="mx-auto text-green-500" />
                              ) : (
                                <FaTimes className="mx-auto text-red-500" />
                              )
                            ) : (
                              plan.features[feature.key] ? (
                                <FaCheck className="mx-auto text-green-500" />
                              ) : (
                                <FaTimes className="mx-auto text-red-500" />
                              )
                            )
                          ) : (
                            plan.features[feature.key]
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 mb-8">
            Have more questions? Visit our <a href="#" className="text-primary hover:text-primary/90">Help Center</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;