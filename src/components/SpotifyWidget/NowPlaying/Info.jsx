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
    justify-content: space-evenly;
  `}
`;

const AlbumArt = styled.img`
  height: 250px;
  width: 250px;
  background-color: ${config.colors.primary};

  ${Style.size.mobile`
    height: 225px;
    width: 225px;
  `};

  margin: 0 ${config.spacing}px 0 0;
`;

const SongInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  ${Style.size.mobile`
    > h3 {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  `};

  > p {
    ${Style.size.mobile`
      margin-top: ${config.spacing / 2}px;
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
