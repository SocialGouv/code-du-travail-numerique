import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import React from "react";

export const List = ({ items }: { items: JSX.Element[] }) => {
  return (
    <ul className={`${fr.cx("fr-pl-0")} ${ul}`}>
      {items.map((item) => {
        return (
          <li key={item.key} className={`${fr.cx("fr-pb-2w")} ${li}`}>
            <span>{item}</span>
          </li>
        );
      })}
    </ul>
  );
};

const ul = css({
  listStyle: "none!",
});

const li = css({
  display: "flex",
  columnGap: ".5rem",
});
