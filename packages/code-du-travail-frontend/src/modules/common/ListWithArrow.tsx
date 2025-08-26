import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import React from "react";

export const ListWithArrow = ({ items }: { items: React.ReactNode[] }) => {
  return (
    <ul className={`${fr.cx("fr-pl-0")} ${ul}`}>
      {items.map((item, index) => {
        return (
          <li key={`${index}`} className={`${fr.cx("fr-pb-2w")} ${li}`}>
            <span
              className={`${fr.cx("ri-arrow-right-line")} ${css({
                color: "var(--artwork-minor-blue-cumulus)",
              })}`}
            />
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
