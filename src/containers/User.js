import React from 'react';
import styled from 'styled-components';
import { BeatLoader } from 'react-spinners';
import posed, { PoseGroup } from 'react-pose';

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
import config from '../config';

const Content = styled.div`
  height: 100%;
  width: 100%;

  > div {
    height: auto;
    width: 100%;
  }
`;

const TempScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${config.colors.background};
  z-index: ${config.zIndex.MAX};
`;

const AnimatedTempScreen = posed(TempScreen)({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    delay: 500,
  },
});

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

  return (
    <Content>
      <Container>
        <PoseGroup>
          {!userNotFound && !user && (
            <AnimatedTempScreen key="loading">
              <Text as="h1">Loading...</Text>
              <BeatLoader color={config.colors.primary} />
            </AnimatedTempScreen>
          )}
          {userNotFound && !user && (
            <AnimatedTempScreen key="not found">
              <Text as="h1">No user</Text>
            </AnimatedTempScreen>
          )}
        </PoseGroup>
        {user && (
          <div id="spotifyContent">
            <NowPlaying song={user.spotify.nowPlaying} autoSize={true} />
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
