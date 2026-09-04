"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { ContributionContent } from "./ContributionContent";
import { useContributionTracking } from "./tracking";
import { useContentViewTracking } from "./useContentViewTracking";
import Html from "../common/Html";
import Link from "../common/Link";
import Accordion from "@codegouvfr/react-dsfr/Accordion";
import { ListWithArrow } from "../common/ListWithArrow";
import { RelatedItems } from "../common/RelatedItems";
import { RELATED_ARTICLES_TITLE, RelatedItem } from "../documents/type";
import { Contribution } from "./type";
import { ContributionRating } from "./rating";
import { css } from "@styled-system/css";
import { ExploreThemes } from "./explore-themes/ExploreThemes";
import type { ExploreTheme } from "./explore-themes/type";

type Props = {
  contribution: Contribution;
  relatedItems: {
    items: RelatedItem[];
    title: string;
  }[];
  exploreThemes?: ExploreTheme[];
};

export function ContributionAgreementContent({
  contribution,
  // Défaut défensif : le rendu tolérait déjà l'absence de contenus liés.
  relatedItems = [],
  exploreThemes = [],
}: Props) {
  const { emitContentViewed } = useContributionTracking();
  const titleRef = useContentViewTracking<HTMLHeadingElement>(() =>
    emitContentViewed(contribution.slug)
  );

  // #7455 : la rubrique « Explorez nos thématiques » remplace les articles
  // liés. Retrait conditionnel : une contribution non mappée garde ses articles
  // liés plutôt que de se retrouver sans aucune suggestion (et sert de témoin
  // au test). « Modèles et simulateurs liés » n'est jamais touché.
  const sidebarRelatedItems =
    exploreThemes.length > 0
      ? relatedItems.filter(({ title }) => title !== RELATED_ARTICLES_TITLE)
      : relatedItems;

  return (
    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mb-6w")}>
      <div
        className={fr.cx("fr-col-12", "fr-col-lg-8", "fr-mb-6w", "fr-mb-md-0")}
      >
        {/* Rappel de la CC, pas un titre de section : taille H6 (20 px, gras)
            pour éviter l'effet « gros titre » quand le nom de la CC est long
            (#7439). Le niveau sémantique h2 reste inchangé. */}
        <h2 ref={titleRef} className={fr.cx("fr-h6")}>
          Réponse pour la convention : {contribution.ccnShortTitle}
        </h2>
        <ContributionContent contribution={contribution} titleLevel={2} />
        <ExploreThemes
          themes={exploreThemes}
          contributionSlug={contribution.slug}
          className={fr.cx("fr-mt-6w")}
        />
        {contribution.references.length > 0 && (
          <Accordion
            label="Références"
            titleAs="h3"
            className={fr.cx("fr-mt-6w")}
          >
            <ListWithArrow
              items={contribution.references.map(({ title, url }) => {
                if (!url) return <></>;
                return (
                  <Link
                    key={title}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {title}
                  </Link>
                );
              })}
            />
          </Accordion>
        )}
        {contribution.messageBlock && (
          <div className={fr.cx("fr-alert", "fr-alert--info", "fr-my-6w")}>
            <>
              <h3 className={fr.cx("fr-h5")}>Attention</h3>
              <Html>{contribution.messageBlock}</Html>
            </>
          </div>
        )}
      </div>
      <div className={fr.cx("fr-col-12", "fr-col-md-4", "fr-p-md-3w")}>
        <p className={`${fr.cx("fr-mb-6w")} ${p}`}>
          <span
            className={`${fr.cx("ri-arrow-right-line")} ${css({
              color: "var(--artwork-minor-blue-cumulus)",
            })}`}
          />
          <span>
            Consultez les questions-réponses fréquentes pour la convention
            collective{" "}
            <Link href={`/convention-collective/${contribution.ccnSlug}`}>
              {contribution.ccnShortTitle}
            </Link>
          </span>
        </p>
        <ContributionRating contributionSlug={contribution.slug} level={3} />
        <RelatedItems relatedItems={sidebarRelatedItems} level={3} />
      </div>
    </div>
  );
}

const p = css({
  display: "flex",
  columnGap: ".5rem",
});
