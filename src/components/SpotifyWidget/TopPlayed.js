import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

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

const TopPlayed = ({ songs, ...rest }) => {
  return (
    <SpotifyWidgetLayout
      title="Top Played"
      error={Boolean(songs.length)}
      {...rest}
    >
      <Content>
        {songs.length && (
          <PoseGroup animateOnMount={true}>
            {songs.map(item => (
              <SpotifyCard
                key={item.url}
                url={item.url}
                albumArt={item.album.albumArt}
                name={item.name}
                artists={item.artists}
              />
            ))}
          </PoseGroup>
        )}
      </Content>
    </SpotifyWidgetLayout>
  );
};

TopPlayed.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default TopPlayed;
