import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { darken } from "polished";
import { box, spacing, variants } from "../theme";

export const Alert = styled.div`
  margin-bottom: ${spacing.base};
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid transparent;
  border-radius: ${box.borderRadius};
  ${({ theme, variant }) => {
    let color = theme.darkText;
    let backgroundColor = theme.darkBackground;
    let borderColor = darken(0.1, backgroundColor);
    if (variant !== "default") {
      color = theme[`${variant}Text`];
      backgroundColor = theme[`${variant}Background`];
      borderColor = darken(0.1, backgroundColor);
    }
    return css`
      color: ${color};
      background: ${backgroundColor};
      border-color: ${borderColor};
    `;
  }}
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

Alert.propTypes = {
  variant: PropTypes.oneOf(["default"].concat(variants)),
  children: PropTypes.node.isRequired
};

Alert.defaultProps = {
  variant: "default"
};
