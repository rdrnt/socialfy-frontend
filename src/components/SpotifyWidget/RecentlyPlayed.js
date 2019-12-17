import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text, { DefaultTextStyles } from '../Text';
import SpotifyWidgetLayout from './Layout';
import { Spotify, Style } from '../../helpers';
import ArtistName from '../Artist';

const Content = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const SongContent = styled.div`
  height: 250px;
  width: 200px;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  ${Style.size.mobile`
    height: 200px;
    width: 150px;
  `}

  > img {
    height: 200px;
    width: 200px;

    ${Style.size.mobile`
      height: 150px;
      width: 150px;
    `}
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
                {item.artists.map((artist, index) => (
                  <ArtistName key={artist.name} {...artist} />
                ))}
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
