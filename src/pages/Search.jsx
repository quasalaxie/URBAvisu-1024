import React from 'react'
import { useLanguage } from '../context/LanguageContext'

const Search = () => {
  const { t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-4">
          {t('nav.search')}
        </h1>
        <p className="text-gray-600">
          Recherchez une adresse suisse et obtenez des informations détaillées sur la parcelle.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-black mb-6">
          Recherche d'adresse
        </h2>
        <div className="space-y-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Entrez une adresse suisse (ex: Chemin des Verjus 103, 1228 Plan-les-Ouates)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search