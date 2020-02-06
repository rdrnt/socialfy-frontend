import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';
import {
  RecentlyPlayed,
  NowPlaying,
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

let firebaseUserListener = undefined;

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
      // Set the header to show the profile
      uiContext.header.showProfile(firebaseUser.profile);
      // Close the close the loader
      uiContext.loader.close();
      // Initialize the listener
      firebaseUserListener = Firebase.onUserChanged({
        id: firebaseUser.id,
        onChange: changedUser => {
          setUser(changedUser);
        },
      });
    } else {
      setUserNotFound(true);
    }
  }, [match.params.userId]);

  // When the user changes (i.e auth info, username, etc), or we dont have a user
  React.useEffect(() => {
    if (user) {
      refreshUserSpotify();

      // Create the timer to fetch spotify data every 20 minutes
      const updateSpotifyTimer = setInterval(async () => {
        await refreshUserSpotify();
      }, 90 * 1000);

      return () => {
        // Remove the listener
        if (firebaseUserListener) {
          firebaseUserListener();
          firebaseUserListener = undefined;
        }
        // Remove the profile from the header
        uiContext.header.showProfile(undefined);
        console.log('User changed effect goodbye');
        // Remove the refresh timer
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
          </div>
        )}
      </Container>
    </Content>
  );
};

export default User;
