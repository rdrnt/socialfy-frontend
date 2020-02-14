import React from 'react';
import styled from 'styled-components';

import Text from '../../Text';
import ArtistNames from '../../Artist';

import { Style } from '../../../helpers';
import config from '../../../config';

const Content = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${Style.size.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const AlbumArt = styled.img`
  height: 250px;
  width: 250px;
  background-color: ${config.colors.primary};

  ${Style.size.mobile`
    width: 100%;
    height: 80%;
  `};

  margin: 0 10px 0 0;
`;

const SongInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > p {
    ${Style.size.mobile`
      margin-top: 5px;
    `}
  }
`;

const NowPlayingInfo = ({ song }) => (
  <Content>
    <AlbumArt src={song.album.albumArt} alt="album art" />
    <SongInfo>
      <Text as="h3">{song.name}</Text>
      <Text as="span">
        <ArtistNames artists={song.artists} tagStyle="p" />
      </Text>
    </SongInfo>
  </Content>
);

export default NowPlayingInfo;
