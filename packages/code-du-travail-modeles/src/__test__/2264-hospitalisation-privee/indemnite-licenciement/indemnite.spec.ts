import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité conventionnel de licenciement pour la CC 2264", () => {
  describe("Cas standard", () => {
    test.each`
      category       | seniority | salary  | expectedCompensation
      ${"Non-cadre"} | ${0}      | ${2000} | ${0}
      ${"Non-cadre"} | ${1}      | ${2000} | ${400}
      ${"Non-cadre"} | ${2}      | ${2000} | ${800}
      ${"Non-cadre"} | ${5}      | ${2000} | ${2000}
      ${"Non-cadre"} | ${8}      | ${2000} | ${3200}
      ${"Non-cadre"} | ${10.58}  | ${2000} | ${4464}
      ${"Non-cadre"} | ${10}     | ${2000} | ${4000}
      ${"Non-cadre"} | ${13}     | ${2000} | ${6400}
      ${"Non-cadre"} | ${15}     | ${2000} | ${8000}
      ${"Non-cadre"} | ${42}     | ${2000} | ${29600}
      ${"Cadre"}     | ${0}      | ${2000} | ${0}
      ${"Cadre"}     | ${1}      | ${2000} | ${400}
      ${"Cadre"}     | ${2}      | ${2000} | ${800}
      ${"Cadre"}     | ${4.25}   | ${2000} | ${1700}
      ${"Cadre"}     | ${5}      | ${2000} | ${5000}
      ${"Cadre"}     | ${10}     | ${2000} | ${15000}
      ${"Cadre"}     | ${12.5}   | ${2000} | ${20000}
      ${"Cadre"}     | ${14.42}  | ${2000} | ${23840}
      ${"Cadre"}     | ${15}     | ${2000} | ${25000}
      ${"Cadre"}     | ${15.08}  | ${2000} | ${25160}
      ${"Cadre"}     | ${42}     | ${2000} | ${50000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, category }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2264'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
            "indemnité de licenciement": "oui",
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
      seniorityNonCadre | seniority | salary  | expectedCompensation
      ${0}              | ${0}      | ${2000} | ${0}
      ${0}              | ${1}      | ${2000} | ${400}
      ${0}              | ${2}      | ${2000} | ${800}
      ${0}              | ${5}      | ${2000} | ${5000}
      ${0}              | ${10}     | ${2000} | ${15000}
      ${0}              | ${15}     | ${2000} | ${25000}
      ${0}              | ${42}     | ${2000} | ${50000}
      ${2}              | ${0}      | ${2000} | ${0}
      ${2}              | ${1}      | ${2000} | ${800}
      ${2}              | ${2}      | ${2000} | ${800}
      ${2}              | ${5}      | ${2000} | ${2000}
      ${2}              | ${10}     | ${2000} | ${11800}
      ${2}              | ${15}     | ${2000} | ${21800}
      ${2}              | ${42}     | ${2000} | ${50000}
      ${5}              | ${0}      | ${2000} | ${0}
      ${5}              | ${1}      | ${2000} | ${2000}
      ${5}              | ${2}      | ${2000} | ${2000}
      ${5}              | ${5}      | ${2000} | ${2000}
      ${5}              | ${10}     | ${2000} | ${7000}
      ${5}              | ${15}     | ${2000} | ${17000}
      ${5}              | ${42}     | ${2000} | ${50000}
      ${5}              | ${0}      | ${2000} | ${0}
      ${10}             | ${10}     | ${2000} | ${4000}
      ${10}             | ${15}     | ${2000} | ${9000}
      ${10}             | ${42}     | ${2000} | ${50000}
      ${8}              | ${20.5}   | ${2000} | ${23200}
      ${10.58}          | ${25}     | ${2000} | ${24000}
      ${11}             | ${13}     | ${2000} | ${5600}
      ${0.75}           | ${5}      | ${2000} | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, seniorityNonCadre: $seniorityNonCadre => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, seniorityNonCadre }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC2264'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle":
              "'Cadre'",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . non cadre durant une période":
              "oui",
            "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . non cadre durant une période . temps":
              seniorityNonCadre,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
            "indemnité de licenciement": "oui",
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
