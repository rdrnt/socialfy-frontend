import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SpotifyWidgetLayout, { listItemAnimationProps } from './Layout';
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

const TopPlayed = ({ songs, ...rest }) => {
  return (
    <SpotifyWidgetLayout
      title="Top Played"
      error={Boolean(songs.length === 0)}
      {...rest}
    >
      <Content>
        {songs.map((item, index) => (
          <SpotifyCard
            key={item.url}
            url={item.url}
            albumArt={item.album.albumArt}
            name={item.name}
            artists={item.artists}
            {...listItemAnimationProps(index)}
          />
        ))}
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

TopPlayed.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default TopPlayed;
