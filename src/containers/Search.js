import React from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom';

import Container from '../components/container';
import Text, { DefaultTextStyles } from '../components/Text';
import {
  ProfileSearchResult,
  ProfileSearchResults,
} from '../components/ProfileSearch';

import config from '../config';
import { Firebase } from '../helpers';

const Content = styled.div`
  height: calc(100vh - 70px);
  width: 100%;

  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    > h1 {
      margin-top: 15px;
    }
  }
`;

const SearchBox = styled.input`
  width: 100%;
  max-width: 400px;
  height: 40px;
  background-color: ${config.colors.backgroundSecondary};
  padding: 0 ${config.spacing}px;
  margin: ${config.spacing * 2}px 0;
  border-radius: 6px;

  color: white;
  ${DefaultTextStyles['p']};
  font-weight: 600;
`;

const Search = ({}) => {
  // the search value
  const [searchValue, setSearchValue] = React.useState('');
  const [debouncedSearchValue] = useDebounce(searchValue, 200);

  // An array of username strings
  const [searchResults, setSearchResults] = React.useState([]);

  const fetchMatchingUsernames = async value => {
    const matchingUsers = await Firebase.getUsersFromResult(value);
    setSearchResults(matchingUsers);
  };

  React.useEffect(() => {
    if (debouncedSearchValue) {
      fetchMatchingUsernames(searchValue);
    } else if (!debouncedSearchValue) {
      setSearchResults([]);
    }
  }, [debouncedSearchValue]);

  return (
    <Content>
      <Container>
        <Text as="h1">Search</Text>
        <SearchBox
          type="text"
          placeholder="Type your search..."
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
        {searchResults.length !== 0 && (
          <ProfileSearchResults>
            <ul>
              {searchResults.map(username => (
                <ProfileSearchResult key={username} />
              ))}
            </ul>
          </ProfileSearchResults>
        )}
        {Boolean(!searchResults.length && searchValue) && (
          <ProfileSearchResults>
            <Text as="span">No users found</Text>
          </ProfileSearchResults>
        )}
      </Container>
    </Content>
  );
};

export default Search;
