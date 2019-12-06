const API_URL = 'https://api.spotify.com/v1/me';

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

        console.log(item);

        const nowPlaying = {
          title: '',
          artist: '',
          album: '',
          imageUrl: '',
        };

        // Set the title
        nowPlaying.title = item.name;
        // Set the artist
        const songArtists = item.artists.map(artistItem => artistItem.name);
        nowPlaying.artist = songArtists.join(', ');
        // Set the album name
        nowPlaying.album = item.album.name;
        // Set the album art
        nowPlaying.imageUrl = item.album.images[0]
          ? item.album.images[0].url
          : '';

        return nowPlaying;
      }

      return undefined;
    } catch (error) {
      console.log('Error getting currently playing', error);
    }
  },
};

export default Spotify;
