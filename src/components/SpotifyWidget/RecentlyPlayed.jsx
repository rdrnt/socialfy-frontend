import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';

import SpotifyWidgetLayout from './Layout';

import SpotifyCard from '../SpotifyCard';

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

const RecentlyPlayed = ({ songs, ...rest }) => {
  return (
    <SpotifyWidgetLayout
      title="Recently Played"
      error={Boolean(songs.length === 0)}
      {...rest}
    >
      <Content>
        {songs.length && (
          <AnimatePresence initial={true}>
            {songs.map(item => (
              <SpotifyCard
                key={item.url}
                url={item.url}
                albumArt={item.album.albumArt}
                name={item.name}
                artists={item.artists}
              />
            ))}
          </AnimatePresence>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

RecentlyPlayed.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default RecentlyPlayed;
