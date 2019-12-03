const Environment = {
  isDevelopment:
    Boolean(process.env.NODE_ENV) && process.env.NODE_ENV === 'development',
  config: {
    API_URL: 'https://us-central1-sharify-5fb5c.cloudfunctions.net/api',
  },
};

export default Environment;
