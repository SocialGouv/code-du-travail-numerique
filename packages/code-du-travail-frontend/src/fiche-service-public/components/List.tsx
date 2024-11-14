import PropTypes from "prop-types";
import React from "react";
import { ElementBuilder } from "./ElementBuilder";

export const List = ({
  data,
  headingLevel,
}: {
  data: any;
  headingLevel: number;
}) => {
  const items = data.children.map((item, index) => (
    <li key={index}>
      <ElementBuilder data={item.children} headingLevel={headingLevel + 1} />
    </li>
  ));

  if (data.attributes.type === "puce") {
    return <ul>{items}</ul>;
  }
  return <ol>{items}</ol>;
};

List.propTypes = {
  data: PropTypes.object.isRequired,
  headingLevel: PropTypes.number.isRequired,
};

export default List;
