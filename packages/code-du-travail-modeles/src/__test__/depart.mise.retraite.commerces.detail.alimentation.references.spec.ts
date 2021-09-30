import Engine from "publicodes";
import { mergeModels } from "../internal/merger";
import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "./common/LegalReferences";
import { getReferences } from "../utils/GetReferences";

const engine = new Engine(mergeModels());

const DepartRetraiteCadresReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 9 de l'annexe III",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517573/?idConteneur=KALICONT000005635085",
  },
];

const MiseRetraiteOuvriersReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 3.12",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000023307000/?idConteneur=KALICONT000005635085",
  },
  {
    article: "Article 3 de l'annexe I",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517472/?idConteneur=KALICONT000005635085",
  },
];

const MiseRetraiteTechniciensReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 5.1 de l'annexe II",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517514/?idConteneur=KALICONT000005635085",
  },
];

const MiseRetraiteCadresReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 9 de l'annexe III",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517573/?idConteneur=KALICONT000005635085",
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
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . convention collective . commerce gros et detail alimentation . départ à la retraite . catégorie professionnelle": `'${category}'`,
        "contrat salarié . travailleur handicapé": "non",
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
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . convention collective . commerce gros et detail alimentation . mise à la retraite . catégorie professionnelle": `'${category}'`,
        "contrat salarié . travailleur handicapé": "non",
      })
    );

    expect(result).toHaveLength(expectedReferences.length);
    expect(result).toEqual(expect.arrayContaining(expectedReferences));
  }
);
