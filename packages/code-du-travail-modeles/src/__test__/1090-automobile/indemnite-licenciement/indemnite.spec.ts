import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 1090", () => {
  test.each`
    seniority | salary  | expectedCompensation
    ${0}      | ${2000} | ${0}
    ${7 / 12} | ${2000} | ${0}
    ${8 / 12} | ${2000} | ${333.33}
    ${9 / 12} | ${2000} | ${375}
    ${1}      | ${2000} | ${500}
    ${1.91}   | ${2000} | ${955}
    ${2}      | ${2000} | ${1000}
    ${2.08}   | ${2000} | ${1040}
    ${5}      | ${2000} | ${2500}
    ${0.67}   | ${2000} | ${335}
    ${1.08}   | ${2000} | ${540}
    ${8}      | ${2000} | ${4000}
    ${15}     | ${2000} | ${8333.33}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC1090'",
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
