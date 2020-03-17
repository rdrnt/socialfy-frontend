import ReactGA from 'react-ga';

const Analytics = {
  initialize: () => {
    const { REACT_APP_GA_ANALYTICS } = process.env;

    if (REACT_APP_GA_ANALYTICS) {
      ReactGA.initialize(REACT_APP_GA_ANALYTICS);
    } else {
      console.warn('NO ANALYTICS PROVIDED');
    }
  },
  pageView: path => {
    ReactGA.pageview(path);
  },
};

export default Analytics;
