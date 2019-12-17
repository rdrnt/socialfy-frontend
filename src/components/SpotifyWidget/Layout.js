import React from 'react';
import styled from 'styled-components';

import Text from '../Text';
import config from '../../config';

const getHeight = props => {
  if (props.error) {
    return '200px';
  }

  if (props.autoSize) {
    return 'auto';
  }

  return 'calc(100vh - 150px)';
};

const Container = styled.div`
  width: 100%;
  background-color: ${config.colors.background};
  border-bottom: 1px solid green;
  padding: 20px 0;
  height: auto;

  > div {
    min-height: ${getHeight};
    width: 100%;
  }
`;

const SpotifyWidgetLayout = ({ children, title, error, autoSize }) => {
  return (
    <Container error={error} autoSize={autoSize}>
      <Text as="h2">{title}</Text>
      <div>{children}</div>
    </Container>
  );
};

export default SpotifyWidgetLayout;
