import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro675 } from "../../types";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "675"
);

const referencesOuvriers = [
  {
    article: "Article 42",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851083?idConteneur=K",
  },
];

const referencesAgents = [
  {
    article: "Article 11 de l'Avenant Maîtrise",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851122?idConteneur=KALICONT000005635617",
  },
];

const referencesCadres = [
  {
    article: "Article 16 de l'Avenant Cadres",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851148?idConteneur=KALICONT000005635617",
  },
];

describe("Références juridiques pour l'indemnité conventionnel de licenciement pour la CC 675", () => {
  test.each`
    category                  | seniority | expectedRef
    ${CategoryPro675.employe} | ${3}      | ${referencesOuvriers}
    ${CategoryPro675.employe} | ${6}      | ${referencesOuvriers}
    ${CategoryPro675.employe} | ${25}     | ${referencesOuvriers}
    ${CategoryPro675.agents}  | ${3}      | ${referencesAgents}
    ${CategoryPro675.agents}  | ${6}      | ${referencesAgents}
    ${CategoryPro675.agents}  | ${25}     | ${referencesAgents}
    ${CategoryPro675.cadres}  | ${3}      | ${referencesCadres}
    ${CategoryPro675.cadres}  | ${6}      | ${referencesCadres}
    ${CategoryPro675.cadres}  | ${25}     | ${referencesCadres}
  `(
    "Avec $seniority ans, catégorie $category on a $expectedRef",
    ({ category, seniority, expectedRef }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC0675'",
        "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie": `'${category}'`,
        "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . agents . licenciement collectif": `'Oui'`,
        "contrat salarié . convention collective . habillement commerce succursales . indemnité de licenciement . catégorie . cadres . licenciement collectif": `'Oui'`,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
      });

      const result = engine.getReferences("résultat conventionnel");
      expect(result).toHaveLength(expectedRef.length);
      expect(result).toEqual(expect.arrayContaining(expectedRef));
    }
  );
});
