import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { box, breakpoints, spacing } from "../../theme";

export const Wrapper = styled.div`
  padding: ${spacing.small} ${spacing.medium};
  color: ${({ theme }) => theme.darkText};
  border: ${box.border};
  border-radius: ${box.borderRadius};
  ${props => {
    if (props.size === "large") {
      return css`
        padding: ${spacing.large} ${spacing.larger};
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
        background-color: ${props.theme.darkBackground};
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
    padding: ${spacing.small} ${spacing.medium};
  }
  @media print {
    border: none;
    padding: 0 5pt;
  }
`;

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(["default", "large"]),
  variant: PropTypes.oneOf(["default", "light", "dark"])
};

Wrapper.defaultProps = {
  className: "",
  size: "default",
  variant: "default"
};
