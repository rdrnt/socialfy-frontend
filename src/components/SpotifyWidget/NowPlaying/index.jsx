import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

import SpotifyWidgetLayout from '../Layout';

import NowPlayingInfo from './Info';
import SlideIndicator from './SlideIndicator';

const Layout = styled.div`
  height: 275px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Slide1 = styled.div`
  height: 100%;
  width: 100%;
  background-color: red;
`;

const Slide2 = styled.div`
  height: 100%;
  width: 100%;
  background-color: blue;
`;

const slideAnimation = {
  transition: {
    duration: 0.3,
  },
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: -50,
  },
};

const NowPlaying = ({ song, ...rest }) => {
  const [currentSlide, setNextSlide] = React.useState(0);
  const [amountOfSlides, setAmountOfSlides] = React.useState(0);

  const switchSlide = type => {
    if (type === 'next') {
      if (currentSlide === amountOfSlides) {
        setNextSlide(0);
      } else {
        setNextSlide(currentSlide + 1);
      }
    }

    if (type === 'previous') {
      if (currentSlide === 0) {
        setNextSlide(amountOfSlides);
      } else {
        setNextSlide(currentSlide - 1);
      }
    }
  };

  // Determine the amount of "slides"
  React.useEffect(() => {
    if (song && song.stats) {
      let slideCount = 0;

      if (song.stats.meta) slideCount++;
      if (song.stats.audio) slideCount++;

      if (slideCount !== amountOfSlides) {
        setAmountOfSlides(slideCount);
      }
    }
  }, [song]);

  const renderSlide = (slideIndex, props) => {
    const getSlide = index => {
      switch (index) {
        case 0:
          return <NowPlayingInfo song={song} {...props} />;
        case 1:
          return <Slide1 {...props} />;
        case 2:
          return <Slide2 {...props} />;
        default:
          return null;
      }
    };

    return (
      <AnimatePresence exitBeforeEnter={true} initial={false}>
        <motion.div
          key={slideIndex}
          {...slideAnimation}
          style={{ height: '100%', width: '100%' }}
        >
          {getSlide(slideIndex)}
        </motion.div>
      </AnimatePresence>
    );
  };

  return song ? (
    <SpotifyWidgetLayout title="Now Playing" error={!song} {...rest}>
      {/* If we have slides, render the slide content. If not, render the now playing */}
      <Layout>
        {amountOfSlides > 0 ? (
          renderSlide(currentSlide)
        ) : (
          <NowPlayingInfo song={song} />
        )}
      </Layout>
      {amountOfSlides > 0 && (
        <SlideIndicator
          current={currentSlide}
          numberOfSlides={amountOfSlides}
          switchSlide={switchSlide}
        />
      )}
    </SpotifyWidgetLayout>
  ) : null;
};

NowPlaying.propTypes = {
  song: PropTypes.object,
};

export default NowPlaying;
