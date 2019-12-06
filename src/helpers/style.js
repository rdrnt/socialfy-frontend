import { css } from 'styled-components';

import config from '../config';

const Style = {
  size: Object.keys(config.breakpoints).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${config.breakpoints[label] / 16}em) {
        ${css(...args)};
      }
    `;

    acc[`MIN_${label}`] = (...args) => css`
      @media (min-width: ${config.breakpoints[label] / 16}em) {
        ${css(...args)};
      }
    `;

    return acc;
  }, {}),
};

export default Style;
