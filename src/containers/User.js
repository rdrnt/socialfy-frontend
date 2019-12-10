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

const reducer = (state, action) => {
  switch (action.type) {
    case 'NOW_PLAYING':
      return { ...state, nowPlaying: action.payload };
    case 'RECENTLY_PLAYED':
      return { ...state, recentlyPlayed: action.payload };
    default:
      return { ...state };
  }
};

const User = ({ match }) => {
  const [user, setUser] = React.useState(undefined);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const [spotify, dispatch] = React.useReducer(reducer, {
    nowPlaying: undefined,
    recentlyPlayed: [],
  });

  const [sectionName, setSectionName] = React.useState('');

  const getSpotify = async () => {
    const nowPlaying = await Spotify.getCurrentlyPlaying();
    dispatch({ type: 'NOW_PLAYING', payload: nowPlaying });

    const recentlyPlayed = await Spotify.getRecentlyPlayed();
    dispatch({ type: 'RECENTLY_PLAYED', payload: recentlyPlayed });
  };

  const fetchUser = async username => {
    const user = await Firebase.getUser(username);

    if (user) {
      // Set the user in the state
      setUser(user);

      // Set the spotify auth token
      Spotify.setAuthToken(user.auth.accessToken);

      getSpotify();
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
      const timer = setInterval(async () => {
        await getSpotify();
      }, 50 * 1000);

      return () => {
        clearInterval(timer);
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
                {sectionName || user.username}
              </Text>
            </UserProfileName>

            <div id="spotifyContent">
              <NowPlaying song={spotify.nowPlaying} />
              <RecentlyPlayed songs={spotify.recentlyPlayed} />
            </div>
          </>
        )}
      </Container>
    </Content>
  );
};

export default User;
