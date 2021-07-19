import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { box, breakpoints, spacings } from "../../theme.js";

export const Wrapper = styled.div`
  padding: ${spacings.medium} ${spacings.xmedium};
  color: ${({ theme }) => theme.paragraph};
  border-radius: ${box.borderRadius};
  ${(props) => {
    if (props.size === "large") {
      return css`
        padding: ${spacings.larger};
      `;
    }
  }}
  ${(props) => {
    if (props.variant === "light") {
      return css`
        border: ${({ theme }) => box.border(theme.border)};
        background-color: ${props.theme.white};
      `;
    }
    if (props.variant === "dark") {
      return css`
        background-color: ${({ theme }) => theme.bgSecondary};
        border: ${({ theme }) =>
          box.border(theme.noColors ? theme.border : theme.bgSecondary)};
      `;
    }
    if (props.variant === "main") {
      return css`
        position: relative;
        padding: ${spacings.larger};
        background-color: ${props.theme.white};
        &:before {
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          max-height: 30rem;
          border: none;
          border-radius: ${box.borderRadius};
          box-shadow: ${({ theme }) => box.shadow.default(theme.secondary)};
          content: "";
          @media print {
            display: none;
          }
        }
      `;
    }
  }}
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${spacings.base} ${spacings.small};
  }
  @media print {
    padding: 0 5pt;
    border: none;
  }
`;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["default", "large"]),
  variant: PropTypes.oneOf(["dark", "default", "light", "main", "shadow"]),
};

Wrapper.defaultProps = {
  size: "default",
  variant: "default",
};
