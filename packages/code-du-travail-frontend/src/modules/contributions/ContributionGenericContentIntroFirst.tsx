"use client";
import React, { ComponentProps, forwardRef } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import DisplayContent from "../common/DisplayContent";
import { ContributionGenericContent } from "./ContributionGenericContent";
import { CcBlockSlot } from "./ccPosition";
import { splitContentAtFirstAccordion } from "./contributionUtils";
import { useContributionTracking } from "./tracking";

type Props = ComponentProps<typeof ContributionGenericContent>;

/**
 * Variante C de l'A/B test #7481 : l'introduction de la fiche (le contenu qui
 * précède le premier accordéon) puis le bloc de choix de CC occupent le haut
 * de la page, sur toute la largeur, là où le bloc seul se trouve dans le
 * témoin. La suite du contenu (accordéons, références, déclinaisons, encart
 * « Attention ») garde la mise en page habituelle sous le titre « Réponse
 * d'après le Code du Travail », avec la colonne latérale.
 *
 * Composant dédié plutôt qu'une option de `ContributionGenericContent` : le
 * test est temporaire, sa suppression ne doit toucher que ce fichier et
 * l'aiguillage dans `ContributionGeneric`.
 */
export const ContributionGenericContentIntroFirst = forwardRef<
  HTMLParagraphElement,
  Props
>(({ contribution, displayGeneric, ...props }, ref) => {
  const { emitClickTableFullscreen } = useContributionTracking();
  // Les fiches Service Public (`raw`) n'ont pas de HTML éditorial à découper :
  // tout reste dans la mise en page habituelle, le bloc passe en tête.
  const { intro, rest } = contribution.isFicheSP
    ? { intro: "", rest: contribution.content }
    : splitContentAtFirstAccordion(contribution.content);

  return (
    <>
      <div
        className={fr.cx("fr-mb-3w", !displayGeneric && "fr-hidden")}
        data-testid="contribution-intro"
      >
        {intro && (
          // Sous le seul `h1` de la page : les titres éventuels de
          // l'introduction sont des `h2`, comme le titre de la réponse.
          <DisplayContent
            content={intro}
            titleLevel={2}
            extra={{
              infographics: contribution.infographics ?? [],
              smicHourly: contribution.smicValue,
              onTableFullscreen: () =>
                emitClickTableFullscreen(contribution.slug),
            }}
          />
        )}
      </div>
      <CcBlockSlot position="after-intro" />
      <ContributionGenericContent
        ref={ref}
        contribution={{ ...contribution, content: rest }}
        displayGeneric={displayGeneric}
        {...props}
      />
    </>
  );
});

ContributionGenericContentIntroFirst.displayName =
  "ContributionGenericContentIntroFirst";
