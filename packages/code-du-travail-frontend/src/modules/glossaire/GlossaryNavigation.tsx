import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import React from "react";

type GlossaryNavigationProps = {
  letters: string[];
};

export const GlossaryNavigation = ({ letters }: GlossaryNavigationProps) => {
  return (
    <div>
      <ul className={`${fr.cx("fr-grid-row")} ${ulStyle}`}>
        {letters.map((letter, index) => (
          <li key={letter} className={fr.cx("fr-mx-1v")}>
            {index > 0 && (
              <strong aria-hidden="true" className={fr.cx("fr-h3")}>
                {" "}
                -{" "}
              </strong>
            )}
            <a href={`#ancre-${letter}`} className={fr.cx("fr-h3")}>
              {letter}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ulStyle = css({
  listStyle: "none!",
});
