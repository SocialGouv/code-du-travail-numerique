import React from "react";
import { SectionTitle } from ".";

export default {
  component: SectionTitle,
  title: "Components|SectionTitle"
};

export const base = () => (
  <>
    <SectionTitle desc="Trouvez des réponses personnalisées selon votre situation">
      Boîte à outils
    </SectionTitle>
    <SectionTitle>Les articles les plus populaires</SectionTitle>
    <SectionTitle
      href="http://code.travail.gouv.fr"
      desc="Retrouvez tous nos contenus autour de grands thèmes"
    >
      Thèmes
    </SectionTitle>
  </>
);
