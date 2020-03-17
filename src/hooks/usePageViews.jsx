import React from 'react';
import { useLocation } from 'react-router-dom';

import { Analytics } from '../helpers';

const usePageViews = () => {
  const location = useLocation();

  React.useEffect(() => {
    Analytics.pageView(location.pathname);
  }, [location]);
};

export default usePageViews;
