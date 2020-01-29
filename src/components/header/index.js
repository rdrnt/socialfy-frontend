import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

import Container from '../container';
import Text, { DefaultTextStyles } from '../Text';
import Icon from '../Icon';
import HeaderProfileContent from './Profile';

import config from '../../config';
import { UIContext } from '../../contexts';

export const HEADER_HEIGHT = 70;

const Root = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  min-height: ${HEADER_HEIGHT}px;
  background-color: ${config.colors.background};
  color: white;
  border-bottom: ${props =>
    `1px solid rgba(255, 255, 255, ${props.borderOpacity})`};

  /* The container */
  > div {
    height: 100%;
    width: 100%;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: ${config.spacing}px 0;
`;

const SearchIcon = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Header = () => {
  const { header } = React.useContext(UIContext);
  const [isOnSearchPage, setIsOnSearchPage] = React.useState(false);

  const location = useLocation();

  const onScroll = () => {
    const value = window.scrollY;
    if (value >= 0 && value <= 201) {
      // Get the scroll value from 0.0-0.99
      const fixedValue = value / 2 / 100;
      header.setBorderOpacity(fixedValue);
    } else if (value > 100 && header.borderOpacity !== 1) {
      header.setBorderOpacity(1);
    }
  };

  React.useEffect(() => {
    if (window) {
      window.addEventListener('scroll', onScroll);

      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  React.useEffect(() => {
    // Check if the pathname is equal to the search page path
    const isPathnameSearch = location.pathname === config.routes.SEARCH;
    // If the pathname is equal to /search, and the state is false, set it to true
    if (isPathnameSearch && !isOnSearchPage) {
      setIsOnSearchPage(true);
    } else if (!isPathnameSearch && isOnSearchPage) {
      // If the pathname is not search and the state is true, set it to false
      setIsOnSearchPage(false);
    }
  }, [location.pathname]);

  return (
    <Root borderOpacity={header.borderOpacity}>
      <Container>
        <Layout>
          <Content>
            <Title to={config.routes.HOME}>
              <Text as="h2">Socialfy</Text>
            </Title>
            <SearchIcon to={config.routes.SEARCH}>
              <Icon
                name="search"
                color={isOnSearchPage ? config.colors.primary : 'white'}
              />
            </SearchIcon>
          </Content>
          {header.profileToShow && (
            <HeaderProfileContent profile={header.profileToShow} />
          )}
        </Layout>
      </Container>
    </Root>
  );
};

export default Header;
