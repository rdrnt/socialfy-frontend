import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import Text from '../Text';
import config from '../../config';

const Container = styled(motion.div)`
  width: 100%;
  background-color: ${config.colors.background};
  /* border-bottom: 1px solid green; */
  height: auto;
  padding: ${config.spacing}px 0;

  > h2 {
    margin-bottom: ${config.spacing}px;
  }

  > div {
    width: 100%;
  }
`;

export const listItemAnimationProps = (index = 0) => ({
  custom: index,
  initial: 'hidden',
  variants: {
    visible: index => ({
      opacity: 1,
      transition: {
        delay: 0.2 * index,
      },
    }),
    hidden: {
      opacity: 0,
    },
  },
});

const animationVariant = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const SpotifyWidgetLayout = ({ children, title, error = false }) => (
  <Container
    variants={animationVariant}
    initial="hidden"
    animate={error ? 'hidden' : 'visible'}
  >
    {!error && (
      <>
        <Text as="h2">{title}</Text>
        {children}
      </>
    )}
  </Container>
);

export default SpotifyWidgetLayout;
