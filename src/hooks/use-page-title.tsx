import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const getPageTitle = (pathname: string) => {
      const baseTitle = 'Wisma Eldorado - Sumba Timur';
      
      switch (pathname) {
        case '/':
          return baseTitle;
        case '/rooms':
          return baseTitle;
        case '/gallery':
          return baseTitle;
        case '/contact':
          return baseTitle;
        case '/booking':
          return baseTitle;
        case '/admin':
          return baseTitle;
        default:
          // Untuk halaman yang tidak ditemukan (404)
          return baseTitle;
      }
    };

    const newTitle = getPageTitle(location.pathname);
    document.title = newTitle;
  }, [location.pathname]);
};

export default usePageTitle;
