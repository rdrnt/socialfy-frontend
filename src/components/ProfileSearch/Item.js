import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Text from '../Text';

import { getProfileImage } from '../../helpers';

import config from '../../config';

const Content = styled.li`
  width: 100%;
  height: 60px;
  margin: 0;
  border-radius: 8px;
  background-color: ${config.colors.backgroundSecondary};

  display: flex;
  align-items: center;
  justify-content: flex-start;

  :hover {
    background-color: ${config.colors.primary};
  }
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: ${config.spacing}px;
`;

const ProfileSearchResult = ({ image, username }) => {
  return (
    <Link to={`/${username}`} style={{ textDecoration: 'none' }}>
      <Content>
        <ProfileImage src={getProfileImage(image)} />
        <Text as="h4">{username}</Text>
      </Content>
    </Link>
  );
};

export default ProfileSearchResult;
