import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { spacings } from "../../theme";

export const Section = styled.div`
  padding: ${spacings.medium} 0;
  color: ${({ theme }) => theme.paragraph};
  ${props => {
    if (props.variant === "white") {
      return css`
        background-color: ${props.theme.white};
      `;
    }
    if (props.variant === "light") {
      return css`
        background-color: ${props.theme.bgSecondary};
      `;
    }
    if (props.variant === "dark") {
      return css`
        background-color: ${props.theme.bgTertiary};
      `;
    }
  }}
`;

Section.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "white", "light", "dark"])
};

Section.defaultProps = {
  variant: "default"
};
