import React from 'react';
import styled from 'styled-components';
import Text, { DefaultTextStyles } from '../Text';

const Name = styled.a`
  text-decoration: none;
  ${DefaultTextStyles['p']};
  color: white;

  :hover {
    text-decoration: underline;
  }
`;

const ArtistName = ({ url, name }) => <Name href={url}>{name}</Name>;

export default ArtistName;
