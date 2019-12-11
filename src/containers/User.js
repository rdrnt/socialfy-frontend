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

function useEffectAsync(effect, inputs) {
  React.useEffect(() => {
    effect();
  }, inputs);
}

const User = ({ match }) => {
  const [user, setUser] = React.useState(undefined);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const [spotify, dispatch] = React.useReducer(reducer, {
    nowPlaying: undefined,
    recentlyPlayed: [],
  });

  const getSpotify = async () => {
    const nowPlaying = await Spotify.getCurrentlyPlaying();
    dispatch({ type: 'NOW_PLAYING', payload: nowPlaying });

    const recentlyPlayed = await Spotify.getRecentlyPlayed();
    dispatch({ type: 'RECENTLY_PLAYED', payload: recentlyPlayed });
  };

  useEffectAsync(async () => {
    // Get the username to search for
    const usernameToSearch = match.params.userId;
    const user = await Firebase.getUser(usernameToSearch);

    // If we have a user, initialize the update timer & user listener
    if (user) {
      // Initialize the listener
      const listener = Firebase.onUserChanged({
        id: user.id,
        onChange: changedUser => {
          setUser(changedUser);
        },
      });

      // Create the timer to fetch spotify data every 20 minutes
      const updateSpotifyTimer = setInterval(async () => {
        console.log('Refreshing spotify....');
        await getSpotify();
      }, 50 * 1000);

      return () => {
        if (listener) {
          console.log('Removing listener');
          listener();
        }
        clearInterval(updateSpotifyTimer);
      };
    } else {
      setUserNotFound(true);
    }
  }, [match.params.userId]);

  React.useEffect(() => {
    if (user) {
      Spotify.setAuthToken(user.auth.accessToken);
      getSpotify();
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
