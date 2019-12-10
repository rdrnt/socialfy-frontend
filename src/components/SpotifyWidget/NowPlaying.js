import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SpotifyWidgetLayout from './Layout';
import Text from '../Text';
import { Spotify } from '../../helpers';

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

const NowPlaying = ({}) => {
  const [nowPlaying, setNowPlaying] = React.useState(undefined);

  const loadCurrentlyPlaying = async () => {
    const currentlyPlaying = await Spotify.getCurrentlyPlaying();
    setNowPlaying(currentlyPlaying);
  };

  React.useEffect(() => {
    loadCurrentlyPlaying();
  }, []);

  return (
    <SpotifyWidgetLayout title="Now Playing">
      <Content>
        {nowPlaying ? (
          <>
            <AlbumArt src={nowPlaying.album.art} alt="album art" />
            <SongInfo>
              <Text as="h2">{nowPlaying.name}</Text>
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
