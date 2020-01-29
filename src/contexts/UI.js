import React from 'react';

import Loader from '../components/Loader';

export const UIContext = React.createContext({
  header: {
    borderOpacity: 0,
    setBorderOpacity: () => {},
    showProfile: () => {},
    profileToShow: undefined,
  },
  loader: {
    open: false,
    message: '',
  },
});

export const UIContextProvider = props => {
  const [headerBorderOpacity, setHeaderBorderOpacity] = React.useState(0);
  const [headerShowProfile, setHeaderShowProfile] = React.useState(undefined);

  const [loader, setLoaderSate] = React.useState({ open: false, message: '' });

  const openLoader = (message = '') => {
    setLoaderSate({ open: true, message });
  };

  const closeLoader = () => {
    setLoaderSate({ open: false, message: '' });
  };

  return (
    <UIContext.Provider
      value={{
        header: {
          borderOpacity: headerBorderOpacity,
          setBorderOpacity: setHeaderBorderOpacity,
          profileToShow: headerShowProfile,
          showProfile: setHeaderShowProfile,
        },
        loader: {
          ...loader,
          open: openLoader,
          close: closeLoader,
        },
      }}
    >
      <Loader {...loader} />
      {props.children}
    </UIContext.Provider>
  );
};
