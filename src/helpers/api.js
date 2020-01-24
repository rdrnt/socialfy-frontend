import Environment from './env';

const API = {
  refreshUserSpotifyInfo: async profileName => {
    try {
      await fetch(`${Environment.config.API_URL}/refreshUserSpotify`, {
        method: 'POST',
        body: JSON.stringify({
          profile: profileName,
        }),
      });
    } catch (error) {
      console.log('Error refreshing', error);
    }
  },
};

export default API;
