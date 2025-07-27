import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCamera } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const ProfileSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profiles, updateProfile, deleteProfile } = useUser();
  const profile = profiles.find(p => p.id === parseInt(id)) || {
    name: '',
    isKids: false,
    language: 'en',
    subtitles: true,
    videoQuality: 'AUTO',
    maturityLevel: 'ADULT'
  };

  const [formData, setFormData] = useState(profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateProfile(parseInt(id), formData);
    }
    navigate('/profile/select');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      deleteProfile(parseInt(id));
      navigate('/profile/select');
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-gray-850 rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-8">
          {id ? 'Edit Profile' : 'Create Profile'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-start space-x-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-lg overflow-hidden">
                <img
                  src={formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <FaCamera className="text-white text-2xl" />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Maturity Settings</label>
              <select
                value={formData.maturityLevel}
                onChange={(e) => setFormData({ ...formData, maturityLevel: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="KIDS">Kids</option>
                <option value="TEEN">Teen</option>
                <option value="ADULT">Adult</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video Quality</label>
              <select
                value={formData.videoQuality}
                onChange={(e) => setFormData({ ...formData, videoQuality: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="AUTO">Auto</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="ULTRA">Ultra HD</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="subtitles"
                checked={formData.subtitles}
                onChange={(e) => setFormData({ ...formData, subtitles: e.target.checked })}
                className="rounded bg-gray-700"
              />
              <label htmlFor="subtitles" className="text-sm">Enable subtitles by default</label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isKids"
                checked={formData.isKids}
                onChange={(e) => setFormData({ ...formData, isKids: e.target.checked })}
                className="rounded bg-gray-700"
              />
              <label htmlFor="isKids" className="text-sm">This is a kids profile</label>
            </div>
          </div>

          <div className="flex items-center justify-between pt-6">
            <div className="space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                Save Profile
              </button>
              <button
                type="button"
                onClick={() => navigate('/profile/select')}
                className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
            {id && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Delete Profile
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;