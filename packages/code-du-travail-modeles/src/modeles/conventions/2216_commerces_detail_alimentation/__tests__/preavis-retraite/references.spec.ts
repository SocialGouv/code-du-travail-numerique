import {
  DepartRetraiteReferences,
  MiseRetraiteReferences,
} from "../../../../../__test__/common/legal-references";
import { PreavisRetraitePublicodes } from "../../../../../publicodes";

const engine = new PreavisRetraitePublicodes(modelsPreavisRetraite);

const DepartRetraiteOuvriersReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 5 de l'annexe I",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517480?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517480",
  },
  {
    article: "Article 8 de l'annexe I",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517493",
  },
];

const DepartRetraiteTechniciensReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 5.1 de l'annexe II",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000041517514/?idConteneur=KALICONT000005635085",
  },
  {
    article: "Article 8 de l'annexe II",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517529?idConteneur=KALICONT000005635085#KALIARTI000041517529",
  },
];

const DepartRetraiteCadresReferences = [
  ...DepartRetraiteReferences,
  {
    article: "Article 8 de l'annexe III",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517566?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517566=",
  },
];

const MiseRetraiteOuvriersReferences = [
  ...MiseRetraiteReferences,
  {
    article: "Article 5 de l'annexe I",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517480?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517480",
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
    article: "Article 8 de l'annexe III",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000041517566?idConteneur=KALICONT000005635085&origin=list#KALIARTI000041517566=",
  },
];

describe("Vérification des références juridiques pour la CC 2216", () => {
  test.each`
    category                               | expectedReferences
    ${"Employés et ouvriers"}              | ${DepartRetraiteOuvriersReferences}
    ${"Techniciens et agents de maîtrise"} | ${DepartRetraiteTechniciensReferences}
    ${"Cadres"}                            | ${DepartRetraiteCadresReferences}
  `(
    "Vérification des références juridiques pour un $category en départ à la retraite",
    ({ category, expectedReferences }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "non",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.getReferences();

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
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC2216'",
        "contrat salarié . convention collective . commerce gros et detail alimentation . catégorie professionnelle": `'${category}'`,
        "contrat salarié . mise à la retraite": "oui",
        "contrat salarié . travailleur handicapé": "non",
      });
      const result = engine.getReferences();

      expect(result).toHaveLength(expectedReferences.length);
      expect(result).toEqual(expect.arrayContaining(expectedReferences));
    }
  );
});
