import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import Text from '../Text';

import ArtistNames from '../Artist';
import config from '../../config';

const Content = styled.a`
  min-height: 250px;
  width: 200px;
  padding: ${config.spacing * 2}px;
  border-radius: 8px;
  background-color: ${config.colors.backgroundSecondary};
  text-decoration: none;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  &:hover {
    background-color: rgba(39, 39, 39, 0.7);
  }

  :not(:last-child) {
    margin-right: 10px;
  }

  > img {
    border-radius: 2px;
    margin-bottom: 5px;
    height: 150px;
    width: 150px;
  }
`;

const AnimatedContent = posed(Content)({
  enter: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
});

const SpotifyCard = ({ albumArt, name, artists = [], url, ...rest }) => {
  return (
    <AnimatedContent
      key={name}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      <img src={albumArt} alt="" />
      <Text type="p" as="h6">
        {name}
      </Text>
      {Boolean(artists.length) && (
        <Text as="span">
          <ArtistNames artists={artists} tagStyle="span" />
        </Text>
      )}
    </AnimatedContent>
  );
};

SpotifyCard.propTypes = {
  albumArt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artists: PropTypes.array,
  url: PropTypes.string.isRequired,
};

export default SpotifyCard;
