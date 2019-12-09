import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';

import NowPlaying from '../components/NowPlaying';
import RecentlyPlayed from '../components/RecentlyPlayed';

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

const HeaderContainer = styled.div`
  width: 100%;
  background-color: black;
`;

const Header = ({ title }) => (
  <HeaderContainer>
    <Text as="h2">{title}</Text>
  </HeaderContainer>
);

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
      // Set the user in the state
      setUser(user);

      // Set the spotify auth token
      Spotify.setAuthToken(user.auth.accessToken);

      // Load what they're currently playing
      await loadUserSpotify(user);
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
              <Header title="Now Playing" />
              {spotifyNowPlaying ? (
                <NowPlaying song={spotifyNowPlaying} />
              ) : (
                <Text as="p">Nothing playing</Text>
              )}
              <Header title="Recently Played" />
              <RecentlyPlayed />
            </div>
          </>
        )}
      </Container>
    </Content>
  );
};

export default User;
