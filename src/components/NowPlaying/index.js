import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Container from '../container';

const DESKTOP_HEIGHT = 400;

const MOBILE_HEIGHT = 400;

const Content = styled.div`
  background-color: blue;
  height: 400px;
  width: 100%;

  > div {
    height: 100%;
    width: 100%;
  }
`;

const AlbumArt = styled.img`
  height: 300px;
  width: 300px;
  background-color: red;
`;

const NowPlaying = ({ image }) => {
  return (
    <Content>
      <AlbumArt src={image.large} alt="album art" />
    </Content>
  );
};

NowPlaying.propTypes = {
  title: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(PropTypes.string).isRequired,
  album: PropTypes.string.isRequired,
  image: PropTypes.objectOf({
    small: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired,
  }).isRequired,
};

export default NowPlaying;
