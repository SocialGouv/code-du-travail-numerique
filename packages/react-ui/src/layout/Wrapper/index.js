import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { box, breakpoints, spacings } from "../../theme";

export const Wrapper = styled.div`
  padding: ${spacings.small} ${spacings.medium};
  color: ${({ theme }) => theme.paragraph};
  border: ${box.border};
  border-radius: ${box.borderRadius};
  ${props => {
    if (props.size === "large") {
      return css`
        padding: ${spacings.large} ${spacings.larger};
      `;
    }
  }}
  ${props => {
    if (props.variant === "default") {
      return css`
        border-color: transparent;
      `;
    }
    if (props.variant === "light") {
      return css`
        background-color: ${props.theme.white};
      `;
    }
    if (props.variant === "dark") {
      return css`
        background-color: ${props.theme.bgTertiary};
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
    padding: ${spacings.small} ${spacings.medium};
  }
  @media print {
    padding: 0 5pt;
    border: none;
  }
`;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["default", "large"]),
  variant: PropTypes.oneOf(["default", "light", "dark"])
};

Wrapper.defaultProps = {
  size: "default",
  variant: "default"
};
