import React from 'react';
import styled from 'styled-components';

import Text from '../Text';

import { getProfileImage } from '../../helpers';
import config from '../../config';
import Icon from '../Icon';

const RootContainer = styled.div`
  width: 100%;
  background-color: ${config.colors.background};
`;

const BarContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding-bottom: ${config.spacing}px;

  > p {
    font-weight: bold;
  }
`;

const Items = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const IconLink = styled.a`
  padding: 0;
  margin: 0;
  height: 25px;
  margin-right: ${config.spacing / 2}px;
`;

const IconButton = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  height: 25px;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

const HeaderProfileContent = ({ profile, openModal }) => {
  return (
    <RootContainer>
      <BarContent>
        <Items>
          <ProfileImage src={getProfileImage(profile.image)} />
          <Text as="p">{profile.username}</Text>
        </Items>
        <Items>
          <IconLink
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="spotify" color={config.colors.primary} />
          </IconLink>
          <IconButton
            type="button"
            onClick={() =>
              openModal('USER_SHARE', { username: profile.username })
            }
          >
            <Icon name="qrcode" color={config.colors.primary} />
          </IconButton>
        </Items>
      </BarContent>
    </RootContainer>
  );
};

export default HeaderProfileContent;
