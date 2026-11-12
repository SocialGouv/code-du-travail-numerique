"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { routeBySource } from "@socialgouv/cdtn-utils";
import { useABTestVariant } from "@socialgouv/matomo-next";
import { badgeColorClasses, getSourceLabel } from "./utils";

type Props = {
  source: keyof typeof routeBySource;
  className?: string;
};

/**
 * Tag de type de document du moteur de recherche (« FICHE GÉNÉRIQUE »,
 * « OUTIL »…), libellé et couleur dépendant de la source. Partagé avec l'entrée
 * par thème (#7559) pour que l'usager retrouve les mêmes repères.
 */
export const SourceBadge = ({ source, className }: Props) => {
  const variant = useABTestVariant("LabelCardSearch");
  return (
    <p
      className={`${fr.cx("fr-tag", "fr-tag--sm", "fr-text--xs", "fr-text--bold")} ${badgeColorClasses[source] ?? ""} ${className ?? ""}`}
    >
      {getSourceLabel(source, variant)}
    </p>
  );
};
