import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "292"
);

describe("Indemnité conventionnel de licenciement pour la CC 292", () => {
  describe("Non cadres", () => {
    test.each`
      seniority | seniorityRight | salary  | expectedCompensation
      ${8 / 12} | ${7 / 12}      | ${2076} | ${0}
      ${7 / 12} | ${8 / 12}      | ${2076} | ${302.75}
      ${8 / 12} | ${8 / 12}      | ${2076} | ${346}
      ${5}      | ${1}           | ${2076} | ${2595}
      ${15}     | ${1}           | ${2076} | ${8650}
      ${20}     | ${1}           | ${2076} | ${12110}
    `(
      "Avec $seniority ans, seniorityRight $seniorityRight et sref : $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0292'",
            "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle": `'Non cadres (Coefficient 700 à 830)'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });

  describe("Cadres", () => {
    test.each`
      seniority | seniorityRight | salary  | expectedCompensation
      ${7 / 12} | ${7 / 12}      | ${3012} | ${0}
      ${7 / 12} | ${8 / 12}      | ${3012} | ${439.25}
      ${8 / 12} | ${8 / 12}      | ${3012} | ${502}
      ${2.75}   | ${1}           | ${3012} | ${2070.75}
      ${4}      | ${1}           | ${3012} | ${3614.4}
      ${11}     | ${1}           | ${3012} | ${10843.2}
      ${19}     | ${1}           | ${3012} | ${22288.8}
      ${35}     | ${1}           | ${3012} | ${45180}
    `(
      "Avec $seniority ans, seniorityRight $seniorityRight et sref : $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, seniorityRight }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0292'",
            "contrat salarié . convention collective . plasturgie . indemnité de licenciement . catégorie professionnelle": `'Cadres (Coefficient 900 et plus)'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(missingArgs).toEqual([]);
        expect(result?.unit?.numerators).toEqual(["€"]);
        expect(result?.value).toEqual(expectedCompensation);
      }
    );
  });
});
