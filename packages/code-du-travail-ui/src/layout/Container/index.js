import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { breakpoints, spacing } from "../../theme";

const Container = ({ children, className, narrow }) => {
  return (
    <StyledContainer className={className} narrow={narrow}>
      {children}
    </StyledContainer>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  narrow: PropTypes.bool
};

Container.defaultProps = {
  className: "",
  narrow: false
};

export default Container;

const StyledContainer = styled.div`
  max-width: ${breakpoints.desktop};
  margin: 0 auto;
  padding: 0 ${spacing.medium};
  ${props =>
    props.narrow &&
    css`
      max-width: 43.75rem; //700px;
    `};
  & > *:last-child {
    margin-bottom: 0;
  }
  @media print {
    max-width: 100%;
    padding: 0;
  }
`;
