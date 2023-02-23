import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1996"
);

describe("Indemnité conventionnel de licenciement pour la CC 1996", () => {
  describe("Non cadres", () => {
    test.each`
      seniority | salary  | expectedCompensation
      ${0.5}    | ${2450} | ${0}
      ${8 / 12} | ${2450} | ${408.33}
      ${9}      | ${2450} | ${5512.5}
      ${17}     | ${2450} | ${11853.1}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation",
      ({ seniority, salary, expectedCompensation }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1996'",
            "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Non-cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
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
      licenciementEco | seniority | salary  | expectedCompensation
      ${"'Non'"}      | ${3}      | ${2450} | ${1837.5}
      ${"'Non'"}      | ${5}      | ${2450} | ${3675}
      ${"'Non'"}      | ${12}     | ${2450} | ${8820}
      ${"'Non'"}      | ${30}     | ${2450} | ${29400}
      ${"'Oui'"}      | ${3}      | ${2450} | ${1837.5}
      ${"'Oui'"}      | ${5}      | ${2450} | ${3675}
      ${"'Oui'"}      | ${12}     | ${2450} | ${8986.6}
      ${"'Oui'"}      | ${30}     | ${2450} | ${29816.5}
    `(
      "ancienneté: $seniority an, pour un licenciement économique $licenciementEco, salaire de référence: $salary => $expectedCompensation",
      ({ seniority, salary, expectedCompensation, licenciementEco }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC1996'",
            "contrat salarié . convention collective . pharmacie . indemnité de licenciement . cadres . licenciement économique question":
              licenciementEco,
            "contrat salarié . convention collective . pharmacie . indemnité de licenciement . catégorie professionnelle": `'Cadres'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniority,
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
