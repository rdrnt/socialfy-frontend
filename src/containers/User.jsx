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

const isUserSpotifyEmpty = userSpotify => {
  // Creates an array full of booleans if there are any issues
  // Then filters out all the non-true errors
  const errors = Object.keys(userSpotify)
    .map(key => {
      const value = userSpotify[key];
      if (value instanceof Array && value.length === 0) {
        return true;
      }

      return false;
    })
    .filter(errorValue => Boolean(errorValue));

  // If we have the same amount of errors that we do spotify items
  // clearly we have no data
  return errors.length === Object.keys(userSpotify).length;
};

let firebaseUserListener = undefined;

const User = ({ match }) => {
  const [user, setUser] = React.useState(undefined);
  const [userError, setUserError] = React.useState(''); // can be 'NOT_FOUND', 'NO_DATA'

  const uiContext = React.useContext(UIContext);

  const refreshUserSpotify = async userToRefresh => {
    console.log('Refreshing user spotify...');
    await API.refreshUserSpotifyInfo(userToRefresh.profile.username);
  };

  // Runs when we get a new username in the url
  useEffectAsync(async () => {
    // Get the username to search for
    const usernameToSearch = match.params.userId;
    // Get the users firebase profile
    const firebaseUser = await Firebase.getUser(usernameToSearch);

    // If we have a user, initialize the user listener & set initial data
    if (firebaseUser) {
      // Refresh their spotify on first load
      await refreshUserSpotify(firebaseUser);
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
      setUserError('NOT_FOUND');
    }
  }, [match.params.userId]);

  // When the user changes (i.e auth info, username, etc), or we dont have a user
  React.useEffect(() => {
    console.log('User effect', user);
    if (user) {
      // Check if they have no spotify data
      const isSpotifyEmpty = isUserSpotifyEmpty(user.spotify);
      console.log('Is spotify empty', isSpotifyEmpty);
      if (isSpotifyEmpty) setUserError('NO_DATA');

      // Create the timer to fetch spotify data every 20 minutes
      const updateSpotifyTimer = setInterval(async () => {
        await refreshUserSpotify(user);
      }, 90 * 1000);

      return () => {
        console.log('User changed effect goodbye');
        // Remove the listener
        if (firebaseUserListener) {
          firebaseUserListener();
          firebaseUserListener = undefined;
        }
        // Remove the profile from the header
        uiContext.header.showProfile(undefined);
        // Remove the refresh timer
        clearInterval(updateSpotifyTimer);
      };
    }
  }, [user]);

  React.useEffect(() => {
    if (userError === '' && !user) {
      // open the laoder
      uiContext.loader.show('Loading...');
    } else if (userError !== '') {
      uiContext.loader.close();
    }
  }, [user, userError]);

  const renderUserError = () => {
    if (userError === 'NOT_FOUND') {
      return <Text as="h1">User not found</Text>;
    }
    if (userError === 'NO_DATA') {
      return <Text as="h1">No data for user</Text>;
    }
    return null;
  };

  return (
    <Content>
      <Container>
        {userError && renderUserError()}
        {user && !userError && (
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
