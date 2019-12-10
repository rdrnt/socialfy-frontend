import React from 'react';
import styled from 'styled-components';
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
  height: 70px;
  background-color: ${config.colors.background};
  color: white;

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const Title = styled(Link)`
  ${DefaultTextStyles['h2']};
  text-decoration: none;
  color: white;
`;

const Header = () => {
  return (
    <Root>
      <Container>
        <Title to={config.routes.HOME}>Sharify</Title>
      </Container>
    </Root>
  );
};

export default Header;
