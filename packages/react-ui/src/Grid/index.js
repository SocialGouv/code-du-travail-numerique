import React from "react";
import PropTypes from "prop-types";

import { Grid as RootGrid } from "./Grid";
import { GridCell } from "./GridCell";

export { RootGrid, GridCell };
export const Grid = ({ children, singleLined, ...props }) => (
  <RootGrid singleLined={singleLined} {...props}>
    {Array.isArray(children) ? (
      React.Children.map(children, element => (
        <GridCell singleLined={singleLined} key={element.key}>
          {element}
        </GridCell>
      ))
    ) : (
      <GridCell>{children}</GridCell>
    )}
  </RootGrid>
);

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
  singleLined: PropTypes.bool
};

Grid.defaultProps = {
  columns: 4,
  singleLined: false
};
