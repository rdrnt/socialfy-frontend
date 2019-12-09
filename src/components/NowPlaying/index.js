import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Container from '../container';
import Text from '../Text';

const DESKTOP_HEIGHT = 400;

const MOBILE_HEIGHT = 400;

const Content = styled.div`
  border-bottom: 1px blue solid;
  height: 400px;
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const AlbumArt = styled.img`
  height: 300px;
  width: 300px;
  background-color: red;
`;

const SongInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  margin-left: 20px;

  > p {
    margin-top: 10px;
  }
`;

const NowPlaying = ({ song }) => {
  return (
    <Content>
      <AlbumArt src={song.album.art} alt="album art" />
      <SongInfo>
        <Text as="h2">{song.name}</Text>
      </SongInfo>
    </Content>
  );
};

NowPlaying.propTypes = {};

export default NowPlaying;
