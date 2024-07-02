import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "2609"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 2609", () => {
  describe("Vérifier qu'il N'y a pas d'ancienneté conventionnelle requise", () => {
    test("Emplois techniques et de coiffeurs", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC2609'",
        "contrat salarié . convention collective . batiment etam . rupture conventionnelle . age":
          "50",
        "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2024",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/03/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        licenciementFauteGrave: "non",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(125, "€");
    });
  });
});
