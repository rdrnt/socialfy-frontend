import React from 'react';
import styled from 'styled-components';
import config from '../../../config';
import { AnimatePresence, motion } from 'framer-motion';

const Container = styled.div`
  height: 30px;
  width: 100%;
  background-color: ${config.colors.background};
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  max-width: 150px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SlideDot = styled(motion.div)`
  height: 12px;
  width: 12px;
  border-radius: 7.5px;
`;

const animations = {
  selected: {
    opacity: 1,
    backgroundColor: 'white',
  },
  unselected: {
    opacity: 0.7,
    backgroundColor: config.colors.backgroundSecondary,
  },
};

const SlideIndicator = ({ current, numberOfSlides }) => {
  return (
    <Container>
      <Content>
        {[...Array(numberOfSlides + 1)].map((slide, index) => {
          const selected = current === index;
          return (
            <SlideDot
              key={index}
              selected={selected}
              animate={selected ? 'selected' : 'unselected'}
              variants={animations}
            />
          );
        })}
      </Content>
    </Container>
  );
};

export default SlideIndicator;
