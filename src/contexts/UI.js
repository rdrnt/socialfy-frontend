import React from 'react';

import Loader from '../components/Loader';

export const UIContext = React.createContext({
  header: {
    sublabel: '',
    borderOpacity: 0,
    setSublabel: () => {},
    setBorderOpacity: () => {},
  },
  loader: {
    open: false,
    message: '',
  },
});

export const UIContextProvider = props => {
  const [headerSublabel, setHeaderSublabel] = React.useState('');
  const [headerBorderOpacity, setHeaderBorderOpacity] = React.useState(0);

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
          sublabel: headerSublabel,
          borderOpacity: headerBorderOpacity,
          setSublabel: setHeaderSublabel,
          setBorderOpacity: setHeaderBorderOpacity,
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
