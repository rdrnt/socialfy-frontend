import React from 'react';
import styled from 'styled-components';

import Container from '../container';
import Text from '../Text';

import config from '../../config';

// The height is 70px, plus account for the margin on bottom
const HEADER_HEIGHT = 80;

const Root = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  height: 70px;
  background-color: ${config.colors.background};
  color: white;
  margin-bottom: 10px;

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const Header = () => {
  return (
    <Root>
      <Container>
        <Text type="h1" as="h2">
          Sharify
        </Text>
      </Container>
    </Root>
  );
};

export default Header;
