import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { supabase } from '../../lib/supabase';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSearch, FiEdit, FiUserCheck, FiUserX, FiPlus, 
  FiFilter, FiLoader, FiRefreshCw, FiCreditCard, 
  FiSave, FiX, FiAlertTriangle
} = FiIcons;

const UserManagement = () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    address: '',
    role: '',
    status: '',
    credits: 0
  });
  const [processing, setProcessing] = useState(false);
  const [creditsToAdd, setCreditsToAdd] = useState(0);
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditUser, setCreditUser] = useState(null);
  const [newUserForm, setNewUserForm] = useState({
    email: '',
    first_name: '',
    last_name: '',
    company: '',
    address: '',
    role: 'client',
    status: 'pending',
    password: ''
  });
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserLoading, setNewUserLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditForm({
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email || '',
      company: user.company || '',
      address: user.address || '',
      role: user.role || 'client',
      status: user.status || 'pending',
      credits: user.credits || 0
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setError('');
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleNewUserChange = (e) => {
    setNewUserForm({
      ...newUserForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setProcessing(true);
    setError('');
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          first_name: editForm.first_name,
          last_name: editForm.last_name,
          company: editForm.company,
          address: editForm.address,
          role: editForm.role,
          status: editForm.status,
          credits: parseInt(editForm.credits, 10) || 0,
          updated_at: new Date()
        })
        .eq('id', editingUser.id);

      if (error) throw error;

      // Log action for credits change if different
      if (parseInt(editForm.credits, 10) !== editingUser.credits) {
        const creditDifference = parseInt(editForm.credits, 10) - editingUser.credits;
        if (creditDifference !== 0) {
          const { error: creditError } = await supabase
            .from('credits')
            .insert([{
              user_id: editingUser.id,
              type: creditDifference > 0 ? 'gift' : 'usage',
              quantity: creditDifference,
              reason: 'Modification par administrateur',
              created_by: (await supabase.auth.getUser()).data.user?.id
            }]);
          if (creditError) throw creditError;
        }
      }

      // Refresh users
      await fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
      setError('Erreur lors de la sauvegarde: ' + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleCreateUser = async () => {
    setNewUserLoading(true);
    setError('');
    
    if (!newUserForm.email || !newUserForm.password || !newUserForm.first_name || !newUserForm.last_name) {
      setError('Tous les champs obligatoires doivent être remplis');
      setNewUserLoading(false);
      return;
    }
    
    try {
      // Create user in auth
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserForm.email,
        password: newUserForm.password,
        email_confirm: true
      });
      
      if (error) throw error;
      
      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([{
            id: data.user.id,
            email: newUserForm.email,
            first_name: newUserForm.first_name,
            last_name: newUserForm.last_name,
            company: newUserForm.company || '',
            address: newUserForm.address || '',
            role: newUserForm.role,
            status: newUserForm.status,
            validated: newUserForm.status === 'approved',
            credits: 0
          }]);
          
        if (profileError) throw profileError;
      }
      
      await fetchUsers();
      setShowNewUserForm(false);
      setNewUserForm({
        email: '',
        first_name: '',
        last_name: '',
        company: '',
        address: '',
        role: 'client',
        status: 'pending',
        password: ''
      });
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Erreur lors de la création: ' + error.message);
    } finally {
      setNewUserLoading(false);
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    setProcessing(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          status: newStatus,
          updated_at: new Date()
        })
        .eq('id', userId);

      if (error) throw error;

      // If approving, give initial credits
      if (newStatus === 'approved') {
        // Check if user already has credits
        const { data: userData } = await supabase
          .from('users')
          .select('credits')
          .eq('id', userId)
          .single();

        // If no credits, give initial 5 credits
        if (!userData.credits) {
          const { error: creditUpdateError } = await supabase
            .from('users')
            .update({ credits: 5 })
            .eq('id', userId);

          if (creditUpdateError) throw creditUpdateError;

          // Log the gift
          const { error: creditLogError } = await supabase
            .from('credits')
            .insert([{
              user_id: userId,
              type: 'gift',
              quantity: 5,
              reason: 'Crédits de bienvenue',
              created_by: (await supabase.auth.getUser()).data.user?.id
            }]);
          if (creditLogError) throw creditLogError;
        }
      }

      // Refresh users
      await fetchUsers();
    } catch (error) {
      console.error('Error changing user status:', error);
      alert('Error changing user status');
    } finally {
      setProcessing(false);
    }
  };

  const openCreditModal = (user) => {
    setCreditUser(user);
    setCreditsToAdd(0);
    setShowCreditModal(true);
  };

  const handleAddCredits = async () => {
    if (!creditUser || isNaN(creditsToAdd) || creditsToAdd <= 0) return;
    setProcessing(true);
    
    try {
      // Get current credits
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('credits')
        .eq('id', creditUser.id)
        .single();

      if (userError) throw userError;

      const currentCredits = userData.credits || 0;
      const newCredits = currentCredits + parseInt(creditsToAdd, 10);

      // Update user credits
      const { error: updateError } = await supabase
        .from('users')
        .update({ credits: newCredits })
        .eq('id', creditUser.id);

      if (updateError) throw updateError;

      // Log the gift
      const { error: creditLogError } = await supabase
        .from('credits')
        .insert([{
          user_id: creditUser.id,
          type: 'gift',
          quantity: parseInt(creditsToAdd, 10),
          reason: 'Ajout manuel par administrateur',
          created_by: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (creditLogError) throw creditLogError;

      // Refresh users
      await fetchUsers();
      setShowCreditModal(false);
      setCreditUser(null);
    } catch (error) {
      console.error('Error adding credits:', error);
      alert('Error adding credits');
    } finally {
      setProcessing(false);
    }
  };

  // Apply filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || user.status === statusFilter;
    const matchesRole = roleFilter === '' || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
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
          {t('admin.users.title')}
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowNewUserForm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
            disabled={showNewUserForm}
          >
            <SafeIcon icon={FiPlus} className="mr-2" />
            Nouvel utilisateur
          </button>
          <button
            onClick={fetchUsers}
            className="p-2 text-gray-600 hover:text-gray-800"
            title={t('admin.users.refresh')}
          >
            <SafeIcon icon={FiRefreshCw} />
          </button>
        </div>
      </div>

      {/* New User Form */}
      {showNewUserForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Créer un nouvel utilisateur</h2>
            <button onClick={() => {setShowNewUserForm(false); setError('');}} className="text-gray-400 hover:text-gray-600">
              <SafeIcon icon={FiX} />
            </button>
          </div>
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded flex items-center">
              <SafeIcon icon={FiAlertTriangle} className="mr-2 text-red-500" />
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={newUserForm.email}
                onChange={handleNewUserChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mot de passe <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={newUserForm.password}
                onChange={handleNewUserChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prénom <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={newUserForm.first_name}
                onChange={handleNewUserChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={newUserForm.last_name}
                onChange={handleNewUserChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entreprise
              </label>
              <input
                type="text"
                name="company"
                value={newUserForm.company}
                onChange={handleNewUserChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <input
                type="text"
                name="address"
                value={newUserForm.address}
                onChange={handleNewUserChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rôle
              </label>
              <select
                name="role"
                value={newUserForm.role}
                onChange={handleNewUserChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="client">{t('admin.users.client')}</option>
                <option value="manager">{t('admin.users.manager')}</option>
                <option value="admin">{t('admin.users.admin')}</option>
                <option value="super_admin">{t('admin.users.superAdmin')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Statut
              </label>
              <select
                name="status"
                value={newUserForm.status}
                onChange={handleNewUserChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="pending">{t('admin.users.pending')}</option>
                <option value="approved">{t('admin.users.approved')}</option>
                <option value="rejected">{t('admin.users.rejected')}</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {setShowNewUserForm(false); setError('');}}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t('admin.users.cancel')}
            </button>
            <button
              onClick={handleCreateUser}
              disabled={newUserLoading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
            >
              {newUserLoading ? (
                <>
                  <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                  Création...
                </>
              ) : (
                <>
                  <SafeIcon icon={FiSave} className="mr-2" />
                  Créer
                </>
              )}
            </button>
          </div>
        </div>
      )}

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
                placeholder={t('admin.users.search')}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="md:w-48">
            <div className="relative">
              <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent appearance-none"
              >
                <option value="">{t('admin.users.allStatuses')}</option>
                <option value="pending">{t('admin.users.pending')}</option>
                <option value="approved">{t('admin.users.approved')}</option>
                <option value="rejected">{t('admin.users.rejected')}</option>
              </select>
            </div>
          </div>

          {/* Role Filter */}
          <div className="md:w-48">
            <div className="relative">
              <SafeIcon icon={FiFilter} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent appearance-none"
              >
                <option value="">{t('admin.users.allRoles')}</option>
                <option value="client">{t('admin.users.client')}</option>
                <option value="manager">{t('admin.users.manager')}</option>
                <option value="admin">{t('admin.users.admin')}</option>
                <option value="super_admin">{t('admin.users.superAdmin')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      {editingUser && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 p-3 rounded flex items-center">
              <SafeIcon icon={FiAlertTriangle} className="mr-2 text-red-500" />
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.firstName')}
              </label>
              <input
                type="text"
                name="first_name"
                value={editForm.first_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.lastName')}
              </label>
              <input
                type="text"
                name="last_name"
                value={editForm.last_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.email')}
              </label>
              <input
                type="email"
                name="email"
                value={editForm.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.company')}
              </label>
              <input
                type="text"
                name="company"
                value={editForm.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.address')}
              </label>
              <input
                type="text"
                name="address"
                value={editForm.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.role')}
              </label>
              <select
                name="role"
                value={editForm.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="client">{t('admin.users.client')}</option>
                <option value="manager">{t('admin.users.manager')}</option>
                <option value="admin">{t('admin.users.admin')}</option>
                <option value="super_admin">{t('admin.users.superAdmin')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.status')}
              </label>
              <select
                name="status"
                value={editForm.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              >
                <option value="pending">{t('admin.users.pending')}</option>
                <option value="approved">{t('admin.users.approved')}</option>
                <option value="rejected">{t('admin.users.rejected')}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.users.credits')}
              </label>
              <input
                type="number"
                name="credits"
                value={editForm.credits}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleCancel}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={processing}
            >
              {t('admin.users.cancel')}
            </button>
            <button
              onClick={handleSave}
              disabled={processing}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center"
            >
              {processing ? (
                <>
                  <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                  {t('admin.users.saving')}
                </>
              ) : (
                t('admin.users.save')
              )}
            </button>
          </div>
        </div>
      )}

      {/* Credit Modal */}
      {showCreditModal && creditUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Ajouter des crédits</h3>
            <p className="mb-4">
              Utilisateur: <strong>{creditUser.first_name} {creditUser.last_name}</strong>
            </p>
            <p className="mb-4">
              Crédits actuels: <strong>{creditUser.credits || 0}</strong>
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de crédits à ajouter
              </label>
              <input
                type="number"
                min="1"
                value={creditsToAdd}
                onChange={(e) => setCreditsToAdd(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreditModal(false)}
                className="mr-3 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleAddCredits}
                disabled={processing || creditsToAdd <= 0}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
              >
                {processing ? (
                  <>
                    <SafeIcon icon={FiLoader} className="animate-spin mr-2" />
                    Traitement...
                  </>
                ) : (
                  "Ajouter les crédits"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.user')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.contact')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.status')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.role')}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.credits')}
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.users.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 font-medium">
                            {user.first_name?.charAt(0) || '?'} {user.last_name?.charAt(0) || ''}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.first_name} {user.last_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.company || '-'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.address || '-'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        user.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.credits || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        {user.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(user.id, 'approved')}
                              className="text-green-600 hover:text-green-900"
                              disabled={processing}
                            >
                              <SafeIcon icon={FiUserCheck} />
                            </button>
                            <button
                              onClick={() => handleStatusChange(user.id, 'rejected')}
                              className="text-red-600 hover:text-red-900"
                              disabled={processing}
                            >
                              <SafeIcon icon={FiUserX} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleEdit(user)}
                          className="text-indigo-600 hover:text-indigo-900"
                          disabled={processing}
                        >
                          <SafeIcon icon={FiEdit} />
                        </button>
                        <button
                          onClick={() => openCreditModal(user)}
                          className="text-green-600 hover:text-green-900"
                          disabled={processing}
                        >
                          <SafeIcon icon={FiCreditCard} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm || statusFilter || roleFilter ? (
                      t('admin.users.noResults')
                    ) : (
                      t('admin.users.noUsers')
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;