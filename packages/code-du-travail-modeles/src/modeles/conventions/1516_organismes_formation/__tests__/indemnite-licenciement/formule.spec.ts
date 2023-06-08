import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1516"
);

describe("Formule indemnité licenciement - 1516", () => {
  test.each`
    seniority  | expectedFormula                             | expectedExplanations
    ${7 / 12}  | ${""}                                       | ${[]}
    ${8 / 12}  | ${""}                                       | ${[]}
    ${2}       | ${""}                                       | ${[]}
    ${25 / 12} | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (≈ 2.08 ans : valeur arrondie)", "Sref : Salaire de référence (1000 €)"]}
    ${7}       | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (7 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${15}      | ${"1/5 * Sref * A"}                         | ${["A : Ancienneté totale (15 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${18}      | ${"(1/5 * Sref * A1) + (1/10 * Sref * A2)"} | ${["A1 : Ancienneté totale (18 ans)", "A2 : Années de présence au-delà de 15 ans (3 ans)", "Sref : Salaire de référence (1000 €)"]}
    ${30}      | ${"6 * Sref"}                               | ${["Sref : Salaire de référence (1000 €)"]}
  `(
    "Formule $expectedFormula avec $seniority ans",
    ({ seniority, expectedFormula, expectedExplanations }) => {
      engine.setSituation({
        "contrat salarié . convention collective": "'IDCC1516'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
          seniority,
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
          seniority,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "1000",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/12/2022",
      });

      const result = engine.getFormule();

      expect(result.formula).toEqual(expectedFormula);
      expect(result.explanations).toEqual(expectedExplanations);
    }
  );
});
