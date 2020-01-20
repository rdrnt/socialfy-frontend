import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text, { DefaultTextStyles } from '../Text';
import SpotifyWidgetLayout from './Layout';

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
// was working on making the items even on mobile and desktop

const SongContent = styled.div`
  min-height: 250px;
  width: 200px;
  padding: 20px;
  border-radius: 8px;
  background-color: ${config.colors.backgroundSecondary};

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  :not(:last-child) {
    margin-right: 10px;
  }

  > img {
    border-radius: 2px;
    margin-bottom: 5px;
    height: 160px;
    width: 160px;
  }
`;

const RecentlyPlayed = ({ songs, ...rest }) => {
  return (
    <SpotifyWidgetLayout
      title="Recently Played"
      error={Boolean(songs.length)}
      {...rest}
    >
      <Content>
        {songs.length ? (
          songs.map((item, index) => (
            <SongContent key={item.url + index}>
              <img src={item.album.albumArt} alt="" />
              <Text type="p" as="h6">
                {item.name}
              </Text>
              <Text as="span">
                <ArtistNames artists={item.artists} tagStyle="span" />
              </Text>
            </SongContent>
          ))
        ) : (
          <Text as="span">Nothing listened too</Text>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

RecentlyPlayed.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default RecentlyPlayed;
