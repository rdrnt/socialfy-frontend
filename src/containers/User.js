import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';
import {
  RecentlyPlayed,
  NowPlaying,
  InfoBar,
} from '../components/SpotifyWidget';
import { UIContext } from '../contexts';

import { Firebase, API } from '../helpers';

const Content = styled.div`
  height: 100%;
  width: 100%;

  > div {
    height: auto;
    width: 100%;
  }
`;

const spotifyReducer = (state, action) => {
  switch (action.type) {
    case 'NOW_PLAYING':
      return { ...state, nowPlaying: action.payload };
    case 'RECENTLY_PLAYED':
      return { ...state, recentlyPlayed: action.payload };
    default:
      return { ...state };
  }
};

function useEffectAsync(effect, inputs = []) {
  React.useEffect(() => {
    effect();
  }, inputs);
}

const User = ({ match }) => {
  const [user, setUser] = React.useState(undefined);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const uiContext = React.useContext(UIContext);

  const [spotify, dispatch] = React.useReducer(spotifyReducer, {
    nowPlaying: undefined,
    recentlyPlayed: [],
  });

  const getSpotify = async () => {
    const { nowPlaying, recentlyPlayed } = await API.getUserSpotify(
      user.username
    );

    if (nowPlaying) dispatch({ type: 'NOW_PLAYING', payload: nowPlaying });

    if (recentlyPlayed)
      dispatch({ type: 'RECENTLY_PLAYED', payload: recentlyPlayed });
  };

  // Runs when we get a new username in the url
  useEffectAsync(async () => {
    // Get the username to search for
    const usernameToSearch = match.params.userId;
    // Get the users firebase profile
    const firebaseUser = await Firebase.getUser(usernameToSearch);

    // If we have a user, initialize the user listener & set initial data
    if (firebaseUser) {
      // Set the header username
      uiContext.header.setSublabel(`${firebaseUser.username}'s profile`);
      // Initialize the listener
      const listener = Firebase.onUserChanged({
        id: firebaseUser.id,
        onChange: changedUser => {
          console.log('User changed', changedUser);
          setUser(changedUser);
        },
      });

      return () => {
        if (listener) {
          console.log('Removing listener');
          listener();
        }
        uiContext.header.setSublabel('');
      };
    } else {
      setUserNotFound(true);
    }
  }, [match.params.userId]);

  // When the user changes (i.e auth info, username, etc);
  React.useEffect(() => {
    if (user) {
      console.log('User changed useEffect');
      getSpotify();

      // Create the timer to fetch spotify data every 20 minutes
      const updateSpotifyTimer = setInterval(async () => {
        console.log('Refreshing spotify....', user);
        await getSpotify();
      }, 120 * 1000);

      return () => {
        console.log('User changed effect goodbye');
        clearInterval(updateSpotifyTimer);
      };
    }
  }, [user]);

  return (
    <Content>
      <Container>
        {!userNotFound && !user && <Text as="h1">Loading...</Text>}
        {userNotFound && !user && <Text as="h1">No user</Text>}
        {user && (
          <div id="spotifyContent">
            <NowPlaying song={spotify.nowPlaying} autoSize={true} />
            <RecentlyPlayed songs={spotify.recentlyPlayed} />
            <InfoBar />
          </div>
        )}
      </Container>
    </Content>
  );
};

export default User;
