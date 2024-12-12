import React from "react";
import { ElementBuilder } from "./ElementBuilder";
import { FicheSPDataList } from "../type";
import { css } from "@styled-system/css";

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
        <li key={index} className={liP}>
          <ElementBuilder
            data={item.children}
            headingLevel={headingLevel + 1}
          />
        </li>
      ))}
    </UL>
  );
};
const liP = css({
  "&> p": {
    mb: "0!",
  },
});

export default List;
