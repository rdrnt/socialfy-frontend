import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import posed, { PoseGroup } from 'react-pose';
import { BeatLoader } from 'react-spinners';

import Text from '../Text';

import config from '../../config';

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${config.colors.background};
  z-index: ${config.zIndex.MAX};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnimatedLoader = posed(Content)({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    delay: 500,
  },
});

const Loader = ({ open, message }) => {
  return (
    <PoseGroup>
      {open && (
        <AnimatedLoader key="loader">
          <Text as="h1">{message}</Text>
          <BeatLoader color={config.colors.primary} />
        </AnimatedLoader>
      )}
    </PoseGroup>
  );
};

Loader.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Loader;
