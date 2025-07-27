import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiUsers,
  FiCreditCard,
  FiShoppingCart,
  FiActivity,
  FiAlertCircle,
  FiCheckCircle
} = FiIcons;

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingUsers: 0,
    totalOrders: 0,
    todayOrders: 0,
    creditsSold: 0,
    creditsUsed: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get total users count
      const { count: totalUsers, error: usersError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });
      
      if (usersError) throw usersError;
      
      // Get pending users count
      const { count: pendingUsers, error: pendingError } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');
      
      if (pendingError) throw pendingError;
      
      // Get total orders count
      const { count: totalOrders, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });
      
      if (ordersError) throw ordersError;
      
      // Get today's orders count
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const { count: todayOrders, error: todayOrdersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString());
      
      if (todayOrdersError) throw todayOrdersError;
      
      // Get credits stats
      const { data: creditsData, error: creditsError } = await supabase
        .from('credits')
        .select('type, quantity');
      
      if (creditsError) throw creditsError;
      
      const creditsSold = creditsData
        .filter(credit => credit.type === 'purchase')
        .reduce((total, credit) => total + credit.quantity, 0);
      
      const creditsUsed = Math.abs(
        creditsData
          .filter(credit => credit.type === 'usage')
          .reduce((total, credit) => total + credit.quantity, 0)
      );
      
      // Get recent users
      const { data: recentUsersData, error: recentUsersError } = await supabase
        .from('users')
        .select('id, email, first_name, last_name, role, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (recentUsersError) throw recentUsersError;
      
      // Get recent orders
      const { data: recentOrdersData, error: recentOrdersError } = await supabase
        .from('orders')
        .select('id, user_id, searched_address, total_cost, status, created_at')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (recentOrdersError) throw recentOrdersError;
      
      setStats({
        totalUsers,
        pendingUsers,
        totalOrders,
        todayOrders,
        creditsSold,
        creditsUsed
      });
      
      setRecentUsers(recentUsersData || []);
      setRecentOrders(recentOrdersData || []);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('admin.dashboard.title')}
      </h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <SafeIcon icon={FiUsers} className="text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {t('admin.dashboard.totalUsers')}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalUsers}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon 
              icon={FiAlertCircle} 
              className="text-yellow-500 mr-1 text-sm" 
            />
            <span className="text-sm text-gray-500">
              {stats.pendingUsers} {t('admin.dashboard.pendingApproval')}
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <SafeIcon icon={FiShoppingCart} className="text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {t('admin.dashboard.totalOrders')}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalOrders}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon 
              icon={FiActivity} 
              className="text-green-500 mr-1 text-sm" 
            />
            <span className="text-sm text-gray-500">
              {stats.todayOrders} {t('admin.dashboard.ordersToday')}
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <SafeIcon icon={FiCreditCard} className="text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {t('admin.dashboard.creditsSold')}
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.creditsSold}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <SafeIcon 
              icon={FiCheckCircle} 
              className="text-blue-500 mr-1 text-sm" 
            />
            <span className="text-sm text-gray-500">
              {stats.creditsUsed} {t('admin.dashboard.creditsUsed')}
            </span>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {t('admin.dashboard.recentUsers')}
            </h2>
          </div>
          <div className="p-6">
            {recentUsers.length > 0 ? (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {user.first_name?.charAt(0) || '?'}
                        {user.last_name?.charAt(0) || ''}
                      </span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="ml-auto">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.status === 'approved' 
                          ? 'bg-green-100 text-green-800'
                          : user.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                {t('admin.dashboard.noRecentUsers')}
              </p>
            )}
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              {t('admin.dashboard.recentOrders')}
            </h2>
          </div>
          <div className="p-6">
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <SafeIcon icon={FiShoppingCart} className="text-green-600" />
                    </div>
                    <div className="ml-4 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {order.searched_address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-red-600 mr-3">
                        {order.total_cost} {t('admin.dashboard.credits')}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                {t('admin.dashboard.noRecentOrders')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;