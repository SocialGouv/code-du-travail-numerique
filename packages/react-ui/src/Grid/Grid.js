import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { OverflowWrapper } from "../OverflowWrapper";
import { breakpoints, spacings } from "../theme";

export const GridContext = React.createContext({ columns: 4 });

export const Grid = ({ columns, singleLined, ...props }) => {
  return (
    <StyledOverflowWrapper mobileOnly={!singleLined}>
      <GridContext.Provider value={columns}>
        <List singleLined={singleLined} {...props} />
      </GridContext.Provider>
    </StyledOverflowWrapper>
  );
};
Grid.propTypes = {
  columns: PropTypes.number,
  singleLined: PropTypes.bool
};
Grid.defaultProps = {
  columns: 4,
  singleLined: false
};

export const StyledOverflowWrapper = styled(OverflowWrapper)`
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.base};
  }
`;

export const List = styled.ul`
  display: flex; /* Flex layout so items have equal height. */
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  justify-content: flex-start;
  /* Use negative margins on sides to create gutters that do not also
    create a gutter at the edges of the container. */
  margin-top: 0;
  margin-right: calc(-1 * ${spacings.small});
  margin-bottom: ${spacings.larger};
  margin-left: calc(-1 * ${spacings.small});
  padding: 0;
  list-style-type: none;
  @media (max-width: ${breakpoints.mobile}) {
    flex-wrap: nowrap;
    margin-right: 0;
    margin-bottom: ${spacings.medium};
    margin-left: 0;
  }
  ${({ singleLined }) =>
    singleLined &&
    css`
      margin-right: 0;
      margin-left: 0;
      flex-wrap: nowrap;
    `}
`;
