import React from 'react';
import styled from 'styled-components';

import Container from '../container';

import config from '../../config';

const Root = styled.header`
  height: 60px;
  background-color: black;
  color: white;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  > div {
    height: 100%;
  }
`;

const Header = () => {
  return (
    <Root>
      <Container>
        <h1>Sharify</h1>
      </Container>
    </Root>
  );
};

export default Header;
