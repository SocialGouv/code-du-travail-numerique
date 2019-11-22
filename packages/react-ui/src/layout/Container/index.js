import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { breakpoints, spacings } from "../../theme";

export const Container = styled.div`
  max-width: ${breakpoints.desktop};
  margin: 0 auto;
  padding: 0 ${spacings.medium};
  ${props => {
    if (props.narrow) {
      const maxWidth = "74rem"; //740px
      if (props.noPadding) {
        return css`
          max-width: ${maxWidth};
          padding: 0;
        `;
      }
      return css`
        max-width: ${maxWidth};
      `;
    }
  }}
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  @media print {
    max-width: 100%;
    padding: 0;
  }
`;

Container.propTypes = {
  children: PropTypes.node.isRequired,
  narrow: PropTypes.bool,
  noPadding: PropTypes.bool
};

Container.defaultProps = {
  narrow: false,
  noPadding: false
};
