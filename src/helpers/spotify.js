import PropTypes from 'prop-types';

const API_URL = 'https://api.spotify.com/v1/me';

// https://stackoverflow.com/questions/19501441/remove-duplicate-objects-from-an-array-using-javascript
const removeDuplicatesFromObjArray = (arr, field) => {
  var u = [];
  arr.reduce(function(a, b) {
    if (a[field] !== b[field]) u.push(b);
    return b;
  }, []);
  return u;
};

// Pass in what the api song item looks like
// artists: array of artists from the api
// album: the album object from the api
const createSong = ({ href, name, artists = [], album }) => {
  // a song looks like
  /*
  { 
    url: string;
    albumArt: string;
    name: string;
    artist: [{ name: string, url: string }],
    album: {
      name: string;
      url: string;
    }
  }
  */

  return {
    url: href,
    name,
    artists: artists.map(artist => ({
      name: artist.name,
      url: artist.external_urls.spotify,
    })),
    album: {
      name: album.name,
      url: album.spotify,
      art: album.images[0].url,
    },
  };
};

const Spotify = {
  authToken: '',
  setAuthToken: token => {
    Spotify.authToken = token;
  },
  executeRequest: (endpoint, method = 'GET', headers = {}) => {
    if (!Spotify.authToken) {
      throw new Error('No auth token set');
    }

    const requestHeaders = {
      ...headers,
      Authorization: `Bearer ${Spotify.authToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return fetch(`${API_URL}${endpoint}`, {
      method,
      headers: requestHeaders,
    });
  },
  getCurrentlyPlaying: async () => {
    // Returns undefined, or the currently playing item
    try {
      const request = await Spotify.executeRequest('/player/currently-playing');

      if (request.status === 200) {
        const { item } = await request.json();

        return createSong(item);
      }

      return undefined;
    } catch (error) {
      console.log('Error getting currently playing', error);
    }
  },
  getRecentlyPlayed: async () => {
    // Returns an array of the past 5 songs the user listened too
    try {
      const request = await Spotify.executeRequest('/player/recently-played');

      if (request.status === 200) {
        const { items } = await request.json();

        let recentSongs = items.map(({ track }) => createSong(track));

        recentSongs = removeDuplicatesFromObjArray(recentSongs, 'url');

        recentSongs = removeDuplicatesFromObjArray(recentSongs, 'name');

        // Remove blank artists
        recentSongs = recentSongs.map(recentSong => ({
          ...recentSong,
          artists: recentSong.artists.filter(
            recentSongArtist => recentSongArtist !== ''
          ),
        }));

        console.log(recentSongs.slice(0, 8));

        return recentSongs.slice(0, 8);
      }

      return [];
    } catch (error) {
      return [];
    }
  },
};

export const SpotifySongProp = PropTypes.shape({
  url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  album: {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    art: PropTypes.string.isRequired,
  },
});

export default Spotify;
