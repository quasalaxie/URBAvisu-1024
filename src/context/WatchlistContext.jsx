import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used within a WatchlistProvider');
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (content) => {
    setWatchlist((prev) => {
      if (!prev.some(item => item.id === content.id)) {
        return [...prev, content];
      }
      return prev;
    });
  };

  const removeFromWatchlist = (contentId) => {
    setWatchlist(prev => prev.filter(item => item.id !== contentId));
  };

  const isInWatchlist = (contentId) => {
    return watchlist.some(item => item.id === contentId);
  };

  return (
    <WatchlistContext.Provider value={{
      watchlist,
      addToWatchlist,
      removeFromWatchlist,
      isInWatchlist
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};