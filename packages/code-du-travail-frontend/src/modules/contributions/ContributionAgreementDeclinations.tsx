"use client";
import React from "react";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { ListWithArrow } from "../common/ListWithArrow";
import Link from "../common/Link";
import { useContributionTracking } from "./tracking";
import { AgreementDeclination } from "./type";

export const AGREEMENT_DECLINATIONS_LABEL =
  "Votre réponse en fonction de votre convention collective";

type Props = {
  items: AgreementDeclination[];
  className?: string;
  /**
   * Niveau du titre de l'accordéon. Par défaut `h3` : le bloc est alors rendu
   * sous la réponse Code du travail, qui porte le `h2` de la page. Sur une
   * contribution sans réponse générique (`isNoCDT`) ce `h2` n'existe pas et la
   * liste suit directement le `h1` : elle doit passer en `h2` pour ne pas
   * casser la hiérarchie des titres (#7458).
   */
  titleAs?: "h2" | "h3";
};

/**
 * Liste, sur une fiche générique, les pages de la même contribution déclinées
 * par convention collective (#7355). Les liens sont rendus dans le HTML servi —
 * le `Accordion` du DSFR place toujours ses enfants dans le `.fr-collapse` —
 * ce qui alimente le maillage interne indépendamment de toute interaction.
 */
export const ContributionAgreementDeclinations = ({
  items,
  className,
  titleAs = "h3",
}: Props) => {
  const { emitClickAgreementDeclination } = useContributionTracking();

  if (items.length === 0) {
    return null;
  }

  return (
    <Accordion
      label={AGREEMENT_DECLINATIONS_LABEL}
      titleAs={titleAs}
      className={className}
    >
      <ListWithArrow
        items={items.map(({ shortTitle, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => emitClickAgreementDeclination(href)}
          >
            {shortTitle}
          </Link>
        ))}
      />
    </Accordion>
  );
};
