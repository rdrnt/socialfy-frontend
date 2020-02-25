import React from 'react';
import styled from 'styled-components';
import Text from '../../Text';
import config from '../../../config';
import { Style } from '../../../helpers';
import Icon from '../../Icon';

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;

  ${Style.size.mobile`
    flex-direction: column;
  `};
`;

const Stat = styled.div`
  display: flex;
  flex-basis: 33%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > span {
    margin-bottom: ${config.spacing / 2}px;
  }

  &:not(:first-child):not(:last-child) {
    padding: 0 ${config.spacing}px;
  }

  &:first-child {
    border-right: 1px solid white;
  }

  &:last-child {
    border-left: 1px solid white;
  }

  ${Style.size.mobile`
    flex-direction: column;

    &:not(:first-child):not(:last-child) {
      padding: ${config.spacing / 2}px 0;
    }

    &:first-child {
      border-right: none;
      border-bottom: 1px solid white;
      padding-bottom: ${config.spacing / 2}px;
    }

    &:last-child {
      border-left: none;
      border-top: 1px solid white;
      padding-top: ${config.spacing / 2}px;
    }
  `};
`;

const PlayerButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    > svg {
      fill: ${config.colors.primary};
    }
  }
`;

const AudioMeta = ({ stats }) => {
  const [player, setPlayer] = React.useState({
    audio: new Audio(stats.previewUrl),
    playing: false,
  });

  const play = () => {
    player.audio.play();
    setPlayer({
      ...player,
      playing: true,
    });
  };

  const pause = () => {
    player.audio.pause();
    setPlayer({
      ...player,
      playing: false,
    });
  };

  return (
    <Container>
      <Stat>
        <Text as="h5">bpm</Text>
        <Text as="span">the song tempo</Text>
        <Text as="p">{stats.bpm}</Text>
      </Stat>
      <Stat>
        <Text as="h5">preview</Text>
        <PlayerButton type="button" onClick={player.playing ? pause : play}>
          <Icon
            name={player.playing ? 'pause' : 'play'}
            color={config.colors.background}
            size={15}
          />
        </PlayerButton>
      </Stat>
      <Stat>
        <Text as="h5">popularity</Text>
        <Text as="span">how popular the song is globally</Text>
        <Text as="p">{stats.popularity}/100</Text>
      </Stat>
    </Container>
  );
};

export default AudioMeta;
