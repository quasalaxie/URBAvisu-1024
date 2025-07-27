import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentProfile, setCurrentProfile] = useState(() => {
    const saved = localStorage.getItem('currentProfile');
    return saved ? JSON.parse(saved) : null;
  });

  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem('profiles');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        isKids: false,
        language: 'en',
        subtitles: true,
        videoQuality: 'AUTO',
        maturityLevel: 'ADULT'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('currentProfile', JSON.stringify(currentProfile));
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [currentUser, currentProfile, profiles]);

  const addProfile = (profile) => {
    setProfiles(prev => [...prev, { ...profile, id: Date.now() }]);
  };

  const updateProfile = (id, updates) => {
    setProfiles(prev => 
      prev.map(profile => 
        profile.id === id ? { ...profile, ...updates } : profile
      )
    );
    if (currentProfile?.id === id) {
      setCurrentProfile(prev => ({ ...prev, ...updates }));
    }
  };

  const deleteProfile = (id) => {
    setProfiles(prev => prev.filter(profile => profile.id !== id));
    if (currentProfile?.id === id) {
      setCurrentProfile(null);
    }
  };

  const switchProfile = (profile) => {
    setCurrentProfile(profile);
  };

  const updateUser = (updates) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      setCurrentUser,
      currentProfile,
      profiles,
      addProfile,
      updateProfile,
      deleteProfile,
      switchProfile,
      updateUser
    }}>
      {children}
    </UserContext.Provider>
  );
};