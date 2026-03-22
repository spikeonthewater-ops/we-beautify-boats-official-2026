import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Helper hook to scroll to top on route change
export function useScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
