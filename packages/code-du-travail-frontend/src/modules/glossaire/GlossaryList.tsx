import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { GlossaryTerms } from "./GlossaryTerms";
import { getGlossaryLetters } from "./utils";
import { GlossaryItem } from "./types";
import { ContainerWithBreadcrumbs } from "../layout/ContainerWithBreadcrumbs";
import { AlphabeticList } from "../utils/alphabetic.list";

type GlossaryProps = {
  glossary: GlossaryItem[];
};

export const GlossaryList = ({ glossary = [] }: GlossaryProps) => {
  const termsByLetters = getGlossaryLetters(glossary);
  const availableLetters = termsByLetters
    .filter(({ terms }) => terms.length > 0)
    .map(({ letter }) => letter);

  return (
    <ContainerWithBreadcrumbs currentPage={"Glossaire"} breadcrumbs={[]}>
      <h1 id="glossary" className={fr.cx("fr-mt-0", "fr-mb-4w")}>
        Glossaire
      </h1>

      <p className={fr.cx("fr-mb-6w")}>
        Les définitions de ce glossaire, disponibles en surbrillance dans les
        textes des réponses, ont pour objectif d&apos;améliorer la compréhension
        des termes juridiques. Elles ne se substituent pas à la définition
        juridique exacte de ces termes.
      </p>

      <div className={fr.cx("fr-mb-6w")}>
        <AlphabeticList letters={availableLetters} />
      </div>

      <div className={fr.cx("fr-mt-4w")}>
        <GlossaryTerms letters={termsByLetters} />
      </div>
    </ContainerWithBreadcrumbs>
  );
};
