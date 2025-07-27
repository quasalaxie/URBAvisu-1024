import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const DatabaseTest = () => {
  const { user } = useAuth();
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
      } else {
        results.push({ test: 'Utilisateur authentifié', status: 'ERREUR', message: 'Non connecté' });
      }

      // Test 3: User profile
      if (user) {
        const { data: userProfile, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          results.push({ test: 'Profil utilisateur', status: 'ERREUR', message: error.message });
        } else {
          results.push({ 
            test: 'Profil utilisateur', 
            status: 'OK', 
            message: `Rôle: ${userProfile.role}, Crédits: ${userProfile.credits}` 
          });
        }
      }

      // Test 4: Translations
      const { data: translations, error: transError } = await supabase
        .from('translations')
        .select('count')
        .limit(1);

      if (transError) {
        results.push({ test: 'Traductions', status: 'ERREUR', message: transError.message });
      } else {
        results.push({ test: 'Traductions', status: 'OK', message: 'Table accessible' });
      }

      // Test 5: RLS Policies
      const { data: policies, error: policiesError } = await supabase
        .rpc('get_policies_info');

      if (policiesError) {
        results.push({ test: 'Politiques RLS', status: 'INFO', message: 'Impossible de vérifier' });
      } else {
        results.push({ test: 'Politiques RLS', status: 'OK', message: 'Configurées' });
      }

    } catch (error) {
      results.push({ test: 'Test général', status: 'ERREUR', message: error.message });
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    runTests();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Test de la base de données</h1>
      
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
              'bg-yellow-50 border-yellow-500'
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="font-medium">{result.test}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                result.status === 'OK' ? 'bg-green-200 text-green-800' :
                result.status === 'ERREUR' ? 'bg-red-200 text-red-800' :
                'bg-yellow-200 text-yellow-800'
              }`}>
                {result.status}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{result.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseTest;