import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";
import { CategoryPro29 } from "../../salary";

const engine = SingletonEnginePublicodes.getInstance();

const refOther = [
  {
    article: "Article 15.02.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000030464087?idConteneur=KALICONT000005635234&origin=list#KALIARTI000030464087",
  },
  {
    article: "Article 08.01.6.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029952730?idConteneur=KALICONT000005635234&origin=list#KALIARTI000029952730",
  },
];

const refMedic = [
  {
    article: "Article 15.02.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000030464087?idConteneur=KALICONT000005635234&origin=list#KALIARTI000030464087",
  },
  {
    article: "Article 20.05/20.04",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029952874?idConteneur=KALICONT000005635234#KALIARTI000029952874",
  },
  {
    article: "Article 08.01.6.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029952730?idConteneur=KALICONT000005635234&origin=list#KALIARTI000029952730",
  },
];

const refAssistant = [
  {
    article: "Article 15.02.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000030464087?idConteneur=KALICONT000005635234&origin=list#KALIARTI000030464087",
  },
  {
    article:
      "Article A 10.12 de l'Annexe X Assistants familiaux des services de placements familiaux spécialisés / Annexe VI, art. A6.12",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029953093?idConteneur=KALICONT000005635234&origin=list#KALIARTI000029953093",
  },
  {
    article: "Article 08.01.6.1",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029952730?idConteneur=KALICONT000005635234&origin=list#KALIARTI000029952730",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 29", () => {
  describe("Cas standard", () => {
    test.each`
      category                   | expectedReferences
      ${CategoryPro29.other}     | ${refOther}
      ${CategoryPro29.medic}     | ${refMedic}
      ${CategoryPro29.assistant} | ${refAssistant}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, type de licenciement $typeLicenciement, catégorie $category => $expectedReferences",
      ({ expectedReferences, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0029'",
          "contrat salarié . convention collective . hospitalisation privée à but non lucratif . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 10,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2000,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
