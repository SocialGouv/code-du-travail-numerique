import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";
import { getReferences } from "../../../utils";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../common/legal-references";

const engine = new Engine(mergeModels());

const DepartRetraiteCadresReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 8 de l'annexe III",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517566?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517566=",
  },
];

const MiseRetraiteOuvriersReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 5 de l'annexe I",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517480?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517480",
  },
];

const MiseRetraiteTechniciensReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 5.1 de l'annexe II",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517514/?idConteneur=KALICONT000005635085",
  },
];

const MiseRetraiteCadresReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 8 de l'annexe III",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517566?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517566=",
  },
];

test.each`
  category        | expectedReferences
  ${"Non-cadres"} | ${DepartRetraiteReferences}
  ${"Cadres"}     | ${DepartRetraiteCadresReferences}
`(
  "Vérification des références juridiques pour un $category en départ à la retraite",
  ({ category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . départ à la retraite . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);

test.each`
  category                               | expectedReferences
  ${"Employés et ouvriers"}              | ${MiseRetraiteOuvriersReferences}
  ${"Techniciens et agents de maîtrise"} | ${MiseRetraiteTechniciensReferences}
  ${"Cadres"}                            | ${MiseRetraiteCadresReferences}
`(
  "Vérification des références juridiques pour un $category en mise à la retraite",
  ({ category, expectedReferences }) => {
    const result = getReferences(
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . mise à la retraite . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
        "préavis de retraite": "oui",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
