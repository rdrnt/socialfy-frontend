import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';

import { RecentlyPlayed, NowPlaying } from '../components/SpotifyWidget';

import { Firebase, Spotify } from '../helpers';
import config from '../config';

const Content = styled.div`
  height: 100%;
  width: 100%;

  > div {
    height: 100%;
    width: 100%;
  }
`;

const UserProfileName = styled.div`
  position: sticky;
  top: 70px;
  left: 0;
  height: 70px;
  width: 100%;
  background-color: ${config.colors.background};
`;

const User = ({ match }) => {
  const [user, setUser] = React.useState(undefined);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const [updateTimer, setUpdateTimer] = React.useState(undefined);

  const initliazeTimer = () => {
    const timerFunction = setTimeout(() => {
      console.log('Timer executing');
    }, 1000 * 20);
    setUpdateTimer(timerFunction);
  };

  const fetchUser = async username => {
    const user = await Firebase.getUser(username);

    if (user) {
      // Set the user in the state
      setUser(user);

      // Set the spotify auth token
      Spotify.setAuthToken(user.auth.accessToken);

      initliazeTimer();
    } else if (!user && !username) {
      setUserNotFound(true);
    }
  };

  React.useEffect(() => {
    const username = match.params.userId;

    if (username) {
      fetchUser(username);
    } else if (!username) {
      setUserNotFound(true);
    }
  }, [match.params.userId]);

  React.useEffect(() => {
    console.log('Spotify auth token', Spotify.authToken);
  }, [Spotify.authToken]);

  React.useEffect(() => {
    if (user) {
      /*
      const timer = setInterval(() => {

      }, 100 * 2000);
      */

      console.log('yeet');

      return () => {
        console.log('eehhh');
        // clearInterval(timer);
      };
    }
  }, [user]);

  return (
    <Content>
      <Container>
        {!userNotFound && !user && <Text as="h1">Loading...</Text>}
        {userNotFound && !user && <Text as="h1">No user</Text>}
        {user && (
          <>
            <UserProfileName>
              <Text type="h1" as="h3">
                {user.username}
              </Text>
            </UserProfileName>

            <div>
              <NowPlaying />
              <RecentlyPlayed />
            </div>
          </>
        )}
      </Container>
    </Content>
  );
};

export default User;
