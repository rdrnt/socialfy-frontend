import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SpotifyWidgetLayout from '../Layout';

import NowPlayingInfo from './Info';
import SlideIndicator from './SlideIndicator';

import Icon from '../../Icon';

const Layout = styled.div`
  height: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SideButton = styled.button`
  height: 100%;
  width: 10%;
  padding: 0;
  margin: 0;
  border: none;
  background-color: green;
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

const NowPlaying = ({ song, ...rest }) => {
  const [currentSlide, setNextSlide] = React.useState(0);
  const [amountOfSlides, setAmountOfSlides] = React.useState(0);

  const goToNextSlide = () => {
    if (currentSlide === amountOfSlides) {
      setNextSlide(0);
    } else {
      setNextSlide(currentSlide + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide === 0) {
      setNextSlide(amountOfSlides);
    } else {
      setNextSlide(currentSlide - 1);
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

  const renderSlideContent = () => {
    const getSlide = () => {
      switch (currentSlide) {
        case 0:
          return <NowPlayingInfo song={song} />;
        case 1:
          return <Slide1 />;
        case 2:
          return <Slide2 />;
        default:
          return null;
      }
    };

    return (
      <>
        <SideButton onClick={goToPreviousSlide}>
          <Icon name="x" />
        </SideButton>
        {getSlide()}
        <SideButton onClick={goToNextSlide}>
          <Icon name="x" />
        </SideButton>
      </>
    );
  };

  return song ? (
    <SpotifyWidgetLayout title="Now Playing" error={!song} {...rest}>
      {/* If we have slides, render the slide content. If not, render the now playing */}
      <Layout>
        {amountOfSlides > 0 ? (
          renderSlideContent()
        ) : (
          <NowPlayingInfo song={song} />
        )}
      </Layout>
      {amountOfSlides > 0 && (
        <SlideIndicator
          current={currentSlide}
          numberOfSlides={amountOfSlides}
        />
      )}
    </SpotifyWidgetLayout>
  ) : null;
};

NowPlaying.propTypes = {
  song: PropTypes.object,
};

export default NowPlaying;
