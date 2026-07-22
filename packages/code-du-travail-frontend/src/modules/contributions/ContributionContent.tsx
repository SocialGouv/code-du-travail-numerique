"use client";
import React from "react";

import { Contribution } from "./type";
import DisplayContent, { numberLevel } from "../common/DisplayContent";
import { ContentSP } from "./ContentSP";
import { useContributionTracking } from "./tracking";

type Props = {
  contribution: Contribution;
  titleLevel: numberLevel;
};

export const ContributionContent = ({ contribution, titleLevel }: Props) => {
  const { emitClickTableFullscreen } = useContributionTracking();
  return (
    <section>
      {contribution.isFicheSP ? (
        <ContentSP raw={contribution.raw} titleLevel={titleLevel - 2} />
      ) : (
        <DisplayContent
          content={contribution.content}
          // Le contenu s'affiche sous un titre de section (« Réponse… » /
          // « Réponse d'après le Code du Travail ») de niveau `titleLevel`. Ses
          // titres descendent donc d'un cran (h{titleLevel + 1}) tout en gardant
          // la taille visuelle du niveau parent (visualOffset -1) : l'apparence
          // ne bouge pas.
          titleLevel={(titleLevel + 1) as numberLevel}
          visualOffset={-1}
          extra={{
            infographics: contribution.infographics ?? [],
            smicHourly: contribution.smicValue,
            onTableFullscreen: () =>
              emitClickTableFullscreen(contribution.slug),
          }}
        />
      )}
    </section>
  );
};
