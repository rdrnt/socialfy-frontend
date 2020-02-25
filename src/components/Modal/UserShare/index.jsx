import React from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode.react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Text from '../../Text';
import Button from '../../Button';

import config from '../../../config';
import { Environment } from '../../../helpers';

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  > * {
    padding: ${config.spacing}px 0;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > * {
    min-width: 120px;
    margin: 0 ${config.spacing}px;
  }
`;

const UserShareModal = ({ data, close }) => {
  const downloadImageRef = React.useRef(null);
  const [copiedTextShowing, showCopiedText] = React.useState(false);

  const profileUrl = Environment.getProfileUrl(data.username);

  const downloadImage = () => {
    const canvasNode = document.querySelector('canvas');

    if (canvasNode && downloadImageRef.current) {
      downloadImageRef.current.href = canvasNode.toDataURL();
      downloadImageRef.current.download = 'sharifyQrCode.png';
    }
  };

  const revealCopiedText = () => {
    showCopiedText(true);
    setTimeout(() => {
      showCopiedText(false);
    }, 1500);
  };

  return (
    <Content>
      <Text as="h3" type="h1">
        {`Share ${data.username}`}
      </Text>
      <QRCode
        value={profileUrl}
        bgColor={config.colors.background}
        fgColor={config.colors.primary}
        size={256}
      />
      <Text as="span" type="h2">
        {copiedTextShowing ? 'Copied' : profileUrl}
      </Text>
      <ButtonRow>
        <a ref={downloadImageRef}>
          <Button label="Save to images" onClick={downloadImage} />
        </a>
        <CopyToClipboard text={profileUrl} onCopy={revealCopiedText}>
          <Button label="Copy to clipboard" />
        </CopyToClipboard>
      </ButtonRow>
    </Content>
  );
};

export default UserShareModal;
