import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';

import { Firebase, Spotify } from '../helpers';

const Content = styled.div`
  height: 100%;
  width: 100%;
`;

const User = ({ match }) => {
  const [error, setError] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);

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
      setUser(user);
      Spotify.setAuthToken(user.auth.accessToken);
      loadUserSpotify(user);
    }
  };

  React.useEffect(() => {
    const username = match.params.userId;

    if (username) {
      fetchUser(username);
    }
  }, [match.params.userId]);

  return (
    <Container>
      <Content>
        {!error && !user && <p>Loading...</p>}
        {error && <p>error</p>}
        {user && (
          <>
            <h1>{user.username}</h1>
            {spotifyNowPlaying && <p>{spotifyNowPlaying.title}</p>}
          </>
        )}
      </Content>
    </Container>
  );
};

export default User;
