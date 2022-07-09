import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité légale de licenciement pour un employé", () => {
  test.each`
    seniority             | salary  | expectedCompensation
    ${0}                  | ${0}    | ${0}
    ${1}                  | ${0}    | ${0}
    ${1.3}                | ${0}    | ${0}
    ${0.12}               | ${1000} | ${0}
    ${0.5}                | ${1000} | ${0}
    ${8 / 12}             | ${1000} | ${167.5}
    ${11 / 12}            | ${2000} | ${460}
    ${1.083333333}        | ${2000} | ${540}
    ${1}                  | ${2000} | ${500}
    ${2}                  | ${2000} | ${1000}
    ${2.333333333}        | ${2000} | ${1165}
    ${10.91}              | ${2000} | ${5606.667}
    ${11.666666666666666} | ${2980} | ${9108.867}
  `(
    "ancienneté: $seniority mois, salaire de référence: $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            salary,
          "indemnité de licenciement": "oui",
        })
        .evaluate(
          "contrat salarié . indemnité de licenciement . résultat légal"
        );
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
  test.each`
    seniority             | salary  | expectedCompensation
    ${0}                  | ${0}    | ${0}
    ${1}                  | ${0}    | ${0}
    ${1.3}                | ${0}    | ${0}
    ${0.12}               | ${1000} | ${0}
    ${0.5}                | ${1000} | ${0}
    ${8 / 12}             | ${1000} | ${335}
    ${11 / 12}            | ${2000} | ${920}
    ${1.083333333}        | ${2000} | ${1080}
    ${1}                  | ${2000} | ${1000}
    ${2}                  | ${2000} | ${2000}
    ${2.333333333}        | ${2000} | ${2330}
    ${10.91}              | ${2000} | ${11213.334}
    ${11.666666666666666} | ${2980} | ${18217.734}
  `(
    "licenciement pour inaptitude : ancienneté: $seniority mois, salaire de référence: $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . indemnité de licenciement . ancienneté en année":
            seniority,
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            salary,
          "indemnité de licenciement": "oui",
        })
        .evaluate(
          "contrat salarié . indemnité de licenciement . résultat légal"
        );
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
