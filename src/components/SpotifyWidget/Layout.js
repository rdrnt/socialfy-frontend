import React from 'react';
import styled from 'styled-components';

import Text from '../Text';
import config from '../../config';

const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: ${config.colors.background};

  > div {
    height: auto;
    min-height: 200px;
    width: 100%;
    margin: 20px 0;
  }
`;

const SpotifyWidgetLayout = ({ children, title }) => (
  <Container>
    <Text as="h2">{title}</Text>
    <div>{children}</div>
  </Container>
);

export default SpotifyWidgetLayout;
