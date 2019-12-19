import React from 'react';
import styled from 'styled-components';

import SpotifyWidgetLayout from './Layout';
import Text from '../Text';
import ArtistNames from '../Artist';
import { Style } from '../../helpers';
import config from '../../config';

import NoSpotifyImage from '../../assets/nospot.png';
import { SpotifySongProp } from '../../helpers/spotify';

const Content = styled.div`
  width: 100%;

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
  height: 300px;
  width: 300px;
  background-color: ${config.colors.primary};

  margin: 0 20px 0 0;

  ${Style.size.mobile`
    margin: 0 0 20px 0;
  `}
`;

const SongInfo = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  > p {
    margin-top: 10px;
    ${Style.size.mobile`
      margin-top: 5px;
    `}
  }
`;

const NowPlaying = ({ song, ...rest }) => {
  return (
    <SpotifyWidgetLayout
      title="Now Playing"
      error={Boolean(song)}
      small={true}
      {...rest}
    >
      <Content>
        {song ? (
          <>
            <AlbumArt src={song.album.art} alt="album art" />
            <SongInfo>
              <Text as="h2">{song.name}</Text>
              <Text as="p">
                <ArtistNames artists={song.artists} tagStyle="h5" />
              </Text>
              <Text as="span">{song.album.name}</Text>
            </SongInfo>
          </>
        ) : (
          <>
            <AlbumArt src={NoSpotifyImage} alt="album art" />
            <SongInfo>
              <Text as="h2">No song playing</Text>
              <Text as="h5">Unavailable</Text>
              <Text as="span">Unavailable</Text>
            </SongInfo>
          </>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

NowPlaying.propTypes = {
  song: SpotifySongProp,
};

export default NowPlaying;
