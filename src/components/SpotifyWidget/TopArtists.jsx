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

const TopArtists = ({ artists, ...rest }) => {
  return (
    <SpotifyWidgetLayout
      title="Top Artists"
      error={Boolean(artists.length)}
      {...rest}
    >
      <Content>
        {artists.length && (
          <AnimatePresence initial={true}>
            {artists.map(artist => (
              <SpotifyCard
                key={artist.url}
                url={artist.url}
                albumArt={artist.image}
                name={artist.name}
              />
            ))}
          </AnimatePresence>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

TopArtists.propTypes = {
  artists: PropTypes.array.isRequired,
};

export default TopArtists;
