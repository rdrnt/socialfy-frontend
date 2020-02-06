import React from 'react';
import styled from 'styled-components';
import { DefaultTextStyles } from '../Text';

const Name = styled.a`
  text-decoration: none;
  ${props => DefaultTextStyles[props.tagStyle]};
  color: white;

  :hover {
    text-decoration: underline;
  }
`;

const ArtistNames = ({ artists = [], tagStyle = 'p' }) =>
  artists.map((artist, index) => {
    const isNotLastItem = Boolean(artists.length - 1 === index);

    return (
      <Name
        key={artist.url}
        href={artist.url}
        tagStyle={tagStyle}
        target="_blank"
        rel="noopener noreferrer"
      >
        {artist.name}
        {!isNotLastItem && `, `}
      </Name>
    );
  });

export default ArtistNames;
