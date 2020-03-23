import React from "react";
import PropTypes from "prop-types";

import { Grid as RootGrid } from "./Grid";
import { GridCell } from "./GridCell";

export { RootGrid, GridCell };
export const Grid = ({ children, ...props }) => (
  <RootGrid {...props}>
    {Array.isArray(children) ? (
      React.Children.map(children, (element) => (
        <GridCell key={element.key}>{element}</GridCell>
      ))
    ) : (
      <GridCell>{children}</GridCell>
    )}
  </RootGrid>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
};

Grid.defaultProps = {
  columns: 4,
};
