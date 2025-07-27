import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCreditCard, FaHistory, FaUserCircle } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const AccountSettings = () => {
  const { currentUser, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState('subscription');

  const subscriptionPlans = [
    { id: 'basic', name: 'Basic', price: 8.99, quality: '480p' },
    { id: 'standard', name: 'Standard', price: 13.99, quality: '1080p' },
    { id: 'premium', name: 'Premium', price: 17.99, quality: '4K+HDR' }
  ];

  const [selectedPlan, setSelectedPlan] = useState(currentUser?.subscription?.plan || 'standard');

  const handleUpdatePlan = (planId) => {
    setSelectedPlan(planId);
    updateUser({
      subscription: {
        plan: planId,
        nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    });
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Account Settings</h1>
        <div className="bg-gray-850 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-6 py-3 ${
                activeTab === 'subscription'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white'
              }`}
            >
              Subscription
            </button>
            <button
              onClick={() => setActiveTab('billing')}
              className={`px-6 py-3 ${
                activeTab === 'billing'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white'
              }`}
            >
              Billing
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 ${
                activeTab === 'history'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-white'
              }`}
            >
              History
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'subscription' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4 text-white">Choose your plan</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {subscriptionPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-6 rounded-lg border-2 ${
                        selectedPlan === plan.id ? 'border-primary' : 'border-gray-700'
                      } cursor-pointer hover:border-primary transition-colors`}
                      onClick={() => handleUpdatePlan(plan.id)}
                    >
                      <h3 className="text-lg font-semibold mb-2 text-white">{plan.name}</h3>
                      <p className="text-2xl font-bold mb-4 text-white">${plan.price}</p>
                      <p className="text-white">Video quality: {plan.quality}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                  Update Plan
                </button>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">Payment Methods</h2>
                  <button className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors text-white">
                    Add Payment Method
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FaCreditCard className="text-2xl text-white" />
                      <div>
                        <p className="font-medium text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-white">Expires 12/24</p>
                      </div>
                    </div>
                    <button className="text-sm text-white hover:text-primary">Edit</button>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4 text-white">Billing Information</h3>
                  <div className="p-4 bg-gray-700 rounded-lg">
                    <p className="text-sm text-white">Next billing date</p>
                    <p className="font-medium text-white">March 24, 2024</p>
                    <p className="mt-2 text-sm text-white">Amount</p>
                    <p className="font-medium text-white">$13.99</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4 text-white">Billing History</h2>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-white">Standard Plan</p>
                        <p className="text-sm text-white">
                          {new Date(
                            Date.now() - i * 30 * 24 * 60 * 60 * 1000
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="font-medium text-white">$13.99</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="mt-8 p-6 bg-red-900/20 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-white">Cancel Subscription</h3>
          <p className="text-white mb-4">
            If you cancel your subscription, you'll still have access to StreamFlix until the
            end of your billing period.
          </p>
          <button className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Cancel Subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;