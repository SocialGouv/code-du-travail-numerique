import { getReferences } from "../../../../common";

const engine = SingletonEnginePublicodes.getInstance();

const references = [
  {
    article: "Article 47",
    url:
      "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000020981961?idConteneur=KALICONT000005635813",
  },
];

describe("Références jurdiques pour l'indemnité conventionnel de licenciement pour la CC 2264", () => {
  describe("Cas standard", () => {
    test.each`
      category        | seniority | salary
      ${"Non-cadres"} | ${1}      | ${2000}
      ${"Non-cadres"} | ${2}      | ${2000}
      ${"Non-cadres"} | ${5}      | ${2000}
      ${"Non-cadres"} | ${8}      | ${2000}
      ${"Non-cadres"} | ${10.58}  | ${2000}
      ${"Non-cadres"} | ${10}     | ${2000}
      ${"Non-cadres"} | ${13}     | ${2000}
      ${"Non-cadres"} | ${15}     | ${2000}
      ${"Non-cadres"} | ${42}     | ${2000}
      ${"Cadres"}     | ${1}      | ${2000}
      ${"Cadres"}     | ${2}      | ${2000}
      ${"Cadres"}     | ${4.25}   | ${2000}
      ${"Cadres"}     | ${5}      | ${2000}
      ${"Cadres"}     | ${10}     | ${2000}
      ${"Cadres"}     | ${12.5}   | ${2000}
      ${"Cadres"}     | ${14.42}  | ${2000}
      ${"Cadres"}     | ${15}     | ${2000}
      ${"Cadres"}     | ${15.08}  | ${2000}
      ${"Cadres"}     | ${42}     | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary",
      ({ seniority, salary, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2264'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
            "'Non'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(references.length);
        expect(result).toEqual(expect.arrayContaining(references));
      }
    );
  });

  describe("Cas mixte", () => {
    test.each`
      seniorityNonCadres | seniority | salary
      ${0}               | ${1}      | ${2000}
      ${0}               | ${2}      | ${2000}
      ${0}               | ${5}      | ${2000}
      ${0}               | ${10}     | ${2000}
      ${0}               | ${15}     | ${2000}
      ${0}               | ${42}     | ${2000}
      ${2}               | ${1}      | ${2000}
      ${2}               | ${2}      | ${2000}
      ${2}               | ${5}      | ${2000}
      ${2}               | ${10}     | ${2000}
      ${2}               | ${15}     | ${2000}
      ${2}               | ${42}     | ${2000}
      ${5}               | ${1}      | ${2000}
      ${5}               | ${2}      | ${2000}
      ${5}               | ${5}      | ${2000}
      ${5}               | ${10}     | ${2000}
      ${5}               | ${15}     | ${2000}
      ${5}               | ${42}     | ${2000}
      ${10}              | ${10}     | ${2000}
      ${10}              | ${15}     | ${2000}
      ${10}              | ${42}     | ${2000}
      ${8}               | ${20.5}   | ${2000}
      ${10.58}           | ${25}     | ${2000}
      ${11}              | ${13}     | ${2000}
      ${0.75}            | ${5}      | ${2000}
      ${42}              | ${25}     | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, seniorityNonCadres: $seniorityNonCadres => $expectedCompensation €",
      ({ seniority, salary, seniorityNonCadres }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC2264'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
            "'Oui'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif": seniorityNonCadres,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });
        const result = getReferences(situation, "résultat conventionnel");

        expect(result).toHaveLength(references.length);
        expect(result).toEqual(expect.arrayContaining(references));
      }
    );
  });
});
