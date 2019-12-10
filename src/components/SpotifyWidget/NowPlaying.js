import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SpotifyWidgetLayout from './Layout';
import Text from '../Text';
import { Spotify } from '../../helpers';
import ArtistName from '../Artist';

const Content = styled.div`
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
    <SpotifyWidgetLayout title="Now Playing">
      <Content>
        {song ? (
          <>
            <AlbumArt src={song.album.art} alt="album art" />
            <SongInfo>
              <Text as="h2">{song.name}</Text>
              <Text as="p">
                {song.artists.map(artist => (
                  <ArtistName key={artist.name} {...artist} />
                ))}
              </Text>
              <Text as="span">{song.album.name}</Text>
            </SongInfo>
          </>
        ) : (
          <Text as="p">Nothing playing</Text>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

NowPlaying.propTypes = {};

export default NowPlaying;
