import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité conventionnel de licenciement pour la CC 1596", () => {
  test.each`
    seniority | salary  | inaptitude | expectedCompensation
    ${0}      | ${0}    | ${"oui"}   | ${0}
    ${0}      | ${0}    | ${"non"}   | ${0}
    ${0.5}    | ${1000} | ${"non"}   | ${0}
    ${8 / 12} | ${1000} | ${"non"}   | ${166.75}
    ${2}      | ${2000} | ${"non"}   | ${1000}
    ${2}      | ${2000} | ${"oui"}   | ${2000}
  `(
    "ancienneté: $seniority mois, salaire de référence: $salary, inaptitude: $inaptitude => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation, inaptitude }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté en année": seniority,
          "contrat salarié . convention collective": "'IDCC1596'",
          "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . salaire de référence":
            salary,
          "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . salaire de référence": salary,
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
      expect(result.missingVariables).toEqual({});
    }
  );
});
