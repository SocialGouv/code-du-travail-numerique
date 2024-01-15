import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "275"
);

describe("Formule indemnité licenciement - CC 275", () => {
  describe("Non-cadres", () => {
    test.each([
      {
        expectedExplanations: [],
        expectedFormula: "",
        seniority: 7 / 12,
      },
      {
        expectedExplanations: [
          "A : Ancienneté totale (≈ 1.08 an : valeur arrondie)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "1/5 * Sref * A",
        seniority: 13 / 12,
      },
      {
        expectedExplanations: [
          "A : Ancienneté totale (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "1/5 * Sref * A",
        seniority: 5,
      },
      {
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "(1/5 * Sref * A1) + (2/5 * Sref * A2)",
        seniority: 10,
      },
      {
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (3/5 * Sref * A3)",
        seniority: 15,
      },
      {
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "A4 : Ancienneté entre 15 et 20 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (3/5 * Sref * A3) + (4/5 * Sref * A4)",
        seniority: 20,
      },
      {
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "A4 : Ancienneté entre 15 et 20 ans (5 ans)",
          "A5 : Ancienneté au dela de 20 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (3/5 * Sref * A3) + (4/5 * Sref * A4) + (1 * Sref * A5)",
        seniority: 25,
      },
      {
        expectedExplanations: ["Sref : Salaire de référence (5000 €)"],
        expectedFormula: "18 * Sref",
        seniority: 50,
      },
    ])(
      "Formule $expectedFormula avec une ancienneté de $seniority ans",
      ({ seniority, expectedFormula, expectedExplanations }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Non-cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority.toString(),
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority.toString(),
          "contrat salarié . indemnité de licenciement . date de notification":
            "31/01/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "5000",
        });
        const result = engine.getFormule();
        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });

  describe("Cadres", () => {
    test.each([
      {
        age: 45,
        expectedExplanations: [],
        expectedFormula: "",
        seniority: 7 / 12,
      },
      {
        age: 45,
        expectedExplanations: [
          "A : Ancienneté totale (≈ 1.08 an : valeur arrondie)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "1/5 * Sref * A",
        seniority: 13 / 12,
      },
      {
        age: 45,
        expectedExplanations: [
          "A : Ancienneté totale (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "1/5 * Sref * A",
        seniority: 5,
      },
      {
        age: 45,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "(1/5 * Sref * A1) + (2/5 * Sref * A2)",
        seniority: 10,
      },
      {
        age: 45,
        expectedExplanations: ["Sref : Salaire de référence (5000 €)"],
        expectedFormula: "18 * Sref",
        seniority: 50,
      },
      {
        age: 50,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (1 * Sref)",
        seniority: 10,
      },
      {
        age: 50,
        expectedExplanations: ["Sref : Salaire de référence (5000 €)"],
        expectedFormula: "19 * Sref",
        seniority: 50,
      },
      {
        age: 56,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula: "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (2 * Sref)",
        seniority: 10,
      },
      {
        age: 56,
        expectedExplanations: ["Sref : Salaire de référence (5000 €)"],
        expectedFormula: "20 * Sref",
        seniority: 50,
      },
      {
        age: 45,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (4/5 * Sref * A3)",
        seniority: 15,
      },
      {
        age: 50,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (4/5 * Sref * A3) + (1 * Sref)",
        seniority: 15,
      },
      {
        age: 56,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (4/5 * Sref * A3) + (2 * Sref)",
        seniority: 15,
      },
      {
        age: 45,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "A4 : Ancienneté au dela de 15 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (4/5 * Sref * A3) + (1 * Sref * A4)",
        seniority: 20,
      },
      {
        age: 50,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "A4 : Ancienneté au dela de 15 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (4/5 * Sref * A3) + (1 * Sref * A4) + (1 * Sref)",
        seniority: 20,
      },
      {
        age: 56,
        expectedExplanations: [
          "A1 : Ancienneté jusqu'à 5 ans (5 ans)",
          "A2 : Ancienneté entre 5 et 10 ans (5 ans)",
          "A3 : Ancienneté entre 10 et 15 ans (5 ans)",
          "A4 : Ancienneté au dela de 15 ans (5 ans)",
          "Sref : Salaire de référence (5000 €)",
        ],
        expectedFormula:
          "(1/5 * Sref * A1) + (2/5 * Sref * A2) + (4/5 * Sref * A3) + (1 * Sref * A4) + (2 * Sref)",
        seniority: 20,
      },
    ])(
      "Formule $expectedFormula avec une ancienneté de $seniority ans et age de $age ans",
      ({ seniority, expectedFormula, expectedExplanations, age }) => {
        engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0275'",
          "contrat salarié . convention collective . transport aérien personnel au sol . age":
            age.toString(),
          "contrat salarié . convention collective . transport aérien personnel au sol . catégorie professionnelle":
            "'Cadres'",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority.toString(),
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniority.toString(),
          "contrat salarié . indemnité de licenciement . date de notification":
            "31/01/2024",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "5000",
        });
        const result = engine.getFormule();
        expect(result.formula).toEqual(expectedFormula);
        expect(result.explanations).toEqual(expectedExplanations);
      }
    );
  });
});
