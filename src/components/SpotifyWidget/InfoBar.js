import React from 'react';
import styled from 'styled-components';
import config from '../../config';
import Icon from '../Icon';

const Content = styled.div`
  background-color: ${config.colors.background};
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoBar = () => {
  const [showingBarcode, setShowingBarcode] = React.useState(false);

  return (
    <Content>
      <Icon
        name="qrcode"
        color={
          showingBarcode
            ? config.colors.primary
            : config.colors.backgroundSecondary
        }
      />
    </Content>
  );
};

export default InfoBar;
