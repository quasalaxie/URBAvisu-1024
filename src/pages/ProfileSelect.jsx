import { motion } from 'framer-motion';
import { FaPlus, FaPen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProfileSelect = () => {
  const { profiles, switchProfile } = useUser();
  const navigate = useNavigate();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleProfileSelect = (profile) => {
    switchProfile(profile);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center mb-12">Who's watching?</h1>
        
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              variants={item}
              className="flex flex-col items-center"
            >
              <button
                onClick={() => handleProfileSelect(profile)}
                className="group relative"
              >
                <div className="w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:border-4 border-primary"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaPen className="text-white text-2xl" />
                  </div>
                </div>
                {profile.isKids && (
                  <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                    KIDS
                  </span>
                )}
              </button>
              <h3 className="mt-4 text-lg font-medium">{profile.name}</h3>
            </motion.div>
          ))}

          {profiles.length < 5 && (
            <motion.div variants={item} className="flex flex-col items-center">
              <button
                onClick={() => navigate('/profile/new')}
                className="w-32 h-32 rounded-lg border-4 border-gray-600 flex items-center justify-center hover:border-gray-400 transition-colors"
              >
                <FaPlus className="text-4xl text-gray-600 hover:text-gray-400 transition-colors" />
              </button>
              <h3 className="mt-4 text-lg font-medium">Add Profile</h3>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/profile/manage')}
            className="px-8 py-2 bg-transparent text-gray-400 border border-gray-400 hover:text-white hover:border-white transition-colors"
          >
            Manage Profiles
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSelect;