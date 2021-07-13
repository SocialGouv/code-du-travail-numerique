import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import { breakpoints, spacings } from "../../theme.js";

export const CONTAINER_MAX_WIDTH = "124rem";

export const Container = styled.div`
  max-width: ${CONTAINER_MAX_WIDTH};
  margin: 0 auto;
  padding: 0 ${spacings.medium};
  ${({ narrow, noPadding }) => {
    if (narrow) {
      return css`
        ${noPadding && "padding: 0;"}
        max-width: 74rem;
      `;
    }
  }}
  @media (max-width: ${breakpoints.mobile}) {
    padding: ${({ narrow, noPadding }) =>
      narrow && noPadding ? "0" : `0 ${spacings.small}`};
  }
  @media print {
    max-width: 100%;
    padding: 0;
  }
`;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  narrow: PropTypes.bool,
  noPadding: PropTypes.bool,
};

Container.defaultProps = {
  narrow: false,
  noPadding: false,
};
