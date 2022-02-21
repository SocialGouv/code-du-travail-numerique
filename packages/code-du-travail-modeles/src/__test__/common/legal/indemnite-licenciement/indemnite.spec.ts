import Engine from "publicodes";

import { mergeModels } from "../../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité légale de licenciement", () => {
  test.each`
    seniority | salary  | expectedCompensation
    ${0}      | ${0}    | ${0}
    ${24}     | ${0}    | ${0}
    ${6}      | ${1000} | ${1500}
    ${11}     | ${1000} | ${2750}
  `(
    "Pour un employé possédant $seniority mois d'ancienneté avec un salaire de référence de $salary, son indemnité légale de licenciement est $expectedNotice euros",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté total": seniority,
          "contrat salarié . convention collective": "''",
          "contrat salarié . salaire de référence": salary,
          "contrat salarié . travailleur handicapé": "non",
          "indemnité de licenciement": "non",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
