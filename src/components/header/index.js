import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';

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
  border-bottom: 1px solid ${config.colors.primary};

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

  > p {
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
});

export const HeaderContextProvider = props => {
  const [sublabel, setSublabel] = React.useState('');

  return (
    <HeaderContext.Provider value={{ sublabel, setSublabel }}>
      {props.children}
    </HeaderContext.Provider>
  );
};

const Header = () => {
  const state = React.useContext(HeaderContext);

  return (
    <Root>
      <Container>
        <Content>
          <Title to={config.routes.HOME}>Sharify</Title>
          {state.sublabel && (
            <Text type="p" as="h5">
              {state.sublabel}
            </Text>
          )}
        </Content>
      </Container>
    </Root>
  );
};

export default Header;
