import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "1483"
);

describe("Calcul de l'indemnité de rupture conventionnelle pour la CC 1483", () => {
  describe("Vérifier qu'il n'y a pas d'ancienneté conventionnelle requise", () => {
    test("Cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1483'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . rupture conventionnelle . age":
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
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(100, "€");
    });

    test("Non cadres", () => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC1483'",
        "contrat salarié . convention collective . habillement textiles commerce de detail . catégorie professionnelle":
          "'Non-cadres'",
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
        noticeSalaryPeriods: "[]",
        salaryPeriods:
          '[{"month":"février 2024","value":3000},{"month":"janvier 2024","value":3000}]',
        typeContratTravail: "cdi",
      });
      expect(result).toAgreementResultBeEqual(100, "€");
    });
  });
});
