import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité conventionnel de licenciement pour la CC 1516", () => {
  test.each`
    seniority | salary  | inaptitude | expectedCompensation
    ${0}      | ${0}    | ${"oui"}   | ${0}
    ${0}      | ${0}    | ${"non"}   | ${0}
    ${0.5}    | ${1000} | ${"non"}   | ${0}
    ${8 / 12} | ${1000} | ${"non"}   | ${166.667}
    ${2}      | ${2000} | ${"non"}   | ${1000}
    ${2}      | ${2000} | ${"oui"}   | ${2000}
  `(
    "ancienneté: $seniority mois, salaire de référence: $salary, inaptitude: $inaptitude => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation, inaptitude }) => {
      const result = engine
        .setSituation({
          "contrat salarié . ancienneté en année": seniority,
          "contrat salarié . convention collective": "'IDCC1516'",
          "contrat salarié . convention collective . organismes de formation . indemnité de licenciement . salaire de référence":
            salary,
          "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
            inaptitude,
          "contrat salarié . salaire de référence": salary,
          "indemnité de licenciement": "oui",
        })
        .evaluate("contrat salarié . indemnité de licenciement");
      expect(result.missingVariables).toEqual({});
      expect(result.nodeValue).toEqual(expectedCompensation);
      expect(result.unit?.numerators).toEqual(["€"]);
    }
  );
});
