import PropTypes from "prop-types";
import styled from "styled-components";

import { breakpoints, spacings } from "../../theme.js";

export const TitleParagraph = styled.p`
  margin-top: ${spacings.small};
  margin-bottom: 0;
  padding-left: ${({ stripe, shift }) => {
    if (stripe === "left") {
      return shift ? shift : spacings.large;
    }
    return "0";
  }};
  @media (max-width: ${breakpoints.mobile}) {
    padding-left: ${({ stripe }) => (stripe === "left" ? spacings.base : "0")};
  }
`;

TitleParagraph.propTypes = {
  shift: PropTypes.string,
  stripe: PropTypes.oneOf(["left", "top", "none"]),
};

TitleParagraph.defaultProps = {
  shift: "",
  stripe: "left",
};
