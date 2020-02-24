import React from 'react';
import { AiOutlineQrcode } from 'react-icons/ai';
import { MdSearch, MdClose } from 'react-icons/md';
import {
  FaSpotify,
  FaPlay,
  FaPause,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

import config from '../../config';

const IconTable = {
  qrcode: <AiOutlineQrcode />,
  search: <MdSearch />,
  x: <MdClose />,
  spotify: <FaSpotify />,
  'arrow-left': <FaArrowLeft />,
  'arrow-right': <FaArrowRight />,
  play: <FaPlay />,
  pause: <FaPause />,
};

const useHover = () => {
  const [hovering, setHovering] = React.useState(false);

  const returnValues = {
    onMouseOver: () => setHovering(true),
    onMouseOut: () => setHovering(false),
    onTouchEnd: () => setHovering(false),
    onTouchStart: () => setHovering(true),
  };

  return [hovering, returnValues];
};

const Icon = ({
  name = '',
  size = 25,
  color = 'white',
  onClick,
  disableHover = false,
  children,
}) => {
  const IconForName = IconTable[name];

  const [hovering, hoverProps] = useHover();

  return IconForName
    ? React.cloneElement(
        IconForName,
        {
          color: hovering && !disableHover ? config.colors.primary : color,
          size,
          onClick,
          ...hoverProps,
        },
        children
      )
    : null;
};

export default Icon;
