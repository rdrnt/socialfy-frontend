import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../Text';
import SpotifyWidgetLayout from './Layout';
import { Spotify, Style } from '../../helpers';

const Content = styled.div`
  border-bottom: 1px blue red;
  height: 300px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: space-evenly;
  overflow-y: hidden;
  overflow-x: auto;

  ${Style.size.mobile`
    flex: 1 1 auto;
    width: auto;
    height: 200px;
  `}

  div {
    &:first-child {
      margin-right: 5px;
    }

    &:last-child {
      margin-left: 5px;
    }
  }
`;

const SongContent = styled.div`
  height: 200px;
  width: 200px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  > img {
    height: 150px;
    width: 150px;
  }
`;

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = React.useState([]);

  const getRecentlyPlayed = async () => {
    const recent = await Spotify.getRecentlyPlayed();
    setRecentlyPlayed(recent);
  };

  React.useEffect(() => {
    getRecentlyPlayed();
  }, []);

  return (
    <SpotifyWidgetLayout title="Recently Played">
      <Content>
        {recentlyPlayed.map(item => (
          <SongContent key={item.url}>
            <img src={item.album.art} />
            <Text as="h6">{item.name}</Text>
            <Text as="span">{item.album.name}</Text>
          </SongContent>
        ))}
      </Content>
    </SpotifyWidgetLayout>
  );
};

RecentlyPlayed.propTypes = {};

export default RecentlyPlayed;
