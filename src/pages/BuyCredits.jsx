import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCreditCard, FiCheck, FiStar, FiLoader } = FiIcons;

const BuyCredits = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [creditPacks, setCreditPacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPack, setSelectedPack] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCreditPacks();
  }, []);

  const fetchCreditPacks = async () => {
    try {
      const { data, error } = await supabase
        .from('credit_packs')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

      if (error) throw error;
      setCreditPacks(data || []);
    } catch (error) {
      console.error('Error fetching credit packs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pack) => {
    if (!user) return;
    setProcessing(true);
    setSelectedPack(pack.id);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Add credits to user account
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('credits')
        .eq('id', user.id)
        .single();

      if (userError) throw userError;

      const newCredits = (userData.credits || 0) + pack.credits + (pack.bonus_credits || 0);

      const { error: updateError } = await supabase
        .from('users')
        .update({ credits: newCredits })
        .eq('id', user.id);

      if (updateError) throw updateError;

      // Log the purchase
      const { error: logError } = await supabase
        .from('credits')
        .insert([{
          user_id: user.id,
          type: 'purchase',
          quantity: pack.credits + (pack.bonus_credits || 0),
          reason: `Achat pack ${pack.name}`,
          description: `${pack.credits} crédits + ${pack.bonus_credits || 0} crédits bonus`
        }]);

      if (logError) throw logError;

      alert(t('credits.purchaseSuccess', { credits: pack.credits + (pack.bonus_credits || 0) }));

    } catch (error) {
      console.error('Error processing purchase:', error);
      alert(t('credits.purchaseError'));
    } finally {
      setProcessing(false);
      setSelectedPack(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('credits.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-black mb-4">
          {t('credits.title')}
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {t('credits.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creditPacks.map((pack, index) => (
          <div
            key={pack.id}
            className={`relative bg-white border-2 rounded-lg p-6 transition-all duration-300 hover:shadow-lg ${
              index === 1 ? 'border-red-600 transform scale-105' : 'border-gray-200 hover:border-red-300'
            }`}
          >
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <SafeIcon icon={FiStar} className="mr-1 text-xs" />
                  {t('credits.popular')}
                </span>
              </div>
            )}

            <div className="text-center">
              <h3 className="text-xl font-bold text-black mb-2">{pack.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold text-black">{pack.credits}</span>
                <span className="text-gray-600 ml-1">{t('credits.credits')}</span>
              </div>

              {pack.bonus_credits > 0 && (
                <div className="mb-4 p-2 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 text-sm font-medium">
                    + {pack.bonus_credits} {t('credits.bonusCredits')}
                  </p>
                  <p className="text-green-600 text-xs">
                    {t('credits.total')}: {pack.credits + pack.bonus_credits} {t('credits.credits')}
                  </p>
                </div>
              )}

              <div className="mb-6">
                <span className="text-2xl font-bold text-red-600">CHF {pack.price.toFixed(2)}</span>
              </div>

              <button
                onClick={() => handlePurchase(pack)}
                disabled={processing}
                className={`w-full py-3 px-4 rounded font-medium transition-colors flex items-center justify-center ${
                  index === 1 ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-gray-600 text-white hover:bg-gray-700'
                } disabled:opacity-50`}
              >
                {processing && selectedPack === pack.id ? (
                  <>
                    <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                    {t('credits.processing')}
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiCreditCard} className="mr-2" />
                    {t('credits.buy')}
                  </>
                )}
              </button>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2 text-xs" />
                  {t('credits.neverExpire')}
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2 text-xs" />
                  {t('credits.instantUse')}
                </div>
                <div className="flex items-center">
                  <SafeIcon icon={FiCheck} className="text-green-500 mr-2 text-xs" />
                  {t('credits.invoiceAvailable')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-black mb-4 text-center">
          {t('credits.infoTitle')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-bold text-black mb-2">{t('credits.usage.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('credits.usage.description')}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">{t('credits.validity.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('credits.validity.description')}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-black mb-2">{t('credits.support.title')}</h3>
            <p className="text-gray-600 text-sm">
              {t('credits.support.description')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredits;