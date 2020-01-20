import Environment from './env';

const API = {
  getUserSpotify: async profileName => {
    try {
      const request = await fetch(`${Environment.config.API_URL}/getProfile`, {
        method: 'POST',
        body: JSON.stringify({
          profile: profileName,
        }),
      });

      if (request.status === 200) {
        return await request.json();
      }

      return undefined;
    } catch (error) {
      console.log('Error', error);
      return undefined;
    }
  },
};

export default API;
