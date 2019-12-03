import React from 'react';

import Container from '../container';

import config from '../../config';

const Header = () => {
  return (
    <header
      style={{
        background: `${config.colors.primary}`,
        marginBottom: `1.45rem`,
      }}
    >
      <Container>
        <h1>Sharify</h1>
      </Container>
    </header>
  );
};

export default Header;
