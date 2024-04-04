import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import { spacings } from "../theme";

export const GridContext = React.createContext({ columns: 4 });

export const Grid = ({ columns, ...props }) => {
  return (
    <GridContext.Provider value={columns}>
      <List {...props} />
    </GridContext.Provider>
  );
};
Grid.propTypes = {
  columns: PropTypes.number,
};
Grid.defaultProps = {
  columns: 4,
};

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: stretch;
  justify-content: flex-start;
  margin-top: 0;
  margin-bottom: ${spacings.larger};
  padding: 0;
  list-style-type: none;
`;
