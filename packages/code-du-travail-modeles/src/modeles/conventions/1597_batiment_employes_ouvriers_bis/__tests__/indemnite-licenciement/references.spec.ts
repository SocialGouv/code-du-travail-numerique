import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1597"
);

const references = [
  {
    article: "Article 10.3",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005776857",
  },
  {
    article: "Article 10.4",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005776858?idConteneur=KALICONT000005635220",
  },
  {
    article: "Article 10.5",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005776860",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 1597", () => {
  describe("Cas standard", () => {
    test.each`
      age     | seniority | salary
      ${"54"} | ${2}      | ${2000}
      ${"56"} | ${2}      | ${2000}
      ${"54"} | ${5}      | ${2000}
      ${"56"} | ${5}      | ${2000}
      ${"54"} | ${20}     | ${2800}
      ${"56"} | ${20}     | ${2800}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age",
      ({ seniority, salary, age }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1597'",
          "contrat salarié . convention collective . batiment ouvriers employés bis . indemnité de licenciement . age": parseFloat(
            age
          ).toString(),
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(references.length);
        expect(result).toEqual(expect.arrayContaining(references));
      }
    );
  });

  describe("Cas complexe", () => {
    test.each`
      seniority | salary
      ${2}      | ${2000}
      ${2}      | ${2000}
      ${5}      | ${2000}
      ${5}      | ${2000}
      ${6}      | ${2000}
      ${6}      | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary",
      ({ seniority, salary }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC1597'",
          "contrat salarié . convention collective . batiment ouvriers employés bis . indemnité de licenciement . age":
            "55",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(references.length);
        expect(result).toEqual(expect.arrayContaining(references));
      }
    );
  });
});
