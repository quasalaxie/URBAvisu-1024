import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

const ProtectedRoute = ({ children, adminRequired = false }) => {
  const { user, userProfile, loading } = useAuth();
  const [checking, setChecking] = useState(adminRequired);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user || !adminRequired) {
        setChecking(false);
        return;
      }

      try {
        // Vérifier directement depuis la base de données
        const { data, error } = await supabase
          .from('users')
          .select('role, status, validated')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking user access:', error);
          setHasAccess(false);
        } else {
          const isAdmin = data?.role === 'admin' || data?.role === 'super_admin';
          console.log('Access check:', { 
            userRole: data?.role, 
            isAdmin, 
            status: data?.status,
            validated: data?.validated 
          });
          setHasAccess(isAdmin);
        }
      } catch (error) {
        console.error('Error in access check:', error);
        setHasAccess(false);
      } finally {
        setChecking(false);
      }
    };

    checkAccess();
  }, [user, adminRequired]);

  if (loading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminRequired && !hasAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;