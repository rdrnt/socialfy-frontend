import React from 'react';
import styled from 'styled-components';
import Text from '../Text';
import config from '../../config';

const Container = styled.button`
  height: auto;
  min-height: 45px;
  min-width: 75px;
  background-color: white;
  border: none;
  margin: 0;
  padding: ${config.spacing}px;
  border-radius: 25px;

  > span {
    color: black;
  }

  &:hover {
    background-color: ${config.colors.background};
    border: 2px solid white;
    > span {
      color: white;
    }
  }
`;

const Button = ({ label, onClick }) => (
  <Container type="button" onClick={onClick}>
    <Text as="span" weight={600}>
      {label}
    </Text>
  </Container>
);

export default Button;
