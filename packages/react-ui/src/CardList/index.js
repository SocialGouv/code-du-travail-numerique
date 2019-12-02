import React from "react";
import PropTypes from "prop-types";

import { Grid, GridCell } from "../Grid";
import { ListTitle } from "./ListTitle";

export function CardList({
  leftStripped = false,
  title,
  href,
  desc,
  columns,
  children
}) {
  return (
    <>
      <ListTitle leftStripped={leftStripped} desc={desc} href={href}>
        {title}
      </ListTitle>
      <Grid columns={columns}>
        {Array.isArray(children) ? (
          React.Children.map(children, element => (
            <GridCell key={element.key}>{element}</GridCell>
          ))
        ) : (
          <GridCell>{children}</GridCell>
        )}
      </Grid>
    </>
  );
}

CardList.propTypes = {
  children: PropTypes.node.isRequired,
  columns: PropTypes.number,
  desc: PropTypes.string,
  href: PropTypes.string,
  leftStripped: PropTypes.bool,
  title: PropTypes.string.isRequired
};

CardList.defaultProps = {
  columns: 4
};
