import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiUser, FiMapPin, FiBuilding, FiArrowRight, FiX } = FiIcons;

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError(t('passwordTooShort'));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordMismatch'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { error } = await signUp(formData.email, formData.password, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        address: formData.address
      });
      
      if (error) throw error;
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">{t('signup')}</h2>
        </div>
        
        {error && (
          <div className="bg-black text-white p-3 rounded flex items-center">
            <SafeIcon icon={FiX} className="mr-2" />
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t('firstName')}
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiUser} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                {t('lastName')}
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiUser} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t('company')}
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiBuilding} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t('email')}
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiMail} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t('address')}
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiMapPin} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t('password')}
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiLock} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              {t('confirmPassword')}
            </label>
            <div className="relative">
              <SafeIcon 
                icon={FiLock} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
          >
            {t('signupButton')}
            <SafeIcon icon={FiArrowRight} className="ml-2" />
          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-600">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-700">
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;