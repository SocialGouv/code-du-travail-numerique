import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité légale de licenciement pour un employé", () => {
  test.each`
    seniority | salary  | expectedCompensation
    ${0}      | ${0}    | ${0}
    ${24}     | ${0}    | ${0}
    ${28}     | ${0}    | ${0}
    ${1}      | ${1000} | ${0}
    ${6}      | ${1000} | ${0}
    ${8}      | ${1000} | ${0}
    ${11}     | ${2000} | ${458.33}
    ${13}     | ${2000} | ${541.67}
    ${24}     | ${2000} | ${1000}
    ${28}     | ${2000} | ${1166.67}
  `(
    "ancienneté: $seniority mois, salaire de référence: $salary => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . salaire de référence": salary,
          "contrat salarié . travailleur handicapé": "non",
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
