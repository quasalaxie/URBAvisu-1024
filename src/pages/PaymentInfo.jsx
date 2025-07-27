import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaApplePay, FaGooglePay, FaLock } from 'react-icons/fa';

const PaymentInfo = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/profile/select');
  };

  const paymentMethods = [
    { id: 'credit-card', name: 'Credit Card', icon: FaCreditCard },
    { id: 'paypal', name: 'PayPal', icon: FaPaypal },
    { id: 'apple-pay', name: 'Apple Pay', icon: FaApplePay },
    { id: 'google-pay', name: 'Google Pay', icon: FaGooglePay },
  ];

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Set up your payment</h1>
          <p className="text-xl text-gray-400">
            Your membership starts as soon as you set up payment
          </p>
        </motion.div>

        <div className="bg-gray-850 rounded-2xl p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`flex items-center justify-center p-4 rounded-lg border-2 transition-colors ${
                  paymentMethod === method.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <method.icon className="text-2xl mr-2" />
                <span>{method.name}</span>
              </button>
            ))}
          </div>

          {paymentMethod === 'credit-card' && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <FaCreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Security Code
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Start Membership'}
              </button>
            </motion.form>
          )}

          <div className="mt-6 text-center text-sm text-gray-400">
            <p className="flex items-center justify-center">
              <FaLock className="mr-2" />
              Your payment is secured with SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;