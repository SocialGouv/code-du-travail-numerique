import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité conventionnel de licenciement pour la CC 1979", () => {
  test.each`
    seniority | salary  | expectedCompensation
    ${0}      | ${2000} | ${0}
    ${1}      | ${2000} | ${0}
    ${1.99}   | ${2000} | ${0}
    ${2}      | ${2000} | ${400}
    ${5}      | ${2000} | ${1000}
    ${8}      | ${2000} | ${1600}
    ${15}     | ${2000} | ${3666.67}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1979'",
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
