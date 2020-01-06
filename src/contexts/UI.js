import React from 'react';

export const UIContext = React.createContext({
  header: {
    sublabel: '',
    borderOpacity: 0,
    setSublabel: () => {},
    setBorderOpacity: () => {},
  },
  search: {
    show: false,
    set: () => {},
  },
});

export const UIContextProvider = props => {
  const [headerSublabel, setHeaderSublabel] = React.useState('');
  const [headerBorderOpacity, setHeaderBorderOpacity] = React.useState(0);

  const [showSearch, setSearchShowing] = React.useState(false);

  return (
    <UIContext.Provider
      value={{
        header: {
          sublabel: headerSublabel,
          borderOpacity: headerBorderOpacity,
          setSublabel: setHeaderSublabel,
          setBorderOpacity: setHeaderBorderOpacity,
        },
        search: {
          show: showSearch,
          set: setSearchShowing,
        },
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};
