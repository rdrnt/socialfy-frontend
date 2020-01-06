import React from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-debounce';
import { Link } from 'react-router-dom';

import Container from '../components/container';
import Text from '../components/Text';

import config from '../config';
import { DefaultTextStyles } from '../components/Text/index';
import { Firebase } from '../helpers';

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

const SearchResults = styled.div`
  margin-top: 15px;
  width: 100%;
  max-width: 800px;
  padding: ${config.spacing}px;
  border-radius: 8px;
  background-color: ${config.colors.backgroundSecondary};

  > ul {
    list-style: none;
  }
`;

const SearchResultItem = styled.li`
  width: 100%;
  height: 30px;
  padding: 0;
  margin: 0;

  :hover {
    background-color: green;
  }
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
        <Text as="h1">Search for users</Text>
        <SearchBox
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
        {searchResults.length !== 0 && (
          <SearchResults>
            <ul>
              {searchResults.map(username => (
                <SearchResultItem key={username}>
                  <Link to={`/${username}`}>{username}</Link>
                </SearchResultItem>
              ))}
            </ul>
          </SearchResults>
        )}
        {Boolean(!searchResults.length && searchValue) && (
          <SearchResults>
            <Text as="span">No users found</Text>
          </SearchResults>
        )}
      </Container>
    </Content>
  );
};

export default Search;
