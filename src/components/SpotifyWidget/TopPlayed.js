import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text, { DefaultTextStyles } from '../Text';
import SpotifyWidgetLayout from './Layout';
import SpotifyCard from '../SpotifyCard';

import ArtistNames from '../Artist';
import config from '../../config';

const Content = styled.div`
  height: auto;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;

  overflow-y: auto;
  scrollbar-width: none;
`;

const TopPlayed = ({ songs, ...rest }) => {
  return (
    <SpotifyWidgetLayout
      title="Top Played"
      error={Boolean(songs.length)}
      {...rest}
    >
      <Content>
        {songs.length ? (
          songs.map((item, index) => (
            <SpotifyCard
              albumArt={item.album.albumArt}
              name={item.name}
              artists={item.artists}
            />
          ))
        ) : (
          <Text as="span">Nothing listened too</Text>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

TopPlayed.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default TopPlayed;
