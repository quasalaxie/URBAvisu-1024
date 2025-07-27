import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiHome, FiUsers, FiDollarSign, FiShoppingCart, 
  FiGlobe, FiSettings, FiMenu, FiX, FiLogOut, 
  FiChevronDown, FiDatabase, FiLayers, FiCreditCard
} = FiIcons;

const AdminLayout = ({ children }) => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserRole();
      fetchAdminRoutes();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserRole(data.role);

      // If not admin or super_admin, redirect to dashboard
      if (!['admin', 'super_admin'].includes(data.role)) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
      navigate('/dashboard');
    }
  };

  const fetchAdminRoutes = async () => {
    try {
      // Try to fetch routes from the database
      const { data, error } = await supabase
        .from('admin_routes')
        .select('*')
        .eq('is_active', true)
        .order('order_index', { ascending: true });
      
      // If we have routes in the database, use them
      if (!error && data && data.length > 0) {
        setRoutes(data);
      } else {
        // Otherwise, use default routes
        setRoutes([
          {
            id: '1',
            path: '/admin',
            title_key: 'admin.dashboard.title',
            icon: 'FiHome',
            roles: ['admin', 'super_admin'],
            is_active: true,
            order_index: 1
          },
          {
            id: '2',
            path: '/admin/users',
            title_key: 'admin.users.title',
            icon: 'FiUsers',
            roles: ['admin', 'super_admin'],
            is_active: true,
            order_index: 2
          },
          {
            id: '3',
            path: '/admin/translations',
            title_key: 'admin.translations.title',
            icon: 'FiGlobe',
            roles: ['admin', 'super_admin'],
            is_active: true,
            order_index: 3
          },
          {
            id: '4',
            path: '/admin/tools',
            title_key: 'admin.tools.title',
            icon: 'FiLayers',
            roles: ['admin', 'super_admin'],
            is_active: true,
            order_index: 4
          },
          {
            id: '5',
            path: '/admin/credit-packs',
            title_key: 'admin.creditPacks.title',
            icon: 'FiCreditCard',
            roles: ['admin', 'super_admin'],
            is_active: true,
            order_index: 5
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching admin routes:', error);
      // Use default routes on error
      setRoutes([
        {
          id: '1',
          path: '/admin',
          title_key: 'admin.dashboard.title',
          icon: 'FiHome',
          roles: ['admin', 'super_admin'],
          is_active: true,
          order_index: 1
        },
        {
          id: '2',
          path: '/admin/users',
          title_key: 'admin.users.title',
          icon: 'FiUsers',
          roles: ['admin', 'super_admin'],
          is_active: true,
          order_index: 2
        },
        {
          id: '3',
          path: '/admin/translations',
          title_key: 'admin.translations.title',
          icon: 'FiGlobe',
          roles: ['admin', 'super_admin'],
          is_active: true,
          order_index: 3
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      FiHome,
      FiUsers,
      FiDollarSign,
      FiShoppingCart,
      FiGlobe,
      FiSettings,
      FiDatabase,
      FiLayers,
      FiCreditCard
    };
    return iconMap[iconName] || FiHome;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // Filter routes based on user role
  const allowedRoutes = routes.filter(route => 
    Array.isArray(route.roles) ? route.roles.includes(userRole) : false
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white border border-gray-200 shadow-sm"
        >
          <SafeIcon icon={sidebarOpen ? FiX : FiMenu} className="text-gray-600" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-20 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200">
            <Link to="/admin" className="flex items-center">
              <span className="text-lg font-bold text-red-600">URBAvisu Admin</span>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-3">
              {allowedRoutes.map((route) => (
                <Link
                  key={route.id}
                  to={route.path}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    location.pathname === route.path
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon icon={getIconComponent(route.icon)} className="mr-3" />
                  <span>{t(route.title_key)}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 w-full"
            >
              <SafeIcon icon={FiLogOut} className="mr-3" />
              <span>{t('common.logout')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-lg font-medium text-gray-900">
              {t('admin.panel')}
            </h1>
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="text-sm text-gray-600 hover:text-red-600">
                {t('common.dashboard')}
              </Link>
              <div className="relative">
                <button className="flex items-center text-sm text-gray-600 hover:text-red-600">
                  <span className="mr-1">{user?.email}</span>
                  <SafeIcon icon={FiChevronDown} className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;