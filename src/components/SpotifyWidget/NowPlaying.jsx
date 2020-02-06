import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SpotifyWidgetLayout from './Layout';
import Text from '../Text';
import ArtistNames from '../Artist';
import { Style } from '../../helpers';
import config from '../../config';

import NoSpotifyImage from '../../assets/nospot.png';

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
  height: 250px;
  width: 250px;
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
            <AlbumArt src={song.album.albumArt} alt="album art" />
            <SongInfo>
              <Text as="h3">{song.name}</Text>
              <Text as="span">
                <ArtistNames artists={song.artists} tagStyle="p" />
              </Text>
            </SongInfo>
          </>
        ) : (
          <>
            <AlbumArt src={NoSpotifyImage} alt="album art" />
            <SongInfo>
              <Text as="h3">No song playing</Text>
              <Text as="span">Unavailable</Text>
            </SongInfo>
          </>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

NowPlaying.propTypes = {
  song: PropTypes.object,
};

export default NowPlaying;
