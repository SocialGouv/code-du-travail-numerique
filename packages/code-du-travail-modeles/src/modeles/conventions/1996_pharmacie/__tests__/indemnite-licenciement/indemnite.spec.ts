import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1996"
);

describe("Indemnité conventionnel de licenciement pour la CC 1996", () => {
  describe("Non cadres", () => {
    test.each`
      seniorityRight | seniority | salary  | expectedCompensation
      ${0.5}         | ${0.5}    | ${2450} | ${0}
      ${7 / 12}      | ${8 / 12} | ${2450} | ${0}
      ${8 / 12}      | ${8 / 12} | ${2450} | ${408.33}
      ${8 / 12}      | ${9}      | ${2450} | ${5512.5}
      ${8 / 12}      | ${17}     | ${2450} | ${11853.1}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation",
      ({ seniority, seniorityRight, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1996'",
            "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Non-cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(missingArgs).toEqual([]);
        expect(result.value).toEqual(expectedCompensation);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });

  describe("Cadres", () => {
    test.each`
      licenciementEco | seniorityRight | seniority | salary  | expectedCompensation
      ${"'Non'"}      | ${7 / 12}      | ${3}      | ${2450} | ${0}
      ${"'Non'"}      | ${8 / 12}      | ${3}      | ${2450} | ${1837.5}
      ${"'Non'"}      | ${8 / 12}      | ${5}      | ${2450} | ${3675}
      ${"'Non'"}      | ${8 / 12}      | ${12}     | ${2450} | ${8820}
      ${"'Non'"}      | ${8 / 12}      | ${30}     | ${2450} | ${29400}
      ${"'Oui'"}      | ${8 / 12}      | ${3}      | ${2450} | ${1837.5}
      ${"'Oui'"}      | ${8 / 12}      | ${5}      | ${2450} | ${3675}
      ${"'Oui'"}      | ${8 / 12}      | ${12}     | ${2450} | ${8986.6}
      ${"'Oui'"}      | ${8 / 12}      | ${30}     | ${2450} | ${29816.5}
    `(
      "ancienneté: $seniority an, pour un licenciement économique $licenciementEco, salaire de référence: $salary => $expectedCompensation",
      ({
        seniority,
        seniorityRight,
        salary,
        expectedCompensation,
        licenciementEco,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1996'",
            "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question":
              licenciementEco,
            "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(result.value).toEqual(expectedCompensation);
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
