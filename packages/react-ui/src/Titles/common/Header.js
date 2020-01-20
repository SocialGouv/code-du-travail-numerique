import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { breakpoints, spacings } from "../../theme";

export const Header = styled.header`
  ${({ isFirst, leftStripped, pageTitle, shift }) => {
    return css`
      margin-top: ${pageTitle || isFirst ? "0" : spacings.large};
      margin-bottom: ${pageTitle ? spacings.xmedium : spacings.medium};
      margin-left: ${shift ? `-${shift}}` : "auto"};
      text-align: ${leftStripped ? "left" : "center"};
      @media (max-width: ${breakpoints.mobile}) {
        margin-bottom: ${pageTitle ? spacings.xmedium : spacings.small};
        margin-left: ${shift ? `-${spacings.small}}` : "auto"};
      }
    `;
  }};
`;

Header.propTypes = {
  isFirst: PropTypes.bool,
  leftStripped: PropTypes.bool,
  pageTitle: PropTypes.bool,
  shift: PropTypes.string
};

Header.defaultProps = {
  isFirst: false,
  leftStripped: false,
  pageTitle: false,
  shift: ""
};
