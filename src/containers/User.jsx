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
import useFirebaseUser from '../hooks/useFirebaseUser';

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

const User = ({ match }) => {
  const [userError, setUserError] = React.useState(''); // can be 'NOT_FOUND', 'NO_DATA'
  const uiContext = React.useContext(UIContext);

  const refreshUserSpotify = async userToRefresh => {
    console.log('Refreshing user spotify...');
    await API.refreshUserSpotifyInfo(userToRefresh.profile.username);
  };

  const onNewUser = async (previousUser, newUser) => {
    // Set the header to show the profile
    uiContext.header.showProfile(newUser.profile);
    // Refresh their spotify on first load
    await refreshUserSpotify(newUser);
  };

  const user = useFirebaseUser(match.params.userId, onNewUser);

  React.useEffect(() => {
    if (user) {
      // Close the loader if it's open
      if (uiContext.loader.open) {
        uiContext.loader.close();
      }

      // Check if they have no spotify data
      const isSpotifyEmpty = isUserSpotifyEmpty(user.spotify);
      console.log('Is spotify empty', isSpotifyEmpty);
      if (isSpotifyEmpty) setUserError('NO_DATA');

      // Create the timer to fetch spotify data every 20 minutes
      const updateSpotifyTimer = setInterval(async () => {
        await refreshUserSpotify(user);
      }, 90 * 1000);

      return () => {
        // Remove the refresh timer
        clearInterval(updateSpotifyTimer);

        // Remove the profile from the header
        uiContext.header.showProfile(undefined);
      };
    }
  }, [user]);

  React.useEffect(() => {
    // If when loading the page we have no error and no user, show the loader
    if (userError === '' && !user) {
      uiContext.loader.show('Loading...');
    } else if (userError !== '') {
      // if we have no user error, close the loader
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
