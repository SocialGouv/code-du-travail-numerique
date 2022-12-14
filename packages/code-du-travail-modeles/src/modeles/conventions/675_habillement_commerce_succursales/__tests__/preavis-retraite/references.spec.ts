import Engine from "publicodes";

import modeles from "../../../../../../src/__test__/output/modeles-preavis-retraite.json";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { getReferences } from "../../../../common";

const engine = new Engine(modeles as any);

const CadreReferences = [
  {
    article: 'Articles 17 de l\'avenant "Cadres"',
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851149/?idConteneur=KALICONT000005635617",
  },
];
const RetraiteEmployesReferences = [
  {
    article: "Article 38",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851078/?idConteneur=KALICONT000005635617",
  },
];
const RetraiteAgentsMaitriseReferences = [
  {
    article: "Article 9 de l'avenant maitrise",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000005851119/?idConteneur=KALICONT000005635617",
  },
];

test.each`
  retirement  | category                | expectedReferences
  ${"mise"}   | ${"Cadres"}             | ${MiseRetraiteReferences.concat(CadreReferences)}
  ${"départ"} | ${"Cadres"}             | ${DepartRetraiteReferences.concat(CadreReferences)}
  ${"mise"}   | ${"Employés"}           | ${MiseRetraiteReferences.concat(RetraiteEmployesReferences)}
  ${"départ"} | ${"Employés"}           | ${DepartRetraiteReferences.concat(RetraiteEmployesReferences)}
  ${"mise"}   | ${"Agents de maîtrise"} | ${MiseRetraiteReferences.concat(RetraiteAgentsMaitriseReferences)}
  ${"départ"} | ${"Agents de maîtrise"} | ${DepartRetraiteReferences.concat(RetraiteAgentsMaitriseReferences)}
`(
  "Vérification des références juridiques pour un $category en $retirement à la retraite",
  ({ retirement, category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . ancienneté": 6,
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . convention collective . habillement commerce succursales . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite":
          retirement === "mise" ? "oui" : "non",
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
