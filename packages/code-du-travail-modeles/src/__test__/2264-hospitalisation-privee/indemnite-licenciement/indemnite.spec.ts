import Engine from "publicodes";

import { mergeModels } from "../../../internal/merger";

const engine = new Engine(mergeModels());

describe("Indemnité conventionnel de licenciement pour la CC 2264", () => {
  test.each`
    category        | seniority | salary  | expectedCompensation
    ${"Non-cadres"} | ${0}      | ${2000} | ${0}
    ${"Non-cadres"} | ${1}      | ${2000} | ${400}
    ${"Non-cadres"} | ${2}      | ${2000} | ${800}
    ${"Non-cadres"} | ${5}      | ${2000} | ${2000}
    ${"Non-cadres"} | ${10}     | ${2000} | ${4000}
    ${"Non-cadres"} | ${15}     | ${2000} | ${8000}
    ${"Non-cadres"} | ${42}     | ${2000} | ${29600}
    ${"Cadres"}     | ${0}      | ${2000} | ${0}
    ${"Cadres"}     | ${1}      | ${2000} | ${400}
    ${"Cadres"}     | ${2}      | ${2000} | ${800}
    ${"Cadres"}     | ${5}      | ${2000} | ${5000}
    ${"Cadres"}     | ${10}     | ${2000} | ${15000}
    ${"Cadres"}     | ${15}     | ${2000} | ${25000}
    ${"Cadres"}     | ${42}     | ${2000} | ${79000}
  `(
    "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
    ({ seniority, salary, expectedCompensation, category }) => {
      const result = engine
        .setSituation({
          "contrat salarié . convention collective": "'IDCC2264'",
          "contrat salarié . convention collective . hospitalisation privées . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
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
