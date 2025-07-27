import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'
import SafeIcon from '../components/SafeIcon'
import { FiTarget, FiList } from 'react-icons/fi'
import { GiSnap } from 'react-icons/gi'

const Home = () => {
  const { t } = useLanguage()
  const { user, userProfile } = useAuth()

  const isAdmin = userProfile?.role === 'admin' || userProfile?.role === 'super_admin'

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Logo height={70} />
          </div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('home.subtitle')}
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-4xl mx-auto">
            {t('home.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <Link
                to="/login"
                className="bg-red-600 text-white px-8 py-3 text-lg rounded hover:bg-red-700 transition-colors inline-block"
              >
                {t('home.getStarted')}
              </Link>
            ) : (
              <Link
                to="/search"
                className="bg-red-600 text-white px-8 py-3 text-lg rounded hover:bg-red-700 transition-colors inline-block"
              >
                {t('home.startSearch')}
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                className="bg-gray-600 text-white px-8 py-3 text-lg rounded hover:bg-gray-700 transition-colors inline-block"
              >
                {t('nav.admin')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 mx-auto mb-4 rounded flex items-center justify-center">
                <SafeIcon icon={FiTarget} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                {t('features.title1')}
              </h3>
              <p className="text-gray-600">
                {t('features.desc1')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 mx-auto mb-4 rounded flex items-center justify-center">
                <SafeIcon icon={FiList} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                {t('features.title2')}
              </h3>
              <p className="text-gray-600">
                {t('features.desc2')}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 mx-auto mb-4 rounded flex items-center justify-center">
                <SafeIcon icon={GiSnap} className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-2">
                {t('features.title3')}
              </h3>
              <p className="text-gray-600">
                {t('features.desc3')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home