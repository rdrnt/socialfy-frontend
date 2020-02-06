import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Container from '../components/container';
import Text from '../components/Text';

import { Environment } from '../helpers';
import config from '../config';

const Content = styled.div`
  height: calc(100vh - 70px);
  width: 100%;

  > div {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    > p {
      margin-top: ${config.spacing}px;

      &#emphasis {
        text-decoration: underline;
      }
    }
  }
`;

const GetStartedButton = styled(motion.button)`
  margin-top: ${config.spacing * 4}px;
  height: 60px;
  width: 175px;
  border-radius: 30px;
  background-color: white;

  > span {
    color: ${config.colors.background};
    font-weight: bold;
  }

  &:hover {
    background-color: ${config.colors.background};
    border: 2px solid white;
    > span {
      color: ${config.colors.text};
    }
  }
`;

const Auth = () => {
  const [loginButtonVisible, setLoginButtonVisible] = React.useState(false);

  const goToAuthetication = () => {
    window.location.href = `${Environment.config.API_URL}/login`;
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoginButtonVisible(true);
    }, 1000);
  }, []);

  return (
    <Content>
      <Container>
        <Text as="h1">Authenticate</Text>
        <Text as="p">
          To create your Socialfy profile, you must first login through Spotify.
        </Text>
        <Text as="p">
          The only account information we save is your profile image & username.
        </Text>
        <Text as="p" id="emphasis">
          We do no not see your password or store it.
        </Text>

        <GetStartedButton
          type="button"
          initial={{ opacity: 0 }}
          variants={{ show: { opacity: 1 }, hide: { opacity: 0 } }}
          animate={loginButtonVisible ? 'show' : 'hide'}
          onClick={goToAuthetication}
        >
          <Text as="span">Login Via Spotify</Text>
        </GetStartedButton>
      </Container>
    </Content>
  );
};

export default Auth;
