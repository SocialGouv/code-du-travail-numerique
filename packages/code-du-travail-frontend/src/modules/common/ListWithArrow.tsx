import { fr } from "@codegouvfr/react-dsfr";
import { css, cx } from "@styled-system/css";
import React from "react";

export const ListWithArrow = ({
  items,
  withSeparators = false,
  small = false,
}: {
  items: React.ReactNode[];
  withSeparators?: boolean;
  small?: boolean;
}) => {
  return (
    <ul className={`${fr.cx("fr-pl-0")} ${ul}`}>
      {items.map((item, index) => {
        return (
          <li
            key={`${index}`}
            className={`${fr.cx(small ? "fr-py-2v" : "fr-py-2w")} ${cx(
              li,
              withSeparators && liWithSeparator,
              withSeparators && index === 0 && liWithTopSeparator
            )}`}
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

const liWithSeparator = css({
  borderBottom: "1px solid var(--border-open-blue-france)",
});

const liWithTopSeparator = css({
  borderTop: "1px solid var(--border-open-blue-france)",
});
