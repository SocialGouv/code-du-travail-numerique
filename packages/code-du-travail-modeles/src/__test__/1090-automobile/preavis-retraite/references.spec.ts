import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const DepartRetraiteOuvriers = [
  ...DepartRetraiteReferences,
  {
    article: "Article 1.23",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000037964029/?idConteneur=KALICONT000005635191",
  },
  {
    article: "Article 2.12 pour les ouvriers et employés",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000024926886/?idConteneur=KALICONT000005635191",
  },
];

const DepartRetraiteAgentsMaitrisesCadres = [
  ...DepartRetraiteReferences,
  {
    article: "Article 1.23",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000037964029/?idConteneur=KALICONT000005635191",
  },
  {
    article: "Article 4.10 pour les agents de maîtrise et cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000024926890/?idConteneur=KALICONT000005635191",
  },
];

const MiseRetraiteOuvriers = [
  ...MiseRetraiteReferences,
  {
    article: "Article 1.23",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000037964029/?idConteneur=KALICONT000005635191",
  },
  {
    article: "Article 2.12 pour les ouvriers et employés",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000024926886/?idConteneur=KALICONT000005635191",
  },
];

const MiseRetraiteAgentsMaitrisesCadres = [
  ...MiseRetraiteReferences,
  {
    article: "Article 1.23",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000037964029/?idConteneur=KALICONT000005635191",
  },
  {
    article: "Article 4.10 pour les agents de maîtrise et cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000024926890/?idConteneur=KALICONT000005635191",
  },
];

const engine = new Engine(mergeModels());

test.each`
  retirement  | category                | expectedReferences
  ${"depart"} | ${"Ouvriers"}           | ${DepartRetraiteOuvriers}
  ${"depart"} | ${"Agents de maîtrise"} | ${DepartRetraiteAgentsMaitrisesCadres}
  ${"depart"} | ${"Cadres"}             | ${DepartRetraiteAgentsMaitrisesCadres}
  ${"mise"}   | ${"Ouvriers"}           | ${MiseRetraiteOuvriers}
  ${"mise"}   | ${"Agents de maîtrise"} | ${MiseRetraiteAgentsMaitrisesCadres}
  ${"mise"}   | ${"Cadres"}             | ${MiseRetraiteAgentsMaitrisesCadres}
`(
  "Vérification des références juridiques pour un employé ayant comme categorie $category, en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 4,
        "contrat salarié . convention collective": "'IDCC1090'",
        "contrat salarié . convention collective . automobiles . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
