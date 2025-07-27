import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center space-x-8">
          <Link to="/terms" className="text-gray-600 hover:text-black transition-colors">
            {t('common.terms')}
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-black transition-colors">
            {t('common.contact')}
          </Link>
          <Link to="/legal" className="text-gray-600 hover:text-black transition-colors">
            {t('common.legal')}
          </Link>
        </div>
        <div className="text-center text-gray-500 text-sm mt-4">
          2025 URBAvisu. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}

export default Footer