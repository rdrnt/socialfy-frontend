import React from 'react';
import styled from 'styled-components';
import config from '../../../config';
import { AnimatePresence, motion } from 'framer-motion';
import { Style } from '../../../helpers';
import Icon from '../../Icon';

const Container = styled.div`
  height: 30px;
  width: 100%;
  background-color: ${config.colors.background};

  margin-top: 20px;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  > :first-child {
    margin-right: 24px;
  }

  > :last-child {
    margin-left: 24px;
  }
`;

const SlideDot = styled(motion.div)`
  height: 12px;
  width: 12px;
  border-radius: 7.5px;
  background-color: ${props =>
    props.selected ? 'white' : config.colors.backgroundSecondary};
  margin: 0 5px;
`;

const SlideButton = styled.button`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: ${config.colors.primary};
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const animations = {
  selected: {
    opacity: 0.9,
  },
  unselected: {
    opacity: 0.5,
  },
};

const SlideIndicator = ({ current, numberOfSlides, switchSlide }) => {
  return (
    <Container>
      <Content>
        <SlideButton onClick={() => switchSlide('previous')}>
          <Icon
            name="arrow-left"
            size={13}
            color={config.colors.background}
            disableHover={true}
          />
        </SlideButton>
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
        <SlideButton onClick={() => switchSlide('next')}>
          <Icon
            name="arrow-right"
            size={13}
            color={config.colors.background}
            disableHover={true}
          />
        </SlideButton>
      </Content>
    </Container>
  );
};

export default SlideIndicator;
