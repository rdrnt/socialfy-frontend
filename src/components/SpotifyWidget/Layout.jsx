import React from 'react';
import styled from 'styled-components';

import Text from '../Text';
import config from '../../config';

const getHeight = props => {
  if (props.error) {
    return '200px';
  }

  return 'auto';
};

const Container = styled.div`
  width: 100%;
  background-color: ${config.colors.background};
  /* border-bottom: 1px solid green; */
  height: auto;
  padding: ${config.spacing * 2}px 0;

  > h2 {
    margin-bottom: ${config.spacing}px;
  }

  > div {
    min-height: ${getHeight};
    width: 100%;
  }
`;

const SpotifyWidgetLayout = ({ children, title, error }) => {
  return (
    <Container error={error}>
      <Text as="h2">{title}</Text>
      <div>{children}</div>
    </Container>
  );
};

export default SpotifyWidgetLayout;
