import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { Style } from '../../helpers';

export const DefaultTextStyles = {
  h1: css`
    font-size: 80px;
    font-weight: 600;
    letter-spacing: -0.04em;

    ${Style.size.tablet`
      font-size: 45px;
    `}
  `,
  h2: css`
    font-size: 45px;
    font-weight: 600;
    letter-spacing: -0.03em;

    ${Style.size.mobile`
      font-size: 35px;
    `};
  `,
  h3: css`
    font-size: 36px;
    font-weight: 700;
    letter-spacing: -0.02em;

    ${Style.size.mobile`
      font-size: 30px;
    `};
  `,
  h4: css`
    font-size: 28px;
    line-height: 1.6;
    letter-spacing: -0.5px;
    font-weight: 600;
  `,
  h5: css`
    font-size: 23px;
    font-weight: 500;
  `,
  h6: css`
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.24px;
  `,
  p: css`
    font-size: 16px;
    line-height: 20px;

    ${Style.size.mobile`
      font-size: 13px;
      line-height: 17px;
    `};
  `,
  span: css`
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1px;
  `,
  a: css`
    font-size: 16px;
    line-height: 20px;

    ${Style.size.mobile`
      font-size: 13px;
      line-height: 17px;
    `};

    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  `,
};

const StyledText = styled.h1`
  /* The defaults */
  display: block;
  margin: 0;
  padding: 0;
  color: white;

  ${props => DefaultTextStyles[props.useTagStyle]};

  ${props => props.weight && `font-weight: ${props.weight}`};
  ${props => props.size && `font-size: ${props.size}`};
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
  size: PropTypes.number,
};

export default Text;
