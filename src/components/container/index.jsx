import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.45rem;
  height: 100%;
  width: 100%;
`;

const Container = ({ children }) => <Content>{children}</Content>;

export default Container;
