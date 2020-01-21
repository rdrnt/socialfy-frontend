const checkIfDevelopment = () => {
  const override = false;

  if (override) {
    return true;
  } else {
    return (
      Boolean(process.env.NODE_ENV) && process.env.NODE_ENV === 'development'
    );
  }
};

const Environment = {
  isDevelopment: checkIfDevelopment(),
  config: {
    API_URL: checkIfDevelopment
      ? 'https://us-central1-sharify-dev.cloudfunctions.net/api'
      : 'https://us-central1-sharify-5fb5c.cloudfunctions.net/api',
  },
};

export default Environment;
