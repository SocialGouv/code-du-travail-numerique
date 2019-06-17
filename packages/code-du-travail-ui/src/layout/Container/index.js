import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { breakpoints, spacing } from "../../theme";

const Container = ({ children, className, narrow, noPadding }) => {
  return (
    <StyledContainer
      className={className}
      narrow={narrow}
      noPadding={noPadding}
    >
      {children}
    </StyledContainer>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  narrow: PropTypes.bool,
  noPadding: PropTypes.bool
};

Container.defaultProps = {
  className: "",
  narrow: false,
  noPadding: false
};

export default Container;

const StyledContainer = styled.div`
  max-width: ${breakpoints.desktop};
  margin: 0 auto;
  padding: 0 ${spacing.medium};
  ${props => {
    if (props.narrow) {
      const maxWidth = "46.25rem"; //740px
      if (props.noPadding) {
        return css`
          padding: 0;
          max-width: ${maxWidth};
        `;
      }
      return css`
        max-width: ${maxWidth};
      `;
    }
  }};
  & > *:last-child {
    margin-top: 0;
    margin-bottom: 0;
  }
  @media print {
    max-width: 100%;
    padding: 0;
  }
`;
