"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import {
  ContentTile,
  ThemeTile,
} from "../contributions/explore-themes/ExploreThemes";
import { useContentViewTracking } from "../contributions/useContentViewTracking";
import { useFicheSPTracking } from "./tracking";
import { getRecommendedItemKey, RecommendedItem } from "./types";

type Props = {
  items: RecommendedItem[];
  // Slug de la fiche courante, envoyé tel quel au tracking.
  ficheSlug: string;
};

const RecommendedItemTile = ({
  item,
  onClick,
}: {
  item: RecommendedItem;
  onClick: () => void;
}) => {
  switch (item.type) {
    case "theme":
      return <ThemeTile theme={item.theme} titleAs="h3" onClick={onClick} />;
    case "document":
      return (
        <ContentTile
          title={item.title}
          desc={item.desc}
          href={item.url}
          iconName={item.iconName}
          titleAs="h3"
          onClick={onClick}
        />
      );
  }
};

export function RecommendedLinks({ items, ficheSlug }: Props) {
  const { emitClickRecommendedLink, emitRecommendedLinksViewed } =
    useFicheSPTracking();
  // Mêmes réglages que « Explorez nos thématiques » : un pixel de la rubrique
  // dans le viewport suffit, on mesure que les cartes ont été à l'écran.
  const sectionRef = useContentViewTracking<HTMLDivElement>(
    () => emitRecommendedLinksViewed(ficheSlug),
    { dwellMs: 0, topBandRatio: 1 }
  );

  if (items.length === 0) return null;

  return (
    <div ref={sectionRef} className={`${fr.cx("fr-mt-5w")} ${hideOnPrint}`}>
      <h2 className={fr.cx("fr-h5")}>Liens recommandés</h2>
      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        {items.map((item, index) => {
          const key = getRecommendedItemKey(item);
          return (
            <div key={key} className={fr.cx("fr-col-12", "fr-col-md-6")}>
              <RecommendedItemTile
                item={item}
                onClick={() =>
                  emitClickRecommendedLink(ficheSlug, key, index + 1)
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const hideOnPrint = css({
  "@media print": {
    display: "none",
  },
});
