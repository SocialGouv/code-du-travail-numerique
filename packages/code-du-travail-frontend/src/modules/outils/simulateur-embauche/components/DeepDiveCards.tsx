"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Card from "@codegouvfr/react-dsfr/Card";
import { DEEP_DIVE_CARDS } from "../domain/constants";
import { cardList } from "../styles";

type Props = {
  onCardClick: (slug: string) => void;
};

/**
 * Client — non pour son état, qu'il n'a pas, mais pour garder le tracking du
 * clic à côté du lien qu'il mesure.
 *
 * Pas de titre au-dessus des cartes : la maquette n'en met pas. Les titres de
 * cartes passent donc en `h2`, sinon ils sauteraient un niveau depuis le `h1`
 * de la page. Une `<ul>` nue plutôt qu'une `<section>`, qui sans nom accessible
 * ne serait de toute façon pas un repère de navigation.
 */
export const DeepDiveCards = ({ onCardClick }: Props) => (
  <div className={fr.cx("fr-mt-6w")}>
    <ul
      className={`${fr.cx("fr-grid-row", "fr-grid-row--gutters")} ${cardList}`}
    >
      {DEEP_DIVE_CARDS.map((card) => {
        const common = {
          border: true,
          horizontal: true,
          enlargeLink: true,
          size: "small",
          titleAs: "h2",
          title: card.title,
          desc: card.description,
          footer: (
            <span className={fr.cx("fr-text--sm", "fr-mb-0")}>
              {card.linkText}
            </span>
          ),
          linkProps: {
            href: card.href,
            onClick: () => onCardClick(card.slug),
          },
        } as const;

        return (
          <li key={card.slug} className={fr.cx("fr-col-12", "fr-col-md-4")}>
            {/*
              Deux appels plutôt qu'un `imageUrl` optionnel : le type du DSFR
              est une union, `imageUrl` et `imageAlt` y vont toujours ensemble.
              L'alt est vide parce que l'illustration ne dit rien que le titre
              et la description ne disent déjà.
            */}
            {card.imageUrl ? (
              <Card {...common} imageUrl={card.imageUrl} imageAlt="" />
            ) : (
              <Card {...common} />
            )}
          </li>
        );
      })}
    </ul>
  </div>
);
