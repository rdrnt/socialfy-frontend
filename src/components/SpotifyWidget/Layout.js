import React from 'react';
import styled from 'styled-components';
import VisibilitySensor from 'react-visibility-sensor';

import Text from '../Text';
import config from '../../config';

const Container = styled.div`
  width: 100%;
  background-color: ${config.colors.background};
  border-bottom: 1px solid green;

  > div {
    min-height: ${props => (props.error ? `calc(100vh - 150px)` : `200px`)};
    width: 100%;
    margin: 20px 0;
  }
`;

const SpotifyWidgetLayout = ({ children, title, error }) => {
  const onVisibilityChanged = showing => {
    console.log(title + ' is ' + showing);
  };

  return (
    <Container error={error}>
      <VisibilitySensor onChange={onVisibilityChanged}>
        <Text as="h2">{title}</Text>
      </VisibilitySensor>
      <div>{children}</div>
    </Container>
  );
};

export default SpotifyWidgetLayout;
