import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SpotifyWidgetLayout from './Layout';
import Text from '../Text';
import ArtistName from '../Artist';
import { Style } from '../../helpers';

const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  ${Style.size.mobile`
    flex-direction: column;
  `}
`;

const AlbumArt = styled.img`
  height: 300px;
  width: 300px;
  background-color: red;

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

  ${Style.size.mobile`
    align-items: center;
  `}

  > p {
    margin-top: 10px;
    ${Style.size.mobile`
      margin-top: 5px;
    `}
  }
`;

const NowPlaying = ({ song }) => {
  return (
    <SpotifyWidgetLayout title="Now Playing">
      <Content>
        {song ? (
          <>
            <AlbumArt src={song.album.art} alt="album art" />
            <SongInfo>
              <Text as="h3">{song.name}</Text>
              <Text as="p">
                {song.artists.map(artist => (
                  <ArtistName key={artist.name} {...artist} />
                ))}
              </Text>
              <Text as="span">{song.album.name}</Text>
            </SongInfo>
          </>
        ) : (
          <>
            <AlbumArt src="" alt="album art" />
            <SongInfo>
              <Text as="h2">Unavailable</Text>
            </SongInfo>
          </>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

NowPlaying.propTypes = {};

export default NowPlaying;
