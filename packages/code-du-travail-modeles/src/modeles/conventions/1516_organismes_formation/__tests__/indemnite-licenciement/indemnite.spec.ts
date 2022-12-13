import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 1516", () => {
  test.each`
    seniority | salary  | expectedCompensation
    ${0}      | ${0}    | ${0}
    ${2}      | ${1000} | ${0}
    ${5}      | ${1000} | ${1000}
    ${10}     | ${2000} | ${4000}
    ${42}     | ${3000} | ${33300}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1516'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
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
