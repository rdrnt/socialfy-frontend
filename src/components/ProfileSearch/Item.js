import React from 'react';
import styled from 'styled-components';

import config from '../../config';

const Content = styled.li`
  width: 100%;
  height: 60px;
  padding: ${config.spacing}px;
  margin: 0;
  border-radius: 8px;
  background-color: ${config.colors.backgroundSecondary};

  :hover {
    background-color: ${config.colors.primary};
  }
`;

const ProfileSearchResult = ({}) => {
  return <Content>hehe</Content>;
};

export default ProfileSearchResult;
