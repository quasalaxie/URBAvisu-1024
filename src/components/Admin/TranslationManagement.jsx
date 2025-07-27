import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiEdit, FiSave, FiX, FiPlus, FiFilter, FiLoader, FiGlobe } = FiIcons;

const TranslationManagement = () => {
  const { t } = useLanguage();
  const [translations, setTranslations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    key: '',
    fr: '',
    de: '',
    it: '',
    en: '',
    category: ''
  });
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTranslations();
  }, []);

  const fetchTranslations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('translations')
        .select('*')
        .order('key');

      if (error) throw error;
      setTranslations(data || []);

      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(item => item.category))].filter(Boolean);
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (translation) => {
    setEditingId(translation.id);
    setEditForm({
      key: translation.key,
      fr: translation.fr || '',
      de: translation.de || '',
      it: translation.it || '',
      en: translation.en || '',
      category: translation.category || ''
    });
  };

  const handleNewTranslation = () => {
    setIsCreating(true);
    setEditForm({
      key: '',
      fr: '',
      de: '',
      it: '',
      en: '',
      category: ''
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    if (!editForm.key || !editForm.fr) {
      alert('Key and French translation are required');
      return;
    }

    setSaving(true);
    try {
      if (isCreating) {
        // Check if key already exists
        const { data: existingKey } = await supabase
          .from('translations')
          .select('key')
          .eq('key', editForm.key)
          .single();

        if (existingKey) {
          alert('This key already exists');
          setSaving(false);
          return;
        }

        // Create new translation
        const { error } = await supabase
          .from('translations')
          .insert([{
            key: editForm.key,
            fr: editForm.fr,
            de: editForm.de,
            it: editForm.it,
            en: editForm.en,
            category: editForm.category
          }]);

        if (error) throw error;
      } else {
        // Update existing translation
        const { error } = await supabase
          .from('translations')
          .update({
            fr: editForm.fr,
            de: editForm.de,
            it: editForm.it,
            en: editForm.en,
            category: editForm.category,
            updated_at: new Date()
          })
          .eq('id', editingId);

        if (error) throw error;
      }

      // Refresh translations
      await fetchTranslations();
      setEditingId(null);
      setIsCreating(false);
    } catch (error) {
      console.error('Error saving translation:', error);
      alert('Error saving translation');
    } finally {
      setSaving(false);
    }
  };

  // Apply filters
  const filteredTranslations = translations.filter(translation => {
    const matchesSearch = searchTerm === '' || 
                          translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          translation.fr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          translation.en?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || translation.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {t('admin.translations.title')}
        </h1>
        <button
          onClick={handleNewTranslation}
          className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
          disabled={isCreating || editingId !== null}
        >
          <SafeIcon icon={FiPlus} className="mr-2" />
          {t('admin.translations.addNew')}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('admin.translations.search')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="md:w-64">
            <div className="relative">
              <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent appearance-none"
              >
                <option value="">{t('admin.translations.allCategories')}</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingId !== null) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              {isCreating ? t('admin.translations.createNew') : t('admin.translations.edit')}
            </h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600">
              <SafeIcon icon={FiX} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.translations.key')}
                </label>
                <input
                  type="text"
                  name="key"
                  value={editForm.key}
                  onChange={handleChange}
                  disabled={!isCreating}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.translations.category')}
                </label>
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleChange}
                  placeholder="common, home, search, etc."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                />
              </div>
            </div>

            {/* Language inputs */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <span className="mr-1">FR</span>
                <span className="text-red-600">*</span>
              </label>
              <textarea
                name="fr"
                value={editForm.fr}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                rows="2"
              ></textarea>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <span className="mr-1">DE</span>
              </label>
              <textarea
                name="de"
                value={editForm.de}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                rows="2"
              ></textarea>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <span className="mr-1">IT</span>
              </label>
              <textarea
                name="it"
                value={editForm.it}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                rows="2"
              ></textarea>
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                <span className="mr-1">EN</span>
              </label>
              <textarea
                name="en"
                value={editForm.en}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                rows="2"
              ></textarea>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCancel}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('admin.translations.cancel')}
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !editForm.key || !editForm.fr}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
            >
              {saving ? (
                <>
                  <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                  {t('admin.translations.saving')}
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSave} className="mr-2" />
                  {t('admin.translations.save')}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Translations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.translations.key')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.translations.category')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  FR
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DE
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IT
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  EN
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.translations.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTranslations.length > 0 ? (
                filteredTranslations.map((translation) => (
                  <tr key={translation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {translation.key}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {translation.category || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {translation.fr || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {translation.de || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {translation.it || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {translation.en || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(translation)}
                        className="text-indigo-600 hover:text-indigo-900"
                        disabled={editingId !== null || isCreating}
                      >
                        <SafeIcon icon={FiEdit} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm || categoryFilter ? (
                      t('admin.translations.noResults')
                    ) : (
                      t('admin.translations.noTranslations')
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 flex items-center">
        <SafeIcon icon={FiGlobe} className="mr-2" />
        <span>
          {filteredTranslations.length} {t('admin.translations.entriesFound')}
        </span>
      </div>
    </div>
  );
};

export default TranslationManagement;