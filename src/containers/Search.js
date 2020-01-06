import React from 'react';
import styled from 'styled-components';

import Container from '../components/container';
import Text from '../components/Text';

import config from '../config';
import { DefaultTextStyles } from '../components/Text/index';

const Content = styled.div`
  height: calc(100vh - 70px);
  width: 100%;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    > h1 {
      margin-top: 15px;
    }
  }
`;

const SearchBox = styled.input`
  width: 100%;
  max-width: 800px;
  height: 50px;
  background-color: white;
  padding: 0 ${config.spacing}px;
  border-radius: 8px;

  ${DefaultTextStyles['p']};
  font-weight: 600;
`;

const Search = () => {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <Content>
      <Container>
        <Text as="h1">Search for users</Text>
        <SearchBox
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
      </Container>
    </Content>
  );
};

export default Search;
