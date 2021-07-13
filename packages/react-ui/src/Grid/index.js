import PropTypes from "prop-types";
import React from "react";

import { Grid as RootGrid } from "./Grid.js";
import { GridCell } from "./GridCell.js";

export { GridCell, RootGrid };
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
