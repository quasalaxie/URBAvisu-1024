import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import CreditBalance from './CreditBalance';
import OrderHistory from './OrderHistory';
import CreditHistory from './CreditHistory';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiUsers, FiShield } = FiIcons;

const Dashboard = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const isAdmin = userProfile?.role === 'admin' || userProfile?.role === 'super_admin';
  const isManager = userProfile?.role === 'manager' || isAdmin;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">
          {t('common.dashboard')}
        </h1>
        {userProfile && (
          <p className="text-gray-600 mt-2">
            {t('dashboard.welcome')}, {userProfile.first_name} {userProfile.last_name}
          </p>
        )}
      </div>

      {/* Admin/Manager Access */}
      {isAdmin && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-lg font-medium text-black mb-4">{t('dashboard.adminAccess')}</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/admin"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiShield} className="mr-2" />
              {t('admin.panel')}
            </Link>
            <Link
              to="/admin/users"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiUsers} className="mr-2" />
              {t('dashboard.userManagement')}
            </Link>
            <Link
              to="/admin/translations"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors flex items-center"
            >
              <SafeIcon icon={FiSettings} className="mr-2" />
              Traductions
            </Link>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <CreditBalance userId={user?.id} />
          <CreditHistory userId={user?.id} />
        </div>
        <div>
          <OrderHistory userId={user?.id} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;