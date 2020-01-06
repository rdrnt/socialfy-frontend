import React from 'react';

export const UIContext = React.createContext({
  header: {
    sublabel: '',
    borderOpacity: 0,
    setSublabel: () => {},
    setBorderOpacity: () => {},
  },
});

export const UIContextProvider = props => {
  const [headerSublabel, setHeaderSublabel] = React.useState('');
  const [headerBorderOpacity, setHeaderBorderOpacity] = React.useState(0);

  return (
    <UIContext.Provider
      value={{
        header: {
          sublabel: headerSublabel,
          borderOpacity: headerBorderOpacity,
          setSublabel: setHeaderSublabel,
          setBorderOpacity: setHeaderBorderOpacity,
        },
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};
