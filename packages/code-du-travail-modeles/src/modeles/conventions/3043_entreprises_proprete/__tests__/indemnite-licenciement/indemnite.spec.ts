import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 3043", () => {
  test.each`
    seniority | salary  | expectedCompensation
    ${0}      | ${2000} | ${0}
    ${1}      | ${2000} | ${0}
    ${1.91}   | ${2000} | ${0}
    ${2}      | ${2000} | ${0}
    ${2.08}   | ${2000} | ${416}
    ${5}      | ${2000} | ${1000}
    ${5.91}   | ${2000} | ${1182}
    ${6}      | ${2000} | ${1333.33}
    ${9.91}   | ${2000} | ${2636.67}
    ${12}     | ${2000} | ${3466.67}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC3043'",
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
