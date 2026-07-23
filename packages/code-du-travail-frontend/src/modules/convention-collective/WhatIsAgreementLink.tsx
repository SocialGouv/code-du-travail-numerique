import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "next/link";

const iconColor = css({ color: "var(--text-action-high-blue-france)" });

export const WhatIsAgreementLink = () => (
  <p className={fr.cx("fr-my-2w")}>
    <i className={`ri-information-line ${iconColor}`} />
    <Link
      className={fr.cx("fr-link", "fr-ml-1w")}
      href="/quelles-regles-s-appliquent-dans-votre-entreprise#convention-collective"
      target="_blank"
    >
      La convention collective, c&apos;est quoi&nbsp;?
    </Link>
  </p>
);
