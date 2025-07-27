import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiPlus } = FiIcons;

const CreditBalance = ({ userId }) => {
  const { t } = useLanguage();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCredits();
    }
  }, [userId]);

  const fetchCredits = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('credits')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setCredits(data?.credits || 0);
    } catch (error) {
      console.error('Error fetching credits:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-black">{t('dashboard.creditBalance') || 'Solde de crédits'}</h3>
        <SafeIcon icon={FiCreditCard} className="text-gray-400" />
      </div>
      <div className="text-3xl font-bold text-black mb-4">
        {credits} {t('search.credits')}
      </div>
      <Link
        to="/credits/buy"
        className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center justify-center"
      >
        <SafeIcon icon={FiPlus} className="mr-2" />
        {t('dashboard.buyCredits')}
      </Link>
    </div>
  );
};

export default CreditBalance;