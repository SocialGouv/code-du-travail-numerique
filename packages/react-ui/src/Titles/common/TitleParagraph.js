import PropTypes from "prop-types";
import styled from "styled-components";
import { breakpoints, spacings } from "../../theme";

export const TitleParagraph = styled.p`
  margin-top: ${spacings.small};
  margin-bottom: 0;
  padding-left: ${({ leftStripped, shift }) => {
    if (leftStripped) {
      return shift ? shift : spacings.large;
    }
    return "0";
  }};
  @media (max-width: ${breakpoints.mobile}) {
    padding-left: ${({ leftStripped }) => (leftStripped ? spacings.base : "0")};
  }
`;

TitleParagraph.propTypes = {
  leftStripped: PropTypes.bool,
  shift: PropTypes.string,
};

TitleParagraph.defaultProps = {
  leftStripped: false,
  shift: "",
};
