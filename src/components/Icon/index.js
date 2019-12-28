import React from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';
import config from '../../config';

const IconTable = {
  qrcode: <AiOutlineQrcode />,
};

const Icon = ({
  name = '',
  size = 25,
  color = config.colors.primary,
  children,
}) => {
  const IconForName = IconTable[name];

  return IconForName
    ? React.cloneElement(
        IconForName,
        {
          color,
          size,
        },
        children
      )
    : null;
};

export default Icon;
