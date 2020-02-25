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

import { API } from '../helpers';
import { useFirebaseUser } from '../hooks';

const Content = styled.div`
  height: 100%;
  width: 100%;

  > div {
    height: auto;
    width: 100%;
  }
`;

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
    console.log('New user loaded');
    // Refresh their spotify on first load
    await refreshUserSpotify(newUser);
  };

  const [user, loading] = useFirebaseUser(match.params.userId, onNewUser);

  React.useEffect(() => {
    if (user) {
      // Set the user error to nothing
      setUserError('');

      // If the header isn't showing the profile, show it
      if (uiContext.header.profileToShow === undefined) {
        uiContext.header.showProfile(user.profile);
      }

      // Check if they have no spotify data
      const isSpotifyEmpty = isUserSpotifyEmpty(user.spotify);
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
    } else if (!user && !userError) {
      // If we don't have a user, and the error message isnt set
      setUserError('NOT_FOUND');
    }
  }, [user]);

  React.useEffect(() => {
    if (loading) {
      uiContext.loader.show('Loading...');
    } else if (!loading) {
      uiContext.loader.close();
    }
  }, [loading]);

  const renderUserError = () => {
    if (userError === 'NOT_FOUND') {
      return <Text as="h1">User not found</Text>;
    }
    if (userError === 'NO_DATA') {
      return <Text as="h1">No data for user</Text>;
    }
    return null;
  };

  return loading ? null : (
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
