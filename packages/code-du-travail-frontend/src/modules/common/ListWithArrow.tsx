import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import React from "react";

export const ListWithArrow = ({
  items,
  // Ajoute un filet entre les éléments (liste posée seule dans une section,
  // sans texte alentour pour la délimiter).
  withSeparators = false,
}: {
  items: React.ReactNode[];
  withSeparators?: boolean;
}) => {
  return (
    <ul className={`${fr.cx("fr-pl-0")} ${ul}`}>
      {items.map((item, index) => {
        return (
          <li
            key={`${index}`}
            className={[fr.cx("fr-pb-2w"), li, withSeparators && separated]
              .filter(Boolean)
              .join(" ")}
          >
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

const separated = css({
  paddingTop: "0.75rem",
  borderBottom: "1px solid var(--border-default-grey)",
  "&:first-child": {
    borderTop: "1px solid var(--border-default-grey)",
  },
});
