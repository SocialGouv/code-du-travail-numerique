import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 2264", () => {
  describe("Cas standard", () => {
    test.each`
      category        | seniority | salary  | expectedCompensation
      ${"Non-cadres"} | ${0}      | ${2000} | ${0}
      ${"Non-cadres"} | ${1}      | ${2000} | ${400}
      ${"Non-cadres"} | ${2}      | ${2000} | ${800}
      ${"Non-cadres"} | ${5}      | ${2000} | ${2000}
      ${"Non-cadres"} | ${8}      | ${2000} | ${3200}
      ${"Non-cadres"} | ${10.58}  | ${2000} | ${4464}
      ${"Non-cadres"} | ${10}     | ${2000} | ${4000}
      ${"Non-cadres"} | ${13}     | ${2000} | ${6400}
      ${"Non-cadres"} | ${15}     | ${2000} | ${8000}
      ${"Non-cadres"} | ${42}     | ${2000} | ${29600}
      ${"Cadres"}     | ${0}      | ${2000} | ${0}
      ${"Cadres"}     | ${1}      | ${2000} | ${400}
      ${"Cadres"}     | ${2}      | ${2000} | ${800}
      ${"Cadres"}     | ${4.25}   | ${2000} | ${1700}
      ${"Cadres"}     | ${5}      | ${2000} | ${5000}
      ${"Cadres"}     | ${10}     | ${2000} | ${15000}
      ${"Cadres"}     | ${12.5}   | ${2000} | ${20000}
      ${"Cadres"}     | ${14.42}  | ${2000} | ${23840}
      ${"Cadres"}     | ${15}     | ${2000} | ${24000}
      ${"Cadres"}     | ${15.08}  | ${2000} | ${25160}
      ${"Cadres"}     | ${42}     | ${2000} | ${50000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, category }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2264'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
              "'Non'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("Cas mixte", () => {
    test.each`
      seniorityNonCadres | seniority | salary  | expectedCompensation
      ${0}               | ${0}      | ${2000} | ${0}
      ${0}               | ${1}      | ${2000} | ${400}
      ${0}               | ${2}      | ${2000} | ${800}
      ${0}               | ${5}      | ${2000} | ${5000}
      ${0}               | ${10}     | ${2000} | ${15000}
      ${0}               | ${15}     | ${2000} | ${24000}
      ${0}               | ${42}     | ${2000} | ${50000}
      ${2}               | ${0}      | ${2000} | ${0}
      ${2}               | ${1}      | ${2000} | ${800}
      ${2}               | ${2}      | ${2000} | ${800}
      ${2}               | ${5}      | ${2000} | ${2000}
      ${2}               | ${10}     | ${2000} | ${11800}
      ${2}               | ${15}     | ${2000} | ${21800}
      ${2}               | ${42}     | ${2000} | ${50000}
      ${5}               | ${0}      | ${2000} | ${0}
      ${5}               | ${1}      | ${2000} | ${2000}
      ${5}               | ${2}      | ${2000} | ${2000}
      ${5}               | ${5}      | ${2000} | ${2000}
      ${5}               | ${10}     | ${2000} | ${7000}
      ${5}               | ${15}     | ${2000} | ${17000}
      ${5}               | ${42}     | ${2000} | ${50000}
      ${5}               | ${0}      | ${2000} | ${0}
      ${10}              | ${10}     | ${2000} | ${4000}
      ${10}              | ${15}     | ${2000} | ${9000}
      ${10}              | ${42}     | ${2000} | ${50000}
      ${8}               | ${20.5}   | ${2000} | ${23200}
      ${10.58}           | ${25}     | ${2000} | ${28304}
      ${11}              | ${13}     | ${2000} | ${5600}
      ${0.75}            | ${5}      | ${2000} | ${2000}
      ${42}              | ${25}     | ${2000} | ${29600}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, seniorityNonCadres: $seniorityNonCadres => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, seniorityNonCadres }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2264'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
              "'Cadres'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période":
              "'Oui'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle . cadre . non cadre durant une période . temps effectif":
              seniorityNonCadres,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
