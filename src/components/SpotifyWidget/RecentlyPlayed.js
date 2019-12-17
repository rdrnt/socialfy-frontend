import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text, { DefaultTextStyles } from '../Text';
import SpotifyWidgetLayout from './Layout';
import { Spotify, Style } from '../../helpers';
import ArtistNames from '../Artist';

const Content = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: space-around;
`;

const SongContent = styled.div`
  min-height: 250px;
  height: auto;
  width: 200px;

  position: relative;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  > img {
    height: 180px;
    width: 200px;
  }
`;

const SongNumber = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    ${DefaultTextStyles['span']};
    color: white;
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
              <SongNumber>
                <Text as="span" weight={600}>
                  {index + 1}
                </Text>
              </SongNumber>
              <img src={item.album.art} />
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

RecentlyPlayed.propTypes = {};

export default RecentlyPlayed;
