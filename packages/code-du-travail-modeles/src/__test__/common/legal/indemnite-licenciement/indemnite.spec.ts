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
    ${8 / 12}             | ${1000} | ${166.667}
    ${11 / 12}            | ${2000} | ${458.333}
    ${1.083333333}        | ${2000} | ${541.667}
    ${2}                  | ${2000} | ${1000}
    ${2.333333333}        | ${2000} | ${1166.667}
    ${10.91}              | ${2000} | ${5606.667}
    ${11.666666666666666} | ${2980} | ${9105.556}
  `(
    "ancienneté: $seniority mois, salaire de référence: $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté en année": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
            "non",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            salary,
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
  test.each`
    seniority      | salary  | expectedCompensation
    ${0}           | ${0}    | ${0}
    ${1}           | ${0}    | ${0}
    ${2.3}         | ${0}    | ${0}
    ${1 / 12}      | ${1000} | ${0}
    ${6 / 12}      | ${1000} | ${0}
    ${8 / 12}      | ${1000} | ${333.334}
    ${11 / 12}     | ${2000} | ${916.666}
    ${13 / 12}     | ${2000} | ${1083.334}
    ${2}           | ${2000} | ${2000}
    ${2.333333333} | ${2000} | ${2333.334}
  `(
    "licenciement pour inaptitude : ancienneté: $seniority mois, salaire de référence: $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté en année": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
          "contrat salarié . indemnité de licenciement . salaire de référence":
            salary,
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
