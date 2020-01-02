import React from "react";
import PropTypes from "prop-types";

import { Grid } from "../Grid";
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
      <ListTitle leftStripped={leftStripped} subtitle={desc} href={href}>
        {title}
      </ListTitle>
      <Grid columns={columns}>{children}</Grid>
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
