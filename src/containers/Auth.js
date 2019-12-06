import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';

import config from '../config';

const Content = styled.div`
  height: 100%;
  width: 100%;

  > div {
    height: 100%;
    width: 100%;
  }
`;

const Auth = () => {
  React.useEffect(() => {
    window.location.href = `${config.API_URL}/login`;
  }, []);

  return (
    <Content>
      <Container>
        <Text as="p">If you were not re-directed, click here.</Text>
      </Container>
    </Content>
  );
};

export default Auth;
