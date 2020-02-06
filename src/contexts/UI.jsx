import React from 'react';

import Loader from '../components/Loader';
import Modal from '../components/Modal';

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
  modal: {
    open: false,
    type: '',
    extra: {},
    openModal: () => {},
    closeModal: () => {},
  },
});

export const UIContextProvider = props => {
  const [headerBorderOpacity, setHeaderBorderOpacity] = React.useState(0);
  const [headerShowProfile, setHeaderShowProfile] = React.useState(undefined);

  const [loader, setLoaderSate] = React.useState({ open: false, message: '' });

  const [modal, setModalState] = React.useState({ open: false, type: '' });

  const openLoader = (message = '') => {
    setLoaderSate({ open: true, message });
  };

  const closeLoader = () => {
    setLoaderSate({ open: false, message: '' });
  };

  const openModal = (type = '', extra = {}) => {
    setModalState({ open: true, type, extra });
  };

  const closeModal = () => {
    setModalState({ open: false, type: '', extra: {} });
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
        modal: {
          ...modal,
          closeModal,
          openModal,
        },
      }}
    >
      <Loader {...loader} />
      <Modal {...modal} close={closeModal} />
      {props.children}
    </UIContext.Provider>
  );
};
