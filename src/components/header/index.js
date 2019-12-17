import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import { useDebouncedCallback } from 'use-debounce';

import Container from '../container';
import Text, { DefaultTextStyles } from '../Text';

import config from '../../config';

// The height is 70px, plus account for the margin on bottom
const HEADER_HEIGHT = 70;

const Root = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  min-height: 70px;
  background-color: ${config.colors.background};
  color: white;
  border-bottom: ${props =>
    `1px solid rgba(255, 255, 255, ${props.borderOpacity})`};

  /* The container */
  > div {
    height: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  > span {
    margin-bottom: 10px;
  }
`;

const Title = styled(Link)`
  ${DefaultTextStyles['h2']};
  text-decoration: none;
  color: white;
`;

export const HeaderContext = React.createContext({
  sublabel: '',
  setSublabel: () => {},
  borderOpacity: 0,
  setBorderOpacity: () => {},
});

export const HeaderContextProvider = props => {
  const [sublabel, setSublabel] = React.useState('');
  const [borderOpacity, setBorderOpacity] = React.useState(0);

  return (
    <HeaderContext.Provider
      value={{ sublabel, setSublabel, borderOpacity, setBorderOpacity }}
    >
      {props.children}
    </HeaderContext.Provider>
  );
};

const Header = () => {
  const state = React.useContext(HeaderContext);

  const onScroll = () => {
    const value = window.scrollY;
    if (value >= 0 && value <= 201) {
      // Get the scroll value from 0.0-0.99
      const fixedValue = value / 2 / 100;
      state.setBorderOpacity(fixedValue);
    } else if (value > 100 && state.borderOpacity !== 1) {
      state.setBorderOpacity(1);
    }
  };

  React.useEffect(() => {
    if (window) {
      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <Root borderOpacity={state.borderOpacity}>
      <Container>
        <Content>
          <Title to={config.routes.HOME}>Sharify</Title>
          {state.sublabel && <Text as="span">{state.sublabel}</Text>}
        </Content>
      </Container>
    </Root>
  );
};

export default Header;
