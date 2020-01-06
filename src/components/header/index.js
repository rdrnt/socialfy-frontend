import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Container from '../container';
import Text, { DefaultTextStyles } from '../Text';

import config from '../../config';
import Icon from '../Icon';
import { UIContext } from '../../contexts';

const Root = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  min-height: 70px;
  background-color: ${config.colors.background};
  color: white;
  border-bottom: ${props =>
    `1px solid rgba(255, 255, 255, ${props.borderOpacity})`};

  /* The container */
  > div {
    height: 100%;
  }
`;

const Layout = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-grow: 1;

  > span {
    margin-bottom: 10px;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Link)`
  ${DefaultTextStyles['h2']};
  text-decoration: none;
  color: white;
`;

const Header = () => {
  const { header } = React.useContext(UIContext);

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

  return (
    <Root borderOpacity={header.borderOpacity}>
      <Container>
        <Layout>
          <Content>
            <Title to={config.routes.HOME}>Sharify</Title>
            {header.sublabel && <Text as="span">{header.sublabel}</Text>}
          </Content>
          <SearchIcon>
            <Icon name="search" onClick={() => console.log('Onclick')} />
          </SearchIcon>
        </Layout>
      </Container>
    </Root>
  );
};

export default Header;
