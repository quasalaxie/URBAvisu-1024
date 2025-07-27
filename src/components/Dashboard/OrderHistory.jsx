import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const OrderHistory = ({ userId }) => {
  const { t } = useLanguage();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'processing': return 'text-blue-600';
      case 'failed': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed': return t('orders.completed');
      case 'processing': return t('orders.processing');
      case 'failed': return t('orders.failed');
      default: return t('orders.pending');
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-black mb-4">{t('dashboard.orderHistory')}</h3>
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
      <h3 className="text-lg font-medium text-black mb-4">{t('dashboard.orderHistory')}</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Aucune commande pour le moment
        </p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-black text-sm">
                    {order.searched_address}
                  </p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(order.created_at), 'dd MMM yyyy HH:mm', { locale: fr })}
                  </p>
                  <span className={`text-xs font-medium ${getStatusColor(order.status)}`}>
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <span className="text-red-600 font-medium text-sm">
                  {order.total_cost} {t('search.credits')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;