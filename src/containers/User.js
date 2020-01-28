import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';
import {
  RecentlyPlayed,
  NowPlaying,
  InfoBar,
  TopPlayed,
  TopArtists,
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

function useEffectAsync(effect, inputs = []) {
  React.useEffect(() => {
    effect();
  }, inputs);
}

const User = ({ match }) => {
  const [user, setUser] = React.useState(undefined);
  const [userNotFound, setUserNotFound] = React.useState(false);

  const uiContext = React.useContext(UIContext);

  const refreshUserSpotify = async () => {
    console.log('Refreshing user spotify');
    await API.refreshUserSpotifyInfo(user.profile.username);
  };

  // Runs when we get a new username in the url
  useEffectAsync(async () => {
    // Get the username to search for
    const usernameToSearch = match.params.userId;
    // Get the users firebase profile
    const firebaseUser = await Firebase.getUser(usernameToSearch);

    // If we have a user, initialize the user listener & set initial data
    if (firebaseUser) {
      // Close the close the loader
      uiContext.loader.close();
      // Set the header username
      uiContext.header.setSublabel(
        `${firebaseUser.profile.username}'s profile`
      );
      // Initialize the listener
      const listener = Firebase.onUserChanged({
        id: firebaseUser.id,
        onChange: changedUser => {
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
      refreshUserSpotify();

      // Create the timer to fetch spotify data every 20 minutes
      const updateSpotifyTimer = setInterval(async () => {
        await refreshUserSpotify();
      }, 90 * 1000);

      return () => {
        console.log('User changed effect goodbye');
        clearInterval(updateSpotifyTimer);
      };
    }
  }, [user]);

  React.useEffect(() => {
    if (!userNotFound && !user) {
      // open the laoder
      uiContext.loader.open('Loading...');
    }
  }, [user, userNotFound]);

  return (
    <Content>
      <Container>
        {userNotFound && !user && <Text as="h1">No user</Text>}
        {user && (
          <div id="spotifyContent">
            <NowPlaying song={user.spotify.nowPlaying} />
            <RecentlyPlayed songs={user.spotify.recentlyPlayed} />
            <TopPlayed songs={user.spotify.topPlayed} />
            <TopArtists artists={user.spotify.topArtists} />
            <InfoBar />
          </div>
        )}
      </Container>
    </Content>
  );
};

export default User;
