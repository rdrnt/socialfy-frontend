import React from 'react';
import styled from 'styled-components';
import Text, { DefaultTextStyles } from '../Text';

const Name = styled.a`
  text-decoration: none;
  ${props => DefaultTextStyles[props.tagStyle]};
  color: white;

  :hover {
    text-decoration: underline;
  }
`;

const ArtistName = ({ url, name, tagStyle = 'p' }) => (
  <Name href={url} tagStyle={tagStyle}>
    {name}
  </Name>
);

export const createArtistNames = (artists = []) => {
  const artistNames = artists.map((artist, index) => {
    const isLastItem = index + 1 === artist.length;

    return (
      <ArtistName
        key={artist.url}
        url={artist.url}
        name={`${artist.name}${isLastItem ? '' : ', '}`}
      />
    );
  });

  console.log('idk', artistNames);
};

export default ArtistName;
