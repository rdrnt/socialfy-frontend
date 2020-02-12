import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { BeatLoader } from 'react-spinners';

import Text from '../Text';

import config from '../../config';

const Content = styled(motion.div)`
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

const animationConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    duration: 0.2,
  },
  exit: { opacity: 0 },
};

const Loader = ({ open, message }) => {
  return (
    <AnimatePresence>
      {open && (
        <Content key="loader" {...animationConfig}>
          <Text as="h1">{message}</Text>
          <BeatLoader color={config.colors.primary} />
        </Content>
      )}
    </AnimatePresence>
  );
};

Loader.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Loader;
