import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1483"
);

const refNonCadres = [
  {
    article: "Article 17, Chapitre Ier",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000022017249/?idConteneur=KALICONT000005635594",
  },
  {
    article: "Article 18, Chapitre Ier",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000022017246/?idConteneur=KALICONT000005635594",
  },
  {
    article: "Article 31",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005840280?idConteneur=KALICONT000005635594&origin=list#KALIARTI000005840280",
  },
];

const refCadres = [
  {
    article: "Article 11, Chapitre II",
    url: "https://www.legifrance.gouv.fr/conv_coll/id/KALIARTI000022017243/?idConteneur=KALICONT000005635594&origin=list",
  },
  {
    article: "Article 31",
    url: "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005840280?idConteneur=KALICONT000005635594&origin=list#KALIARTI000005840280",
  },
];

describe("Références juridique pour l'indemnité conventionnel de licenciement pour la CC 1483", () => {
  describe("Pour un non-cadres", () => {
    test.each`
      seniorityRight | seniority | salary  | expectedReferences
      ${1.01}        | ${8}      | ${2331} | ${refNonCadres}
      ${1.01}        | ${10}     | ${2331} | ${refNonCadres}
      ${1.01}        | ${18}     | ${2450} | ${refNonCadres}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedReferences",
      ({ seniority, seniorityRight, salary, expectedReferences }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Non-cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });

  describe("Pour un cadres", () => {
    test.each`
      age   | seniorityRight | seniority | salary  | expectedReferences
      ${50} | ${1.01}        | ${2}      | ${3040} | ${refCadres}
      ${50} | ${1.01}        | ${5}      | ${3040} | ${refCadres}
      ${50} | ${1.01}        | ${17}     | ${3040} | ${refCadres}
      ${51} | ${1.01}        | ${2}      | ${3040} | ${refCadres}
      ${51} | ${1.01}        | ${5}      | ${3040} | ${refCadres}
      ${51} | ${1.01}        | ${17}     | ${3040} | ${refCadres}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age => $expectedReferences",
      ({ seniority, seniorityRight, salary, expectedReferences, age }) => {
        engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1483'",
            "contrat salarié . convention collective . habillement textiles commerce de detail . age":
              age,
            "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle": `'Cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        const result = engine.getReferences("résultat conventionnel");

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
