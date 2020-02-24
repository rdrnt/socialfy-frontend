import React from 'react';
import styled from 'styled-components';
import Text from '../../Text';
import config from '../../../config';
import { Style } from '../../../helpers';

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
  flex-direction: column;
  align-items: center;
  text-align: center;
  > span {
    margin-bottom: ${config.spacing / 2}px;
  }

  &:not(:first-child):not(:last-child) {
    flex-grow: 1;
    margin: 0 ${config.spacing}px;
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
      flex-grow: 1;
      margin: ${config.spacing}px 0;
    }

    &:first-child {
      border-right: none;
      border-bottom: 1px solid white;
    }

    &:last-child {
      border-left: none;
      border-top: 1px solid white;
    }
  `};
`;

const formatPercentage = percentage => {
  const rounded = percentage * 100;
  return rounded.toFixed(0);
};

const getDescriptionForStat = stat => {
  switch (stat) {
    case 'dancibility':
      return 'how suitable a track is for dancing';
    case 'energy':
      return 'energetic tracks feel fast, loud, and noisy';
    case 'positivity':
      return 'the musical positiveness conveyed';
    default:
      return '';
  }
};

const AudioStats = ({ stats }) => {
  return (
    <Container>
      {Object.keys(stats).map(stat => (
        <Stat key={stat}>
          <Text as="h5">{stat}</Text>
          <Text as="span">{getDescriptionForStat(stat)}</Text>
          <Text as="p">{formatPercentage(stats[stat])}/100</Text>
        </Stat>
      ))}
    </Container>
  );
};

export default AudioStats;
