import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { useLocation } from 'react-router-dom';

import config from '../../config';
import Icon from '../Icon';

const Content = styled.div`
  background-color: ${config.colors.background};

  height: auto;
  width: 100%;
`;

const ButtonBar = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoContent = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${config.spacing}px 0;
`;

const IconButton = styled.button`
  padding: 0;
  margin: 0;
  border: none;
`;

const InfoBar = () => {
  const [showingBarcode, setShowingBarcode] = React.useState(true);

  return (
    <Content>
      {/*
      <ButtonBar>
        <IconButton
          type="button"
          onClick={() => setShowingBarcode(!showingBarcode)}
        >
          <Icon
            name="qrcode"
            color={
              showingBarcode
                ? config.colors.primary
                : config.colors.backgroundSecondary
            }
          />
        </IconButton>
      </ButtonBar>
      */}
      <InfoContent>
        {showingBarcode && (
          <QRCode
            value={window.location.toString()}
            bgColor={config.colors.background}
            fgColor={config.colors.primary}
          />
        )}
      </InfoContent>
    </Content>
  );
};

export default InfoBar;
