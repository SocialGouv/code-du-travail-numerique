import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { OverflowWrapper } from "../OverflowWrapper/index.js";
import { breakpoints, spacings } from "../theme";

export const GridContext = React.createContext({ columns: 4 });

export const Grid = ({ columns, ...props }) => {
  return (
    <StyledOverflowWrapper mobileOnly>
      <GridContext.Provider value={columns}>
        <List {...props} />
      </GridContext.Provider>
    </StyledOverflowWrapper>
  );
};
Grid.propTypes = {
  columns: PropTypes.number,
};
Grid.defaultProps = {
  columns: 4,
};

export const StyledOverflowWrapper = styled(OverflowWrapper)`
  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: ${spacings.base};
  }
`;

export const List = styled.div`
  display: flex;
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
`;
