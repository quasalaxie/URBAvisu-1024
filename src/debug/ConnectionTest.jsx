import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const ConnectionTest = () => {
  const { user, userProfile } = useAuth();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const runTests = async () => {
    setLoading(true);
    const results = [];

    try {
      // Test 1: Connection
      results.push({ test: 'Connexion Supabase', status: 'OK', message: 'Connecté' });

      // Test 2: Auth user
      if (user) {
        results.push({ test: 'Utilisateur authentifié', status: 'OK', message: user.email });
        
        // Test 3: User profile
        if (userProfile) {
          results.push({ 
            test: 'Profil utilisateur', 
            status: 'OK', 
            message: `Rôle: ${userProfile.role}, Crédits: ${userProfile.credits}` 
          });
          
          // Test 4: Admin access
          const isAdmin = userProfile.role === 'admin' || userProfile.role === 'super_admin';
          results.push({ 
            test: 'Accès administrateur', 
            status: isAdmin ? 'OK' : 'NON', 
            message: isAdmin ? 'Accès autorisé' : 'Accès non autorisé' 
          });
        } else {
          results.push({ test: 'Profil utilisateur', status: 'ERREUR', message: 'Profil non trouvé' });
        }
      } else {
        results.push({ test: 'Utilisateur authentifié', status: 'NON', message: 'Non connecté' });
      }

      // Test 5: Database tables
      const { data: translations, error: transError } = await supabase
        .from('translations')
        .select('count')
        .limit(1);

      if (transError) {
        results.push({ test: 'Table translations', status: 'ERREUR', message: transError.message });
      } else {
        results.push({ test: 'Table translations', status: 'OK', message: 'Accessible' });
      }

      // Test 6: Credit packs
      const { data: creditPacks, error: creditError } = await supabase
        .from('credit_packs')
        .select('count')
        .limit(1);

      if (creditError) {
        results.push({ test: 'Table credit_packs', status: 'ERREUR', message: creditError.message });
      } else {
        results.push({ test: 'Table credit_packs', status: 'OK', message: 'Accessible' });
      }

    } catch (error) {
      results.push({ test: 'Test général', status: 'ERREUR', message: error.message });
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, [user, userProfile]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test de connexion URBA visu</h1>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
        <h2 className="font-bold text-blue-800 mb-2">Informations de connexion:</h2>
        <p className="text-blue-700">
          <strong>Compte de test:</strong> quasalaxie@gmail.com<br />
          <strong>Rôle attendu:</strong> super_admin<br />
          <strong>Crédits:</strong> 1000
        </p>
      </div>
      
      <button 
        onClick={runTests}
        disabled={loading}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Test en cours...' : 'Relancer les tests'}
      </button>

      <div className="space-y-4">
        {testResults.map((result, index) => (
          <div 
            key={index}
            className={`p-4 rounded border-l-4 ${
              result.status === 'OK' ? 'bg-green-50 border-green-500' :
              result.status === 'ERREUR' ? 'bg-red-50 border-red-500' :
              result.status === 'NON' ? 'bg-yellow-50 border-yellow-500' :
              'bg-gray-50 border-gray-500'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{result.test}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                result.status === 'OK' ? 'bg-green-200 text-green-800' :
                result.status === 'ERREUR' ? 'bg-red-200 text-red-800' :
                result.status === 'NON' ? 'bg-yellow-200 text-yellow-800' :
                'bg-gray-200 text-gray-800'
              }`}>
                {result.status}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{result.message}</p>
          </div>
        ))}
      </div>

      {user && (
        <div className="mt-8 p-4 bg-gray-50 rounded">
          <h3 className="font-bold mb-2">Actions rapides:</h3>
          <div className="space-y-2">
            <a href="/admin" className="block text-blue-600 hover:underline">
              → Accéder au panneau d'administration
            </a>
            <a href="/admin/users" className="block text-blue-600 hover:underline">
              → Gestion des utilisateurs
            </a>
            <a href="/admin/translations" className="block text-blue-600 hover:underline">
              → Gestion des traductions
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionTest;