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
  const UL = data.attributes.type === "puce" ? "ul" : "ol";
  return (
    <UL>
      {data.children.map((item, index) => (
        <li key={index}>
          <ElementBuilder
            data={item.children}
            headingLevel={headingLevel + 1}
          />
        </li>
      ))}
    </UL>
  );
};

export default List;
