import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "2264"
);

describe("Indemnité conventionnel de licenciement pour la CC 2264", () => {
  describe("Cas standard", () => {
    test.each`
      category        | seniorityRight | seniority | salary  | expectedCompensation
      ${"Non-cadres"} | ${11 / 12}     | ${1}      | ${2000} | ${0}
      ${"Non-cadres"} | ${1}           | ${1}      | ${2000} | ${400}
      ${"Non-cadres"} | ${1}           | ${2}      | ${2000} | ${800}
      ${"Non-cadres"} | ${1}           | ${5}      | ${2000} | ${2000}
      ${"Non-cadres"} | ${1}           | ${8}      | ${2000} | ${3200}
      ${"Non-cadres"} | ${1}           | ${10.58}  | ${2000} | ${4464}
      ${"Non-cadres"} | ${1}           | ${10}     | ${2000} | ${4000}
      ${"Non-cadres"} | ${1}           | ${13}     | ${2000} | ${6400}
      ${"Non-cadres"} | ${1}           | ${15}     | ${2000} | ${8000}
      ${"Non-cadres"} | ${1}           | ${42}     | ${2000} | ${29600}
      ${"Cadres"}     | ${11 / 12}     | ${1}      | ${2000} | ${0}
      ${"Cadres"}     | ${1}           | ${1}      | ${2000} | ${400}
      ${"Cadres"}     | ${1}           | ${2}      | ${2000} | ${800}
      ${"Cadres"}     | ${1}           | ${4.25}   | ${2000} | ${1700}
      ${"Cadres"}     | ${1}           | ${5}      | ${2000} | ${5000}
      ${"Cadres"}     | ${1}           | ${10}     | ${2000} | ${15000}
      ${"Cadres"}     | ${1}           | ${12.5}   | ${2000} | ${20000}
      ${"Cadres"}     | ${1}           | ${14.42}  | ${2000} | ${23840}
      ${"Cadres"}     | ${1}           | ${15}     | ${2000} | ${24000}
      ${"Cadres"}     | ${1}           | ${15.08}  | ${2000} | ${25160}
      ${"Cadres"}     | ${1}           | ${42}     | ${2000} | ${50000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
        category,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2264'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
              "'Non'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Cas mixte", () => {
    test.each`
      seniorityNonCadres | seniorityRight | seniority | salary  | expectedCompensation
      ${2}               | ${0}           | ${1}      | ${2000} | ${0}
      ${2}               | ${1}           | ${1}      | ${2000} | ${800}
      ${2}               | ${1}           | ${2}      | ${2000} | ${800}
      ${2}               | ${1}           | ${5}      | ${2000} | ${2000}
      ${2}               | ${1}           | ${10}     | ${2000} | ${11800}
      ${2}               | ${1}           | ${15}     | ${2000} | ${21800}
      ${2}               | ${1}           | ${42}     | ${2000} | ${50000}
      ${5}               | ${11 / 12}     | ${1}      | ${2000} | ${0}
      ${5}               | ${1}           | ${1}      | ${2000} | ${2000}
      ${5}               | ${1}           | ${2}      | ${2000} | ${2000}
      ${5}               | ${1}           | ${5}      | ${2000} | ${2000}
      ${5}               | ${1}           | ${10}     | ${2000} | ${7000}
      ${5}               | ${1}           | ${15}     | ${2000} | ${17000}
      ${5}               | ${1}           | ${42}     | ${2000} | ${50000}
      ${5}               | ${11 / 12}     | ${1}      | ${2000} | ${0}
      ${10}              | ${1}           | ${10}     | ${2000} | ${4000}
      ${10}              | ${1}           | ${15}     | ${2000} | ${9000}
      ${10}              | ${1}           | ${42}     | ${2000} | ${50000}
      ${8}               | ${1}           | ${20.5}   | ${2000} | ${23200}
      ${10.58}           | ${1}           | ${25}     | ${2000} | ${28304}
      ${11}              | ${1}           | ${13}     | ${2000} | ${5600}
      ${0.75}            | ${1}           | ${5}      | ${2000} | ${2000}
      ${42}              | ${1}           | ${25}     | ${2000} | ${29600}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, seniorityNonCadres: $seniorityNonCadres => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
        seniorityNonCadres,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC2264'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
              "'Oui'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif":
              seniorityNonCadres,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });
});
