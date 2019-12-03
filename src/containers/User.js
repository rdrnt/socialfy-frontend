import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';

import { Firebase, Spotify } from '../helpers';
import config from '../config';

const Content = styled.div`
  height: 150vh;
  width: 100%;
`;

const UserProfileName = styled.div`
  position: sticky;
  top: 80px;
  left: 0;
  height: 70px;
  border-bottom: 1px solid red;
  width: 100%;
  background-color: ${config.colors.background};
`;

const User = ({ match }) => {
  const [user, setUser] = React.useState(undefined);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const [spotifyNowPlaying, setSpotifyNowPlaying] = React.useState(undefined);
  const [spotifyRecentlyPlayed, setSpotifyRecentlyPlayed] = React.useState(
    undefined
  );

  const loadUserSpotify = async user => {
    const nowPlaying = await Spotify.getCurrentlyPlaying();

    setSpotifyNowPlaying(nowPlaying);
  };

  const fetchUser = async username => {
    const user = await Firebase.getUser(username);

    if (user) {
      setUser(user);
      Spotify.setAuthToken(user.auth.accessToken);
      loadUserSpotify(user);
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

  return (
    <Container>
      <Content>
        {!userNotFound && !user && <h1>Loading...</h1>}
        {userNotFound && <h1>No user</h1>}
        {user && (
          <>
            <UserProfileName>
              <Text type="h1" as="h3">
                {user.username}
              </Text>
            </UserProfileName>
            <div>
              <Text as="p">Howdy</Text>
            </div>
          </>
        )}
      </Content>
    </Container>
  );
};

export default User;
