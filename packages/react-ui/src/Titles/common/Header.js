import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { breakpoints, spacings } from "../../theme";

export const Header = styled.header`
  margin: 0 auto ${spacings.small};
  ${({ leftStripped, shift }) => {
    if (leftStripped) {
      if (shift) {
        return css`
          margin-left: -${shift};
          text-align: left;
          @media (max-width: ${breakpoints.mobile}) {
            margin-left: -${spacings.small};
          }
        `;
      }
      return css`
        text-align: left;
      `;
    }
    return css`
      margin-bottom: ${({ pageTitle }) =>
        pageTitle ? spacings.larger : spacings.base};
      text-align: center;
      @media (max-width: ${breakpoints.mobile}) {
        margin-bottom: ${({ pageTitle }) =>
          pageTitle ? spacings.xmedium : spacings.small};
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
