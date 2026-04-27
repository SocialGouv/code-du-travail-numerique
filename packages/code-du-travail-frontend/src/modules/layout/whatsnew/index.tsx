import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "../../common/Link";
import React from "react";

export const WhatsNewLink = () => (
  <p className={`${fr.cx("fr-mb-6w")} ${p}`}>
    <span
      className={`${fr.cx("ri-arrow-right-line")} ${css({
        color: "var(--artwork-minor-blue-cumulus)",
      })}`}
    />
    <span>
      Découvrez les évolutions du Code du travail numérique&nbsp;:{" "}
      <Link href="/quoi-de-neuf">
        Quoi de neuf sur le Code du travail numérique&nbsp;?
      </Link>
    </span>
  </p>
);

const p = css({
  display: "flex",
  columnGap: ".5rem",
});
