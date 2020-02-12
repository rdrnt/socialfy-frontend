import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Container from '../components/container';
import Text, { DefaultTextStyles } from '../components/Text';
import config from '../config';

const Content = styled.div`
  height: calc(100vh - 70px);
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

const AuthButton = styled(Link)`
  width: 160px;
  border-radius: 50px;
  background-color: white;
  padding: ${config.spacing * 2}px;
  text-align: center;

  color: ${config.colors.background};
  text-transform: uppercase;
  ${DefaultTextStyles['span']};
  font-weight: bold;
  text-decoration: none;

  :hover {
    border: 2px solid white;
    background-color: ${config.colors.background};
    color: white;
  }
`;

const Home = () => {
  return (
    <Content>
      <Container>
        <Text as="h1">Share what you're currently jamming too.</Text>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
        >
          <AuthButton to={config.routes.AUTH}>Get started</AuthButton>
        </motion.div>
      </Container>
    </Content>
  );
};

export default Home;
