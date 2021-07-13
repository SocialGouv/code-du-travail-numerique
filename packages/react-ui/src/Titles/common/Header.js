import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { breakpoints, spacings } from "../../theme.js";

export const Header = styled.header`
  ${({ isFirst, stripe, pageTitle, shift }) => {
    return css`
      margin-top: ${pageTitle || isFirst ? "0" : spacings.large};
      margin-bottom: ${pageTitle ? spacings.larger : spacings.medium};
      margin-left: ${shift ? `-${shift}}` : "auto"};
      text-align: ${stripe === "top" ? "center" : "left"};
      @media (max-width: ${breakpoints.mobile}) {
        margin-bottom: ${pageTitle ? spacings.large : spacings.small};
        margin-left: ${shift ? `-${spacings.small}}` : "auto"};
      }
    `;
  }};
`;

Header.propTypes = {
  isFirst: PropTypes.bool,
  pageTitle: PropTypes.bool,
  shift: PropTypes.string,
  stripe: PropTypes.oneOf(["left", "top", "none"]),
};

Header.defaultProps = {
  isFirst: false,
  pageTitle: false,
  shift: "",
  stripe: "left",
};
