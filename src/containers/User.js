import React from 'react';

import { Firebase, Spotify } from '../helpers';

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

  if (error) {
    return <p>error</p>;
  }

  if (user) {
    return (
      <div>
        <h1>{user.username}</h1>
        {spotifyNowPlaying && <p>{spotifyNowPlaying.title}</p>}
      </div>
    );
  }

  return <div>Loading....</div>;
};

export default User;
