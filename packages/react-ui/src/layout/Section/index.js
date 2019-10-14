import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { spacing } from "../../theme";

export const Section = styled.div`
  padding: ${spacing.interComponent} 0;
  color: ${({ theme }) => theme.darkText};
  ${props => {
    if (props.variant === "white") {
      return css`
        background-color: ${props.theme.white};
      `;
    }
    if (props.variant === "light") {
      return css`
        background-color: ${props.theme.lightBackground};
      `;
    }
    if (props.variant === "dark") {
      return css`
        background-color: ${props.theme.darkBackground};
      `;
    }
  }}
`;

Section.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "white", "light", "dark"])
};

Section.defaultProps = {
  className: "",
  variant: "default"
};
