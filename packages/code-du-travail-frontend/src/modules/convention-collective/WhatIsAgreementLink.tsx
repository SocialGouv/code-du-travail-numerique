import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import Link from "next/link";

const iconColor = css({ color: "var(--text-action-high-blue-france)" });

type Props = {
  /** Tracking optionnel : seules les façades contribution le fournissent. */
  onClick?: () => void;
};

export const WhatIsAgreementLink = ({ onClick }: Props) => (
  <p className={fr.cx("fr-my-2w")}>
    <i className={`ri-information-line ${iconColor}`} />
    <Link
      className={fr.cx("fr-link", "fr-ml-1w")}
      href="/quelles-regles-s-appliquent-dans-votre-entreprise#convention-collective"
      target="_blank"
      onClick={onClick}
    >
      {"La convention collective, c'est quoi\u00a0?"}
    </Link>
  </p>
);
