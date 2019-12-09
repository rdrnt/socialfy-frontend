import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from '../Text';
import { Spotify, Style } from '../../helpers';

const Content = styled.div`
  border-bottom: 1px blue solid;
  height: 400px;
  width: 100%;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  align-content: space-between;

  ${Style.size.mobile`
    flex: 1 1 auto;
    overflow-y: auto;
    width: auto;
    height: 200px;
  `}
`;

const SongContent = styled.div`
  height: 200px;
  width: 200px;
  background-color: green;
  margin: 2px;

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
    <Content>
      {recentlyPlayed.map(item => (
        <SongContent key={item.url}>
          <img src={item.album.art} />
        </SongContent>
      ))}
    </Content>
  );
};

RecentlyPlayed.propTypes = {};

export default RecentlyPlayed;
