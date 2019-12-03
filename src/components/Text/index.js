import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const DefaultTextStyles = {
  h1: css`
    font-size: 60px;
    font-weight: 600;
    letter-spacing: -1.5;
  `,
  h2: css`
    font-size: 45px;
    font-weight: 500;
    letter-spacing: -1;
  `,
  h3: css`
    font-size: 36px;
    font-weight: 500;
    letter-spacing: -1;
  `,
  h4: css`
    font-size: 27px;
  `,
  h5: css``,
  h6: css``,
  p: css`
    font-size: 16px;
  `,
  span: css``,
};

const StyledText = styled.h1`
  /* The defaults */
  display: block;
  margin: 0;
  padding: 0;
  color: white;
  line-height: 1;
  font-weight: normal;

  ${props => DefaultTextStyles[props.useTagStyle]};

  ${props => props.weight && `font-weight: ${props.weight}`};
`;

const Text = ({ as = 'h1', type = '', children, ...rest }) => (
  <StyledText as={Boolean(type) ? type : as} useTagStyle={as} {...rest}>
    {children}
  </StyledText>
);

Text.propTypes = {
  as: PropTypes.string.isRequired, // h1 -> h6, span, p
  type: PropTypes.string, // override the tag type
  weight: PropTypes.number,
};

export default Text;
