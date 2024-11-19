import React from "react";
import { ElementBuilder } from "./ElementBuilder";
import { FicheSPDataList } from "../type";

export const List = ({
  data,
  headingLevel,
}: {
  data: FicheSPDataList;
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

export default List;
