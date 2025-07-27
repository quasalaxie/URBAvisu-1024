import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiMapPin, FiLoader, FiCheck } = FiIcons;

const AddressSearch = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [address, setAddress] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [tools, setTools] = useState([]);
  const [userCredits, setUserCredits] = useState(0);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [processingOrder, setProcessingOrder] = useState(false);

  useEffect(() => {
    fetchTools();
    if (user) {
      fetchUserCredits();
    }
  }, [user]);

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('is_active', true)
        .order('credit_cost', { ascending: true });

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
    }
  };

  const fetchUserCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('credits')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setUserCredits(data?.credits || 0);
    } catch (error) {
      console.error('Error fetching user credits:', error);
    }
  };

  const handleSearch = async () => {
    if (!address.trim()) return;
    setLoading(true);

    try {
      // Simulating a search API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSearchResults({
        address: address,
        parcelNumber: '12345',
        surface: '850 m²',
        found: true
      });
      
      setSearchPerformed(true);
    } catch (error) {
      console.error('Error searching address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionToggle = (toolId) => {
    setSelectedOptions(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId) 
        : [...prev, toolId]
    );
  };

  const calculateTotal = () => {
    return selectedOptions.reduce((total, toolId) => {
      const tool = tools.find(t => t.id === toolId);
      return total + (tool?.credit_cost || 0);
    }, 0);
  };

  const handleOrder = async () => {
    if (selectedOptions.length === 0) return;
    
    const totalCost = calculateTotal();
    if (totalCost > userCredits) {
      alert(t('search.insufficientCredits'));
      return;
    }
    
    setProcessingOrder(true);
    
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user.id,
          searched_address: address,
          options: selectedOptions,
          total_cost: totalCost
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Deduct credits
      const { error: creditError } = await supabase
        .from('users')
        .update({ credits: userCredits - totalCost })
        .eq('id', user.id);

      if (creditError) throw creditError;

      // Log credit usage
      const { error: logError } = await supabase
        .from('credits')
        .insert([{
          user_id: user.id,
          type: 'usage',
          quantity: -totalCost,
          reason: `Commande: ${address}`
        }]);

      if (logError) throw logError;

      alert(t('search.orderSuccess'));
      setSelectedOptions([]);
      setUserCredits(userCredits - totalCost);

      // Reset search for new search
      setSearchPerformed(false);
      setSearchResults(null);
      setAddress('');
      
    } catch (error) {
      console.error('Error processing order:', error);
      alert(t('search.orderError'));
    } finally {
      setProcessingOrder(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-xl font-bold text-black mb-6">
        {t('search.title')}
      </h2>
      
      <div className="space-y-6">
        {/* Credit balance */}
        <div className="bg-blue-50 p-4 rounded">
          <p className="text-sm text-blue-800">
            <strong>{t('search.creditBalance')}:</strong> {userCredits} {t('search.credits')}
          </p>
        </div>

        {/* Address search input */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SafeIcon icon={FiMapPin} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('search.addressPlaceholder')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !address.trim()}
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50 md:w-auto w-full"
          >
            {loading ? (
              <>
                <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                {t('search.searching')}
              </>
            ) : (
              <>
                <SafeIcon icon={FiSearch} className="mr-2" />
                {t('search.searchButton')}
              </>
            )}
          </button>
        </div>

        {/* Options selection - always visible */}
        <div>
          <h3 className="font-medium text-black mb-4">{t('search.selectOptions')}</h3>
          <div className="space-y-3">
            {tools.map((tool) => (
              <label
                key={tool.id}
                className={`flex items-start space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer ${selectedOptions.includes(tool.id) ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(tool.id)}
                  onChange={() => handleOptionToggle(tool.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-black">{tool.name}</p>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                    <span className={`${tool.is_free ? 'text-green-600' : 'text-red-600'} font-medium`}>
                      {tool.is_free ? t('search.free') : `${tool.credit_cost} ${t('search.credits')}`}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Search results */}
        {searchResults && (
          <div className="bg-gray-50 p-4 rounded">
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiCheck} className="text-green-500 mr-2" />
              <h3 className="font-medium text-black">{t('search.results')}</h3>
            </div>
            <p className="text-gray-600">{t('search.address')}: {searchResults.address}</p>
            <p className="text-gray-600">{t('search.parcelNumber')}: {searchResults.parcelNumber}</p>
            <p className="text-gray-600">{t('search.surface')}: {searchResults.surface}</p>
          </div>
        )}

        {/* Order button and total */}
        {selectedOptions.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-black">{t('search.total')}:</span>
              <span className="text-xl font-bold text-red-600">
                {calculateTotal()} {t('search.credits')}
              </span>
            </div>
            <button
              onClick={handleOrder}
              disabled={calculateTotal() > userCredits || processingOrder || !searchPerformed}
              className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {processingOrder ? (
                <>
                  <SafeIcon icon={FiLoader} className="animate-spin mr-2 inline-block" />
                  {t('search.processing')}
                </>
              ) : calculateTotal() > userCredits ? (
                t('search.insufficientCredits')
              ) : !searchPerformed ? (
                t('search.searchFirst')
              ) : (
                t('search.validateOrder')
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSearch;