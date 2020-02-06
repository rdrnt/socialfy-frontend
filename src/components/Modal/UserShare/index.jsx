import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import QRCode from 'qrcode.react';

import Text from '../../Text';
import Button from '../../Button';

import config from '../../../config';

const Content = styled.div`
  height: 75%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > * {
    margin: 0 ${config.spacing}px;
  }
`;

const UserShareModal = ({ data, close }) => {
  const downloadImageRef = React.useRef(null);

  const downloadImage = () => {
    const canvasNode = document.querySelector('canvas');

    if (canvasNode && downloadImageRef.current) {
      downloadImageRef.current.href = canvasNode.toDataURL();
      downloadImageRef.current.download = 'sharifyQrCode.png';
    }
  };

  return (
    <Content>
      <Text as="h3" type="h1">
        {`Share ${data.username}`}
      </Text>
      <QRCode
        value={window.location.toString()}
        bgColor={config.colors.background}
        fgColor={config.colors.primary}
        size={256}
      />
      <Text as="span" type="h2">
        {window.location.toString()}
      </Text>
      <ButtonRow>
        <a ref={downloadImageRef}>
          <Button label="Save to images" onClick={downloadImage} />
        </a>
        <Button label="Copy to clipboard" />
      </ButtonRow>
    </Content>
  );
};

export default UserShareModal;
