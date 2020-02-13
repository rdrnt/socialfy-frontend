import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { useViewportScroll, useTransform } from 'framer-motion';

import Container from '../container';
import Text from '../Text';
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
    `1px solid rgba(244, 244, 244, ${props.borderOpacity})`};

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
`;

const SearchIcon = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    > svg {
      fill: ${config.colors.primary};
    }
  }
`;

const Title = styled(Link)`
  text-decoration: none;
  color: white;
`;

// For scrolling related docs, see
// https://www.framer.com/api/motion/motionvalue/#useviewportscroll

const Header = () => {
  const { header, modal } = React.useContext(UIContext);

  const { scrollYProgress } = useViewportScroll();
  const yScrollValue = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  React.useEffect(() => {
    return yScrollValue.onChange(value => {
      header.setBorderOpacity(value);
    });
  }, [yScrollValue]);

  return (
    <Root borderOpacity={header.borderOpacity}>
      <Container>
        <Layout>
          <Content>
            <Title to={config.routes.HOME}>
              <Text as="h2">Socialfy</Text>
            </Title>
            <SearchIcon to={config.routes.SEARCH}>
              <Icon name="search" />
            </SearchIcon>
          </Content>
          {header.profileToShow && (
            <HeaderProfileContent
              profile={header.profileToShow}
              openModal={modal.show}
            />
          )}
        </Layout>
      </Container>
    </Root>
  );
};

export default Header;
