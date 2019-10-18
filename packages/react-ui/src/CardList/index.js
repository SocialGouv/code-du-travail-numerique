import React from "react";
import PropTypes from "prop-types";

import { Grid, GridCell } from "../Grid";
import { SectionTitle } from "../SectionTitle";

export function CardList({ title, href, desc, children }) {
  return (
    <>
      <SectionTitle desc={desc} href={href}>
        {title}
      </SectionTitle>
      <Grid>
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
  href: PropTypes.string
};
