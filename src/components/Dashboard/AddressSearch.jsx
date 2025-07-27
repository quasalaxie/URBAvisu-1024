import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiMapPin } = FiIcons;

const AddressSearch = () => {
  const { t } = useLanguage();
  const [address, setAddress] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const mockOptions = [
    { id: 1, name: 'Informations de base', cost: 0, description: 'Numéro de parcelle, surface' },
    { id: 2, name: 'Données cadastrales', cost: 5, description: 'Propriétaire, servitudes' },
    { id: 3, name: 'Zonage et règlements', cost: 3, description: 'Zone d\'affectation, coefficients' },
    { id: 4, name: 'Rapport complet', cost: 10, description: 'Toutes les données disponibles' }
  ];

  const handleSearch = async () => {
    if (!address.trim()) return;
    
    setLoading(true);
    
    // Mock API call to SITG
    setTimeout(() => {
      setSearchResults({
        address: address,
        parcelNumber: '12345',
        surface: '850 m²',
        found: true
      });
      setLoading(false);
    }, 1000);
  };

  const handleOptionToggle = (optionId) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const calculateTotal = () => {
    return selectedOptions.reduce((total, optionId) => {
      const option = mockOptions.find(opt => opt.id === optionId);
      return total + (option?.cost || 0);
    }, 0);
  };

  const handleOrder = () => {
    if (selectedOptions.length === 0) return;
    
    // Process order
    console.log('Order placed:', {
      address,
      options: selectedOptions,
      total: calculateTotal()
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-black mb-6">
        {t('searchAddress')}
      </h2>
      
      <div className="space-y-6">
        <div className="flex space-x-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon 
                icon={FiMapPin} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
              />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('addressPlaceholder')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !address.trim()}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
          >
            <SafeIcon icon={FiSearch} className="mr-2" />
            {t('searchButton')}
          </button>
        </div>

        {searchResults && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="font-medium text-black mb-2">Résultats de la recherche</h3>
              <p className="text-gray-600">Adresse: {searchResults.address}</p>
              <p className="text-gray-600">Numéro de parcelle: {searchResults.parcelNumber}</p>
              <p className="text-gray-600">Surface: {searchResults.surface}</p>
            </div>

            <div>
              <h3 className="font-medium text-black mb-4">{t('selectOptions')}</h3>
              <div className="space-y-3">
                {mockOptions.map((option) => (
                  <label 
                    key={option.id} 
                    className="flex items-start space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => handleOptionToggle(option.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-black">{option.name}</p>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                        <span className="text-red-600 font-medium">
                          {option.cost === 0 ? 'Gratuit' : `${option.cost} CHF`}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {selectedOptions.length > 0 && (
              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium text-black">Total:</span>
                  <span className="text-xl font-bold text-red-600">
                    {calculateTotal()} CHF
                  </span>
                </div>
                <button
                  onClick={handleOrder}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
                >
                  {t('validateOrder')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSearch;