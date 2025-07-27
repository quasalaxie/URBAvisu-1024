import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'

const Profile = () => {
  const { user, userProfile } = useAuth()
  const { t } = useLanguage()

  if (!user || !userProfile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-black mb-6">
        {t('nav.profile')}
      </h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                value={userProfile.first_name || ''}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
                disabled
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                value={userProfile.last_name || ''}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
                disabled
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={userProfile.email || ''}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
                disabled
              />
            </div>
            
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Entreprise
              </label>
              <input
                type="text"
                value={userProfile.company || ''}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
                disabled
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Adresse
              </label>
              <textarea
                value={userProfile.address || ''}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed"
                rows="3"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile