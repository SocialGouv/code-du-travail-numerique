import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { breakpoints, spacings } from "../../theme";

export const Header = styled.header`
  ${({ leftStripped, pageTitle, shift }) => {
    return css`
      margin-bottom: ${pageTitle ? spacings.larger : spacings.base};
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
  leftStripped: PropTypes.bool,
  pageTitle: PropTypes.bool,
  shift: PropTypes.string
};

Header.defaultProps = {
  leftStripped: false,
  pageTitle: false,
  shift: ""
};
