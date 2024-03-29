import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3043"
);

const references = [
  {
    article: "Article 4.11.3",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172424",
  },
  {
    article: "Article 4.2",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172405?idConteneur=KALICONT000027172335&origin=list#KALIARTI000027172405",
  },
];

describe("Indemnité conventionnel de licenciement pour la CC 3043", () => {
  test.each`
    seniority | salary
    ${5}      | ${2000}
    ${8}      | ${2000}
    ${15}     | ${2000}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary",
    ({ seniority, salary }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC3043'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          salary,
      });

      const result = engine.getReferences("résultat conventionnel");

      expect(result).toHaveLength(references.length);
      expect(result).toEqual(expect.arrayContaining(references));
    }
  );
});
