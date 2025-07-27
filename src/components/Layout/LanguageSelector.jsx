import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe, FiCheck } = FiIcons;

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'FR', name: 'Français', active: true },
    { code: 'DE', name: 'Deutsch', active: true },
    { code: 'IT', name: 'Italiano', active: true },
    { code: 'EN', name: 'English', active: true }
  ];

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black hover:text-red-600 transition-colors font-medium flex items-center border border-gray-300 rounded px-2 py-1 w-16 justify-center"
      >
        <SafeIcon icon={FiGlobe} className="mr-1" />
        {currentLanguage}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between ${
                currentLanguage === lang.code ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              <span>{lang.name}</span>
              {currentLanguage === lang.code && <SafeIcon icon={FiCheck} className="text-green-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;