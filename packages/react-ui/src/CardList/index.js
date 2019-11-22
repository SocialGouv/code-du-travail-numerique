import React from "react";
import PropTypes from "prop-types";

import { Grid, GridCell } from "../Grid";
import { ListTitle } from "./ListTitle";

export function CardList({ title, href, desc, columns, children }) {
  return (
    <>
      <ListTitle desc={desc} href={href}>
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
  desc: PropTypes.string,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  columns: PropTypes.number
};

CardList.defaultProps = {
  columns: 4
};
