import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { Link } from 'react-router-dom';

import Container from '../components/container';
import Text, { DefaultTextStyles } from '../components/Text';
import config from '../config';

const Content = styled.div`
  height: calc(100vh - 80px);
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: flex-start;

    > h1 {
      margin-bottom: 40px;
    }
  }
`;

const AuthButton = styled.button`
  height: 50px;
  width: 160px;
  border-radius: 25px;
  background-color: white;
  padding: 5px;

  > a {
    color: ${config.colors.background};
    text-transform: uppercase;
    ${DefaultTextStyles['span']};
    font-weight: bold;
    text-decoration: none;
  }

  :hover {
    border: 3px solid white;
    background-color: ${config.colors.background};
    > a {
      color: white;
    }
  }
`;

const TimedReveal = posed.div({
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
});

const Home = () => {
  const [revealContent, showRevealContent] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      showRevealContent(true);
    }, 1000);
  }, []);

  return (
    <Content>
      <Container>
        <Text as="h1">Share what you're currently jamming too.</Text>
        <TimedReveal pose={revealContent ? 'show' : 'hide'}>
          <AuthButton type="button">
            <Link to={config.routes.AUTH}>Get started</Link>
          </AuthButton>
        </TimedReveal>
      </Container>
    </Content>
  );
};

export default Home;
