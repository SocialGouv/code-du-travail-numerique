"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Tile } from "@codegouvfr/react-dsfr/Tile";
import { css } from "@styled-system/css";
import { ThemeIcon } from "../../common/ThemeIcon";
import { useContributionTracking } from "../tracking";
import { useContentViewTracking } from "../useContentViewTracking";
import { ExploreTheme } from "./type";

type Props = {
  themes: ExploreTheme[];
  // Slug de la page courante (`1486-mon-slug` en CC, `mon-slug` sur la
  // générique), envoyé tel quel au tracking.
  contributionSlug: string;
  // Observe l'affichage de la rubrique pour `explorez_thematique_affichee`.
  // À `false` quand le bloc qui la contient n'est pas réellement affiché
  // (contenu générique masqué derrière une convention collective).
  trackViewEnabled?: boolean;
  className?: string;
};

// Libellé provisoire, en attendant la description éditoriale : `refs` compte
// tous les contenus rattachés au sous-thème (fiches, outils, modèles…).
export const documentCountLabel = (count: number): string =>
  count > 1 ? `${count} fiches à consulter` : `${count} fiche à consulter`;

export function ExploreThemes({
  themes,
  contributionSlug,
  trackViewEnabled = true,
  className,
}: Props) {
  const { emitClickExploreTheme, emitExploreThemesViewed } =
    useContributionTracking();
  // « Affichée » = un pixel de la rubrique dans le viewport, onglet actif,
  // sans temps de présence (`dwellMs: 0`) ni bande haute (`topBandRatio: 1`) :
  // on mesure que les cartes ont été à l'écran, pas qu'elles ont été lues.
  const sectionRef = useContentViewTracking<HTMLDivElement>(
    () => emitExploreThemesViewed(contributionSlug),
    { dwellMs: 0, topBandRatio: 1, enabled: trackViewEnabled }
  );

  // Contribution absente du mapping éditorial : la rubrique n'existe pas.
  if (themes.length === 0) return null;

  return (
    <div ref={sectionRef} className={`${className ?? ""} ${hideOnPrint}`}>
      {/* Sœur de l'accordéon « Références » (h3) : le h3 préserve l'invariant
          « un seul h2, la réponse » (#7439). `fr-h5` porte la taille 22 px de
          la maquette, indépendamment du niveau sémantique. */}
      <h3 className={fr.cx("fr-h5")}>Explorez nos thématiques</h3>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        {themes.map((theme, index) => (
          <div key={theme.slug} className={fr.cx("fr-col-12", "fr-col-md-6")}>
            <Tile
              orientation="horizontal"
              small
              noIcon
              enlargeLinkOrButton
              titleAs="h4"
              pictogram={
                theme.iconName ? <ThemeIcon name={theme.iconName} /> : undefined
              }
              title={theme.title}
              desc={
                theme.description ?? documentCountLabel(theme.documentCount)
              }
              linkProps={{
                href: theme.href,
                onClick: () =>
                  emitClickExploreTheme(
                    contributionSlug,
                    theme.slug,
                    index + 1
                  ),
              }}
              classes={{ desc: tileDesc }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// `.fr-tile--sm .fr-tile__desc` vaut 0.875rem ; la maquette demande 16/25.
// Pas de couleur en dur : `#3A3A3A` est déjà `--text-default-grey`.
const tileDesc = css({
  fontSize: "1rem",
  lineHeight: "1.5625rem",
});

// Comme « Articles liés » : c'est de la navigation, elle n'a rien à faire sur
// une réponse imprimée.
const hideOnPrint = css({
  "@media print": {
    display: "none",
  },
});
