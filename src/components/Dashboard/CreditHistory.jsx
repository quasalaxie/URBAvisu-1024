import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiMinus, FiGift } = FiIcons;

const CreditHistory = ({ userId }) => {
  const { t } = useLanguage();
  const [creditHistory, setCreditHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchCreditHistory();
    }
  }, [userId]);

  const fetchCreditHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('credits')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setCreditHistory(data || []);
    } catch (error) {
      console.error('Error fetching credit history:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'purchase': return FiPlus;
      case 'usage': return FiMinus;
      case 'gift': return FiGift;
      default: return FiPlus;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'purchase': return 'text-green-600';
      case 'usage': return 'text-red-600';
      case 'gift': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'purchase': return t('credits.purchase');
      case 'usage': return t('credits.usage');
      case 'gift': return t('credits.gift');
      case 'refund': return t('credits.refund');
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-black mb-4">{t('dashboard.creditHistory')}</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium text-black mb-4">{t('dashboard.creditHistory')}</h3>
      {creditHistory.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Aucune transaction pour le moment
        </p>
      ) : (
        <div className="space-y-3">
          {creditHistory.map((credit) => (
            <div key={credit.id} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <SafeIcon icon={getTypeIcon(credit.type)} className={`${getTypeColor(credit.type)} text-sm`} />
                  <div>
                    <p className="font-medium text-black text-sm">
                      {getTypeLabel(credit.type)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {credit.reason || credit.description}
                    </p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(credit.created_at), 'dd MMM yyyy HH:mm', { locale: fr })}
                    </p>
                  </div>
                </div>
                <span className={`font-medium text-sm ${getTypeColor(credit.type)}`}>
                  {credit.quantity > 0 ? '+' : ''}{credit.quantity} {t('search.credits')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreditHistory;