import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'
import LanguageSelector from './LanguageSelector'
import SafeIcon from './SafeIcon'
import { FiMenu, FiX, FiLogOut, FiUser, FiShield, FiSettings } from 'react-icons/fi'

const Header = () => {
  const { t } = useLanguage()
  const { user, userProfile, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
      navigate('/')
    }
  }

  const isAdmin = userProfile?.role === 'admin' || userProfile?.role === 'super_admin'

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <SafeIcon icon={mobileMenuOpen ? FiX : FiMenu} className="block h-6 w-6" />
            </button>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {/* User dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center text-black hover:text-red-600 transition-colors"
                  >
                    <span className="mr-1">{user.email?.split('@')[0] || 'User'}</span>
                    <SafeIcon icon={FiUser} className="h-5 w-5" />
                  </button>
                  
                  {userMenuOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <SafeIcon icon={FiSettings} className="mr-2" />
                        {t('nav.profile')}
                      </Link>
                      
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <SafeIcon icon={FiShield} className="mr-2" />
                          {t('nav.admin')}
                        </Link>
                      )}
                      
                      <button
                        onClick={() => {
                          setUserMenuOpen(false)
                          handleSignOut()
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <SafeIcon icon={FiLogOut} className="mr-2" />
                        {t('nav.logout')}
                      </button>
                    </div>
                  )}
                </div>

                <Link to="/search" className="text-black hover:text-red-600 transition-colors">
                  {t('nav.search')}
                </Link>
                <Link to="/dashboard" className="text-black hover:text-red-600 transition-colors">
                  {t('nav.dashboard')}
                </Link>
                <LanguageSelector />
              </>
            ) : (
              <>
                <Link to="/login" className="text-black hover:text-red-600 transition-colors">
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  {t('nav.signup')}
                </Link>
                <LanguageSelector />
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.profile')}
                </Link>
                <Link
                  to="/search"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.search')}
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.dashboard')}
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <SafeIcon icon={FiShield} className="mr-2" />
                    {t('nav.admin')}
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    handleSignOut()
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <SafeIcon icon={FiLogOut} className="mr-2" />
                  {t('nav.logout')}
                </button>
                <div className="px-3 py-2">
                  <LanguageSelector />
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium bg-red-600 text-white hover:bg-red-700 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.signup')}
                </Link>
                <div className="px-3 py-2">
                  <LanguageSelector />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header