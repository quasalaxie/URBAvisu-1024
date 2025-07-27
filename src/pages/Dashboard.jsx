import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

const Dashboard = () => {
  const { user, userProfile } = useAuth()
  const { t } = useLanguage()

  if (!user) {
    return <div>Chargement...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black">
          {t('nav.dashboard')}
        </h1>
        {userProfile && (
          <p className="text-gray-600 mt-2">
            Bienvenue, {userProfile.first_name} {userProfile.last_name}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-medium text-black mb-2">Crédits</h3>
          <p className="text-3xl font-bold text-red-600">{userProfile?.credits || 0}</p>
          <p className="text-sm text-gray-500">crédits disponibles</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-medium text-black mb-2">Statut</h3>
          <p className="text-sm font-medium text-green-600">{userProfile?.status || 'pending'}</p>
          <p className="text-sm text-gray-500">statut du compte</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h3 className="text-lg font-medium text-black mb-2">Rôle</h3>
          <p className="text-sm font-medium text-blue-600">{userProfile?.role || 'client'}</p>
          <p className="text-sm text-gray-500">niveau d'accès</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard